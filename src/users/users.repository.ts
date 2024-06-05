import { Injectable, NotFoundException, InternalServerErrorException, UseInterceptors } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    async createUser(user: User): Promise<Partial<User>> {
        const newUser = await this.userRepository.save(user);
        if(!newUser)throw new InternalServerErrorException("Error al Crear el Usuario")
        const { password, ...userNoPassword } = newUser;
        return userNoPassword;
    }
    async getUsers(): Promise<Partial<User>[]> {
        const usersArray = await this.userRepository.find();
        if(!usersArray) throw new NotFoundException("Error al traer Usuarios")
        const users: Partial<User>[] = usersArray.map(user => {
            const { password, ...userNoPassword } = user;
            return userNoPassword;
        })
        return users;
    }
    async getUser(id: string) {
        const user = await this.userRepository.findOne({
            where: { id: id },
            relations: { orders: true }
        });
        if(!user)throw new NotFoundException("Usuario no encontrado")
        const { password, ...userNoPassword } = user;
        return userNoPassword;
    }

    async updateUser(user: User, id: string) {
        await this.userRepository.update(id, user);
        const updateUser = await this.userRepository.findOneBy({ id: id });
        if(!updateUser)throw new InternalServerErrorException("Error Updatear al usuario con ID:"+id)
        const { password, ...userNoPassword } = updateUser;
        return userNoPassword;
    }

    async deleteUser(id: string) {
        const user = await this.userRepository.findOneBy({ id: id });
        if(!user)throw new InternalServerErrorException("Error Eliminar el usuario con ID:"+id)
        this.userRepository.remove(user);
        const { password, ...userNoPassword } = user;
        return userNoPassword;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOneBy({ email: email });
        return user;
    }

}