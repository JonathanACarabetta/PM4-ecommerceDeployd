import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { AuthGuard } from "src/guards/users.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/rol.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { createProductDTO } from "src/dtos/createProductDto.dto";
@ApiTags("products")
@Controller("products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService,
    ) { };
    @Get()
    getProducts(@Query("page") page: string, @Query("limit") limit: string) {
        const products = this.productsService.getProducts(Number(page), Number(limit));
        return products;
    }

    @ApiBearerAuth()
    @Get("seeder")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    seedProducts() {
        return this.productsService.seedProducts();
    }

    @ApiBearerAuth()
    @Get(":id")
    @UseGuards(AuthGuard)
    getProductById(@Param("id", ParseUUIDPipe) id: string) {
        const product = this.productsService.getProductById(id);
        return product;
    }

    @ApiBearerAuth()
    @Post("create")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    createProduct(@Body() createProduct: createProductDTO) {
        const product = this.productsService.createProduct(createProduct);
        return product;
    }

    @ApiBearerAuth()
    @Put("update/:id")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    updateProduct(@Body() updateProduct: createProductDTO, @Param("id", ParseUUIDPipe) id: string) {
        const product = this.productsService.updateProduct(updateProduct, id);
        return product;
    }
    @ApiBearerAuth()
    @Delete("delete/:id")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    deleteProduct(@Param("id", ParseUUIDPipe) id: string) {
        const product = this.productsService.deleteProduct(id);
        return product;
    }


};