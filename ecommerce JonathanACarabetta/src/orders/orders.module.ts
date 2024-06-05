import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersRepository } from "./orders.repository";
import { ProductsRepository } from "src/products/products.repository";
import { UsersRepository } from "src/users/users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/products/products.entity";
import { Order } from "./orders.entity";
import { User } from "src/users/users.entity";
import { OrderDetails } from "src/ordersDetails/ordersDetails.entity";
import { OrdersController } from "./orders.controller";

@Module({
    imports:[TypeOrmModule.forFeature([Product]),TypeOrmModule.forFeature([Order]),TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([OrderDetails])],
    providers:[OrdersService, OrdersRepository],
    controllers:[OrdersController],
})
export class OrdersModule{}