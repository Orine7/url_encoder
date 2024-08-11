import { IsOptional, IsUrl, IsUUID } from "class-validator";

export class CreateUrlDto {

    @IsUrl()
    originalUrl: string;


    @IsOptional()
    @IsUUID()
    userId?: string;
}
