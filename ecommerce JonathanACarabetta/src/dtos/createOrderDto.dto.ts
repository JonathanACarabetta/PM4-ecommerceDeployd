import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator"
import { Product } from "src/products/products.entity"

export class CreateOrderDto{

    /**
     * Esta es la propiedad userId, es un UUID
     * @example uuid1
     */
    @IsNotEmpty()
    @IsUUID()
    userId: string

    /**
     * Esta es la propiedad Products, es un arreglo parcial de Product, solo contiene el ID
     * @example products:[{"id":"uuid1"},{"id":"uuid2"}]
     */
    @IsArray()
    @ArrayMinSize(1)
    products: Partial<Product[]>
}