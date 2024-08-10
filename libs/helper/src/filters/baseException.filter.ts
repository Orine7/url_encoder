import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request, Response } from "express";
import { EntityNotFoundError, QueryFailedError, TypeORMError } from "typeorm";

interface errorObject {
    status: number;
    message: string;
    rawMessage?: string | string[] | object;
    timestamp: string;
    verb: string;
    path: string;
}
@Catch()
export class BaseExceptionFilter implements ExceptionFilter {
    constructor(private readonly configService: ConfigService) { }

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let errorReturnObject: errorObject = {
            status: 500,
            message: "Internal Server Error",
            timestamp: new Date().toISOString(),
            verb: request.method,
            path: request.url,
        };

        const logger = new Logger("ErrorLogger", { timestamp: true });

        if (exception instanceof HttpException) {
            const httpExceptionResponse = exception.getResponse();
            errorReturnObject.status = exception.getStatus();

            if (httpExceptionResponse instanceof String) {
                errorReturnObject.message = exception.message;
            } else if (httpExceptionResponse instanceof Object) {
                errorReturnObject.message = httpExceptionResponse["message"];
            }
        }

        if (exception instanceof TypeError) {
            errorReturnObject.message = "Has occurred a TypeError";
            errorReturnObject.rawMessage = JSON.stringify(exception.stack)
        }

        if (exception instanceof TypeORMError) {
            const validError =
                exception?.constructor?.name &&
                Object.keys(typeORMErrorMapper).includes(exception?.constructor?.name);
            const typeormError = validError
                ? typeORMErrorMapper[exception.constructor.name](exception)
                : typeORMErrorMapper.default();

            errorReturnObject = Object.assign(errorReturnObject, typeormError);
        }

        logger.error(exception);
        if (this.configService.get("ENVIRONMENT") === "PRODUCTION") {
            delete errorReturnObject.rawMessage;
        }
        response.status(errorReturnObject.status).json(errorReturnObject);
    }
}

const typeORMErrorMapper = {
    QueryFailedError: (exception: QueryFailedError) => {
        const cleanedMessage = exception.message
            .replace(/\n/g, "")
            .replace(/""/g, "")
            .replace(/\\/g, "");
        const queryErrorMapper = {
            23505: "This value already exists.",
            23502: "Input data is invalid.",
            23503: "The entity conflicts with another entity.",
            "22P02": "Search value is invalid.",
            default: "Unknown error. Please contact support.",
        };
        return {
            status: 400,
            message: `Query search error. ${queryErrorMapper[exception.driverError["code"]] || queryErrorMapper.default}`,
            rawMessage: cleanedMessage,
        };
    },
    EntityNotFoundError: (exception: EntityNotFoundError) => {
        const cleanedMessage = exception.message
            .replace(/\n/g, "")
            .replace(/""/g, "")
            .replace(/\\/g, "");

        return {
            status: 404,
            message: "Entity not found.",
            rawMessage: cleanedMessage,
        };
    },
    TypeORMError: (exception: TypeORMError) => {
        const cleanedMessage = exception.message
            .replace(/\n/g, "")
            .replace(/""/g, "")
            .replace(/\\/g, "");
        return {
            status: 400,
            message: "Database handling error.",
            rawMessage: cleanedMessage,
        };
    },
    EntityMetadataNotFoundError: (exception: EntityNotFoundError) => {
        const cleanedMessage = exception.message
            .replace(/\n/g, "")
            .replace(/""/g, "")
            .replace(/\\/g, "");
        return {
            status: 404,
            message: "The metadata for this entity could not be found.",
            rawMessage: cleanedMessage,
        };
    },
    default: () => {
        const cleanedMessage =
            "This error is not mapped. Please contact support.";
        return {
            status: 500,
            message: cleanedMessage,
        };
    },
};
