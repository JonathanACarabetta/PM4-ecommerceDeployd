import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriesRepository } from "./categories.repository";
import { CategoriesController } from "./categories.controller";
import { Category } from "./categories.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports:[TypeOrmModule.forFeature([Category])],
    providers:[CategoriesService, CategoriesRepository],
    controllers:[CategoriesController],
})
export class CategoriesModule{};