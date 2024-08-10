import { IsEmail, IsOptional, IsString, IsStrongPassword, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 4,
        minNumbers: 1,
        minUppercase: 1,
    })
    @MaxLength(24)
    password: string;

    @IsOptional()
    @IsString()
    name: string;
}


