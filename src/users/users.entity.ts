import { Order } from "src/orders/orders.entity";
import { Role } from "src/rol.enum";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";
@Entity({
    name:"users"
})
export class User{
    @PrimaryGeneratedColumn("uuid")
    id:string = uuid();

    @Column({
        type:"varchar",
        length:50,
        nullable:false
    })
    name:string 

    @Column({
        type:"varchar",
        length:50,
        nullable:false,
        unique:true,
    })
    email:string

    @Column({
        type:"varchar",
        nullable:false
    })
    password:string

    @Column({
        type:"int",
        nullable:false
    })
    phone:string

    @Column({
        type:"varchar",
        length:50,
        nullable:false
    })
    country:string

    @Column({
        type:"varchar",
        length:255,
        nullable:false
    })
    address:string

    @Column({
        type:"varchar",
        length:50,
        nullable:false
    })
    city:string

    @Column({
        type:"boolean",
        default: false,
        name:"isadmin"
    })
    isAdmin:boolean
    
    @OneToMany(()=>Order, (order)=>order.user)
    @JoinColumn({name: "order_id"})
    orders:Order[]
}
