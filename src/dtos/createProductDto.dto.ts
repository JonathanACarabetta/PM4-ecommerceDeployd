import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"
import { Category } from "src/categories/categories.entity"

export class createProductDTO {

    /**
     * Esta es la propiedad name
     * @example MotoG22
     */
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name:string

    /**
     * Esta es la propiedad description
     * @example MotoG22 8GB
     */
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    description:string

    /**
     * Esta es la propiedad price
     * @example 99.99
     */
    @IsNotEmpty()
    @IsNumber()
    price:number

    /**
     * Esta es la propiedad stock
     * @example 10
     */
    @IsNotEmpty()
    @IsNumber()
    stock:boolean


    @IsNotEmpty()
    category:Category
    
    /**
     * Esta es la propiedad imgUrl
     * @example //images.png
     */
    @IsString()
    imgUrl:string

}