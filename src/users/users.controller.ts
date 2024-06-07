import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "src/guards/users.guard";
import { CreateUserDto, UpdateUserDto } from "src/dtos/createUserDto.dto";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/rol.enum";
import { RolesGuard } from "src/guards/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("users")
@Controller("users")
export class UsersController{
    constructor(private readonly usersService: UsersService){}

    @ApiBearerAuth()
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    getUsers(){
        const users = this.usersService.getUsers();
        return users;
    }

    @ApiBearerAuth()
    @Get(":id")
    @UseGuards(AuthGuard)
    getUserById(@Param("id", ParseUUIDPipe) id:string){
        const user = this.usersService.getUserById(id);
        return user;
    }

    @ApiBearerAuth()
    @Put("update/:id")
    @UseGuards(AuthGuard)
    updateUser(@Body() updateUserDto:UpdateUserDto, @Param("id",ParseUUIDPipe) id: string){
        const user = this.usersService.updateUser(updateUserDto, id);
        return user;
    }

    @ApiBearerAuth()
    @Delete("delete/:id")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    deleteUser(@Param("id",ParseUUIDPipe) id: string){
        const user = this.usersService.deleteUser(id);
        return user;
    }

    @ApiBearerAuth()
    @Get("email/:email")
    @UseGuards(AuthGuard)
    getUserByEmail(@Param("email") email:string){
        const user = this.usersService.getUserByEmail(email);
        return user;
    }
};