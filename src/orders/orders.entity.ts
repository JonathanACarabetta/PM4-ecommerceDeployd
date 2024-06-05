import { OrderDetails } from "src/ordersDetails/ordersDetails.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";
@Entity({
    name:"orders"
})
export class Order{
    @PrimaryGeneratedColumn("uuid")
    id:string = uuid();

    @Column({
        type:"date",
    })
    date:Date

    @ManyToOne(()=>User,(user)=>user.orders)
    user:User;

    @OneToOne(()=>OrderDetails)
    @JoinColumn({
        name:"orderDetails_id",
        referencedColumnName:"id"
    })
    orderDetails:OrderDetails;
    
}