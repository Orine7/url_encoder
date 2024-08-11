import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JWTUser } from "../types/jwtUser.type";

export const getCurrentUserByContext = (
    context: ExecutionContext,
): JWTUser => {
    return context.switchToHttp().getRequest().user
};

export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) =>
        getCurrentUserByContext(context),
);