import { IsBooleanString, IsOptional, IsUrl, IsUUID } from "class-validator";

export class CreateUrlDto {

    @IsUrl()
    originalUrl: string;

    @IsOptional()
    @IsBooleanString()
    isPublic?: boolean;

    @IsOptional()
    @IsUUID()
    userId?: string;
}
