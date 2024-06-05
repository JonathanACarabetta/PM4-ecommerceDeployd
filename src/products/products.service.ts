import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";


@Injectable()
export class ProductsService {
    constructor(private readonly productRepository: ProductsRepository,
    ) { }
    getProducts(page: number, limit: number) {
        return this.productRepository.getProducts(page, limit);

    }
    getProductById(id: string) {

        return this.productRepository.getProductById(id);

    }
    createProduct(product) {

        return this.productRepository.createProduct(product);

    }

    updateProduct(product, id: string) {

        return this.productRepository.updateProduct(id, product);

    }

    deleteProduct(id: string) {

        return this.productRepository.deleteProduct(id);

    }

    seedProducts() {
        return this.productRepository.seedProducts();

    }
}