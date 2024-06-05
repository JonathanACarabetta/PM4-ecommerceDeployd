import { ApiHideProperty, ApiProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Role } from "src/rol.enum";


export class CreateUserDto {

    /**
     * Esta es la propiedad name
     * @example Juan
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string;

    /**
     * Esta es la propiedad email
     * @example emailValido@mail.com
     */
    @IsNotEmpty()
    @IsEmail()
    email: string;

    /**
     * Esta es la propiedad password
     * @example pa$$WordV4lid0
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/, { message: 'La contraseña es muy debil' })
    password: string;

    /**
     * Esta es la propiedad repeatPassword
     * @example pa$$WordV4lid0
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    repeatPassword: string;

    /**
     * Esta es la propiedad address
     * @example calle falsa 123
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    /**
     * Esta es la propiedad phone
     * @example 12345678
     */
    @IsNotEmpty()
    @IsNumber()
    phone: number;

    /**
     * Esta es la propiedad country
     * @example Argentina
     */
    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country: string;

    /**
     * Esta es la propiedad city
     * @example Buenos Aires
     */
    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city: string;

    @ApiHideProperty()
    @IsEmpty()
    isADmin?: boolean;
}

export class LoginUserDto {
    /**
    * Esta es la propiedad email
    * @example emailValido@mail.com
    */
    @IsNotEmpty()
    @IsEmail()
    email: string;

    /**
    * Esta es la propiedad password
    * @example pa$$WordV4lid0
    */
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/, { message: 'La contraseña es muy debil' })
    password: string;
}

export class UpdateUserDto{
    
        /**
     * Esta es la propiedad name
     * @example Juan
     */
        @IsNotEmpty()
        @IsString()
        @MinLength(3)
        @MaxLength(80)
        name: string;
    
        /**
         * Esta es la propiedad email
         * @example emailValido@mail.com
         */
        @IsNotEmpty()
        @IsEmail()
        email: string;
    
        /**
         * Esta es la propiedad password
         * @example pa$$WordV4lid0
         */
        @IsNotEmpty()
        @IsString()
        @MinLength(8)
        @MaxLength(15)
        @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/, { message: 'La contraseña es muy debil' })
        password: string;
    
        /**
         * Esta es la propiedad address
         * @example calle falsa 123
         */
        @IsNotEmpty()
        @IsString()
        @MinLength(3)
        @MaxLength(80)
        address: string;
    
        /**
         * Esta es la propiedad phone
         * @example 12345678
         */
        @IsNotEmpty()
        @IsNumber()
        phone: number;
    
        /**
         * Esta es la propiedad country
         * @example Argentina
         */
        @IsOptional()
        @IsString()
        @MinLength(5)
        @MaxLength(20)
        country: string;
    
        /**
         * Esta es la propiedad city
         * @example Buenos Aires
         */
        @IsOptional()
        @IsString()
        @MinLength(5)
        @MaxLength(20)
        city: string;
}