import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { Product } from "./products.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/categories/categories.entity";
import { CategoriesRepository } from "src/categories/categories.repository";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports:[TypeOrmModule.forFeature([Product,Category])],
    providers:[ProductsService, ProductsRepository, CategoriesRepository],
    controllers:[ProductsController],
})
export class ProductsModule{}