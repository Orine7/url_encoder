import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, Max, Min } from "class-validator";

export enum OrderEnum {
    ASC = 'ASC',
    DESC = 'DESC'
}

export class pageOptions {
    @IsEnum(OrderEnum)
    @IsOptional()
    order?: OrderEnum = OrderEnum.ASC;

    @Type(() => Number)
    @IsInt()
    @Min(0)
    @IsOptional()
    page?: number = 0;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    @IsOptional()
    size?: number = 50;
}