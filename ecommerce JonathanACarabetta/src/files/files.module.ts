import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesController } from "./files.controller";
import { FilesRepository } from "./files.repository";
import { FilesService } from "./files.service";
import { Product } from "src/products/products.entity";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { CloudinaryConfig } from "src/config/cloudinary";
import { ProductsRepository } from "src/products/products.repository";

@Module({
    imports:[TypeOrmModule.forFeature([Product])],
    controllers:[FilesController],
    providers:[FilesRepository, FilesService, CloudinaryConfig, CloudinaryService],
})
export class FilesModule{}