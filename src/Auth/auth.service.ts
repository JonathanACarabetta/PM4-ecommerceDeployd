import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "src/dtos/createUserDto.dto";
import {UsersService} from "../users/users.service"
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { JWT_SECRET } from "src/config/envs";
import { Role } from "src/rol.enum";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService:JwtService
    ){}

    async signUp(createUser: CreateUserDto, repeatedPassword:string) {
        const findUser = await this.usersService.getUserByEmail(createUser.email);
        if(findUser)throw new BadRequestException("Email already exist")
        
        if(createUser.password != repeatedPassword)throw new BadRequestException("Passwords are not equal")

        const hashedPassword = await bcrypt.hash(createUser.password,10);

        if(!hashedPassword)throw new BadRequestException("Password could'n be hashed")

        

        this.usersService.createUser({...createUser,password:hashedPassword})
        const {password,repeatPassword,...userNoPass}=createUser;
        return userNoPass;
    }

    async signIn(email: string, password: string){
        const user = await this.usersService.getUserByEmail(email);

        if(!user)throw new NotFoundException("User not found")

        console.log(user.isAdmin);
        
        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid)throw new BadRequestException("Invalid Credentials")

        const userPayload={
            id:user.id,
            email: user.email,
            roles: user.isAdmin?"admin":"user"
        }
        
        const token = this.jwtService.sign(userPayload)
        return {
            message: "User logged in Successfully",
            token: token
        }
    }
};