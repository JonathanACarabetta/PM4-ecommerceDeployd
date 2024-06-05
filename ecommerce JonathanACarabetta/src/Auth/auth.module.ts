import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersRepository } from "src/users/users.repository";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/users.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    providers:[AuthService, UsersService,UsersRepository],
    controllers:[AuthController],
})
export class AuthModule{};