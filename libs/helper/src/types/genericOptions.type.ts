import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

export enum OrderEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class pageOptions {
  //** Order of the results, generally used on createdAt. */
  @IsEnum(OrderEnum)
  @IsOptional()
  order?: OrderEnum;

  //** Page number. */
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  page?: number;

  //** Number of results per page. */
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  size?: number;

  constructor(options?: pageOptions) {
    const defaultOptions: pageOptions = {
      order: OrderEnum.DESC,
      page: 0,
      size: 50,
    };
    Object.assign(this, defaultOptions, options);
  }
}
