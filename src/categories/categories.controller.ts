import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Post, UseGuards } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { AuthGuard } from "src/guards/users.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/rol.enum";
import { RolesGuard } from "src/guards/roles.guard";
import { createCategoryDTO } from "src/dtos/createCategory.dto";

@ApiTags("categories")
@Controller("categories")
export class CategoriesController{
    constructor(private readonly categoriesService: CategoriesService){}
    @ApiBearerAuth()
    @Get()
    @UseGuards(AuthGuard)
    getCategories(){
        const categories = this.categoriesService.getCategories();
        return categories;
    }
    @ApiBearerAuth()
    @Get("seeder")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    seedCategories(){
        const respondStatus = this.categoriesService.seedCategories();
        if(!respondStatus)throw new InternalServerErrorException("Error al realizar el seeding")
        return respondStatus;
    }
    @ApiBearerAuth()
    @Post("create")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    createCategory(@Body() category: createCategoryDTO){
        const newCategory = this.categoriesService.createCategory(category);
        return newCategory;
    }

}