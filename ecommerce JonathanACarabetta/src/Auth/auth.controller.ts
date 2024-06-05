import { Body, Controller, Get, NotFoundException, Param, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto, LoginUserDto } from "src/dtos/createUserDto.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController{
    constructor(private readonly authService: AuthService) {};
    
    @Post("signin")
    login(@Body() login:LoginUserDto){
        return this.authService.signIn(login.email, login.password);
    }
    @Post("signup")
    async createUser(@Body() createUser: CreateUserDto){
        return this.authService.signUp(createUser,createUser.repeatPassword);
    }
};
