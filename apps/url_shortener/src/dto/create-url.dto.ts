import { IsBooleanString, IsOptional, IsUrl, IsUUID } from "class-validator";

export class CreateUrlDto {
    /**
     * The original url the user wants to shorten
     * @example 'https://example.com'
     */
    @IsUrl()
    originalUrl: string;

    /**
     * Whether the url should be public or not. The default value is true as defined on the Url Entity
     * @example true
     */
    @IsOptional()
    @IsBooleanString()
    isPublic?: boolean;

    /**
     * The id of the user that wants to shorten the url
     * @example '12345678-1234-1234-1234-123456789012'
     */
    @IsOptional()
    @IsUUID()
    userId?: string;
}
