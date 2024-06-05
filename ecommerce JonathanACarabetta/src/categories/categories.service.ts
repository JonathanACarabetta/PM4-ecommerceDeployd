import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "./categories.repository";
import { Category } from "./categories.entity";


@Injectable()
export class CategoriesService {
    constructor(private readonly categoriesRepository: CategoriesRepository) { }

    getCategories() {

        return this.categoriesRepository.getCategories();

    }
    createCategory(category) {
        return this.categoriesRepository.createCategory(category);
    }

    seedCategories() {
        this.categoriesRepository.addCategories();
        return "Categorias cargadas correctamente"
    }


}
// smartphone  monitor  keyboard  mouse  CPU  GPU  tablet