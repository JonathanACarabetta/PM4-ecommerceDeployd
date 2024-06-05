import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm";
import { Product } from "src/products/products.entity";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import "multer"
@Injectable()
export class FilesRepository {
    constructor(
        @InjectRepository(Product) private readonly productsRepository: Repository<Product>,
        private readonly cloudinaryService: CloudinaryService
    ) { }


    async saveFile(file:Express.Multer.File, id: string): Promise<Partial<Product>> {
        const product = await this.productsRepository.findOneBy({ id: id });
        if (!product) throw new NotFoundException(`Producto con id ${id} no encontrado`);
        const newFile = this.cloudinaryService.uploadImage(file);
        const imgUrl = (await newFile).url
        await this.productsRepository.update(id,{imgUrl:imgUrl});;
        return {id:id,imgUrl:imgUrl}
    }
}