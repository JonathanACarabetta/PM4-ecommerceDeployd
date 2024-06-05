import { Order } from "src/orders/orders.entity";
import { Product } from "src/products/products.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";
@Entity({
    name:"ordersDetails"
})
export class OrderDetails{
    @PrimaryGeneratedColumn("uuid")
    id:string = uuid();

    @Column({
        type:"decimal",
        precision:10,
        scale:2
    })
    price:number

    
    @ManyToMany(()=> Product)
    @JoinTable({
        name:"ordersDetails_products",
        joinColumn:{
            name:"product_id",
            referencedColumnName:"id"
        },
        inverseJoinColumn:{
            name:"orderDetails_id",
            referencedColumnName:"id"
        }
    })
    products:Product[]

    @OneToOne(()=> Order)
    @JoinColumn({
        name:"order_id",
        referencedColumnName:"id"
    })
    order:Order;
    
}
