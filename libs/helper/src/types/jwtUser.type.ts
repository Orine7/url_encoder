import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { UserType } from "./user.type";

export class JWTUser {
    @IsString()
    id: string

    @IsEmail()
    email: string

    @IsEnum(UserType)
    type: string

    @Type(() => Number)
    @IsInt()
    iat?: number;

    @Type(() => Number)
    @IsInt()
    exp?: number;

    @IsOptional()
    @IsString()
    name?: string
}