import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "./users.entity";

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}
    async getUsers() { //page:number,limit:number
        return this.usersRepository.getUsers(); ///Configurar page,limit
    }
    async getUserById(id: string) {
        return await this.usersRepository.getUser(id);
    }

    async getUserByEmail(email: string) {
        return await this.usersRepository.getUserByEmail(email);
    }
    async createUser(user): Promise<Partial<User>> {
        return await this.usersRepository.createUser(user);
    }

    async updateUser(user, id: string): Promise<Partial<User>> {
        return await this.usersRepository.updateUser(user, id);
    }

    async deleteUser(id: string): Promise<Partial<User>> {
        return await this.usersRepository.deleteUser(id);
    }

};