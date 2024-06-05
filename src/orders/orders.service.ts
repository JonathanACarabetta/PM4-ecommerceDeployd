import { Injectable } from "@nestjs/common";
import { OrdersRepository } from "./orders.repository";
import { Order } from "./orders.entity";

@Injectable()
export class OrdersService {
    constructor(private readonly ordersRepository: OrdersRepository,) { }


    addOrder(userId: string, products: any) {
        try {
            return this.ordersRepository.addOrder(userId, products);
        } catch (error) {
            throw new Error(error);
        }
    }

    getOrderId(id: string) {
        return this.ordersRepository.getOrderById(id);
    }
}