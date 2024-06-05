import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "src/dtos/createOrderDto.dto";
import { AuthGuard } from "src/guards/users.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
@ApiTags("orders")
@Controller("orders")
@UseGuards(AuthGuard)
export class OrdersController {
    constructor(private readonly ordersService: OrdersService,) { };

    @ApiBearerAuth()
    @Get(":id")
    getOrderById(@Param("id", ParseUUIDPipe) id: string) {
        const order = this.ordersService.getOrderId(id);
        return order;
    }

    @ApiBearerAuth()
    @Post("create")
    addOrder(@Body() order: CreateOrderDto) {
        const { userId, products } = order;
        const newOrder = this.ordersService.addOrder(userId, products);
        return newOrder;
    }

}