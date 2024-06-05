import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FilesService } from "./files.service"
import { AuthGuard } from "src/guards/users.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/rol.enum";
import { RolesGuard } from "src/guards/roles.guard";
import "multer"

@ApiTags("files")
@Controller("files")
export class FilesController {
    constructor(
        private readonly filesService: FilesService,
    ) { }

    @ApiBearerAuth()
    @Post("uploadImage/:id")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor("file"))
    uploadFile(@UploadedFile(new ParseFilePipe({
        validators:[
            new MaxFileSizeValidator({
                maxSize: 200000,
                message: "El Archivo no debe superar los 200kb"
            }),
            new FileTypeValidator({
                fileType: /(jpg|jpeg|png|webp)$/
            })
        ]
    })) file: Express.Multer.File, @Param("id", ParseUUIDPipe) id: string) {
        return this.filesService.saveFiles({
            file:file,
            id:id
        })
    }
}