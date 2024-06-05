import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class createCategoryDTO{

    /**
     * Esta es la propiedad name
     * @example testcategory1
     */
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name:string;
}