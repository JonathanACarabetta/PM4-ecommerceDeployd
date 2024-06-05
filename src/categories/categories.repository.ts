import { Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./categories.entity";
import { Repository } from "typeorm";
import * as data from "../util/data.json";

@Injectable()
export class CategoriesRepository {
    constructor(
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
    ) { }

    async getCategories(): Promise<Category[]> {
        const categories = await this.categoryRepository.find();
        if(!categories)throw new NotFoundException("Error al traer categorias")
        return categories;
    }

    async createCategory(category: Category): Promise<Category> {
        const newCategory = await this.categoryRepository.save(category);
        if(!newCategory)throw new InternalServerErrorException("Error al crear la categoria")
        return newCategory;
    }

    async getCategoryByName(name: string): Promise<Category> {
        const category =await this.categoryRepository.findOneBy({ name: name });
        if(!category)throw new NotFoundException("Error al traer categorias")
        return category;
    }

    async addCategories() {
        data?.map(async (element) => {
            await this.categoryRepository
                .createQueryBuilder()
                .insert()
                .into(Category)
                .values({ name: element.category })
                .orIgnore()
                .execute();

        })
    }

}