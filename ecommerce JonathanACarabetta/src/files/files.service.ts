import { Injectable } from "@nestjs/common";
import { FilesRepository } from "./files.repository";

@Injectable()
export class FilesService{
    constructor(
        private readonly filesRepository: FilesRepository,
    ){}

    saveFiles({file, id}){
        return this.filesRepository.saveFile(file, id);
    }

}