import { IsEmail, IsOptional, IsString, IsStrongPassword, MaxLength } from "class-validator";

export class CreateUserDto {
    /**
     * The email of the user. This email must be unique.
     * @example 'N4wS6@example.com'
     */

    @IsEmail()
    email: string;

    /**
     * The password of the user. This password must have a number and an uppercase letter.
     * @example 'Password123'
     */
    @IsStrongPassword({
        minLength: 4,
        minNumbers: 1,
        minUppercase: 1,
    })
    @MaxLength(24)
    password: string;

    /**
     * The full name of the user
     * @example 'John Doe'
     */
    @IsOptional()
    @IsString()
    name: string;
}


