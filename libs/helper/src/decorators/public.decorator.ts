import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = (mode: "false" | "true" | "readonly" = "true") => SetMetadata(IS_PUBLIC_KEY, mode);
