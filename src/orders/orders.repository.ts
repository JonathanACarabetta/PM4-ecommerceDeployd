import { Injectable, NotFoundException, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./orders.entity";
import { Repository } from "typeorm";
import { User } from "src/users/users.entity";
import { Product } from "src/products/products.entity";
import { OrderDetails } from "src/ordersDetails/ordersDetails.entity";

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(OrderDetails) private orderDetailsRepository: Repository<OrderDetails>,
    ) { }

    async addOrder(userId: string, products: any) {
        let total = 0;
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) return `Usuario con id ${userId} no encontrado`;

        const order = new Order();
        order.date = new Date();
        order.user = user;

        const newOrder = await this.orderRepository.save(order);

        const productsArray = await Promise.all(
            products.map(async (element) => {
                const product = await this.productRepository.findOneBy({ id: element.id });

                if (!product) return `Producto con id ${element.id} no encontrado`

                if(product.stock!=0) {
                    total += Number(product.price);

                    await this.productRepository.update({ id: element.id }, { stock: product.stock - 1 });

                    return product;
                }
            }),
        );
        const orderDetails = new OrderDetails();

        orderDetails.price = total;
        orderDetails.products = productsArray;
        orderDetails.order = newOrder;

        await this.orderDetailsRepository.save(orderDetails);
        
        await this.orderRepository.update({id: newOrder.id}, {
            orderDetails:orderDetails
        })
        
        

        const checkOrder = await this.orderRepository.find({where:{id:newOrder.id},relations:{orderDetails:true}})
        if (!checkOrder) throw new InternalServerErrorException("Error al crear una orden para el usuario: " + userId)

        return checkOrder;
    }

    getOrderById(id:string){
        const order = this.orderRepository.findOne({
            where:{id:id},
            relations:{
                orderDetails:{
                    products:true
                }
            }
        })
        if(!order){
            throw new NotFoundException(`Orden con id ${id} no encontrada`);
        }
        return order;
    }

}