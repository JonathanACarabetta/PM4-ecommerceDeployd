import { Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { RelationId, Repository } from "typeorm";
import { Category } from "src/categories/categories.entity";
import * as data from "../util/data.json";

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
  ) { }

  async getProducts(page: number, limit: number): Promise<Product[]> {
    let products = await this.productRepository.find({ relations: ['category'] });
    if (!products) throw new NotFoundException("Error al traer Los Productos");

    const start = (page - 1) * limit;
    const end = start + limit;

    return products.slice(start, end);
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id }, relations: ['category'] });
    if (!product) throw new NotFoundException("Error al traer El Producto con ID: " + id);

    return product;
  }

  async createProduct(createProduct): Promise<Product[]> {
    const product = await this.productRepository.save(createProduct);
    if (!product) throw new InternalServerErrorException("Error al crear el Producto"); return product
  }

  async updateProduct(id: string, updateProduct): Promise<Product> {
    await this.productRepository.update(id, updateProduct);
    const product = await this.productRepository.findOne({ where: { id }, relations: ['category'] });
    if (!product) throw new InternalServerErrorException("Error al updatear el producto con ID: " + id)
    return product

  }

  async deleteProduct(id: string): Promise<string> {
    const product = await this.productRepository.delete(id);
    if (!product) throw new InternalServerErrorException("Error al intentar eliminar el producto con ID: " + id)
    return `Producto con id ${id} borrado`;

  }

  async seedProducts() {
    const categories = await this.categoryRepository.find();
    data?.map(async (element) => {
      const category = categories.find((category) => category.name === element.category)
      const product = new Product();

      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.imgUrl = element.imgUrl;
      product.stock = element.stock;
      product.category = category;

      await this.productRepository
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values(product)
        .orIgnore()
        .orUpdate(["description", "price", "imgUrl", "stock"], ["name"])
        .execute();
    })
    return "Productos cargados correctamente a la BD";

  }


}