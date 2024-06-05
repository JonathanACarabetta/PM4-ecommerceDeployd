import { Category } from "src/categories/categories.entity";
import { OrderDetails } from "src/ordersDetails/ordersDetails.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from "uuid";
@Entity({
    name:"products"
})
export class Product{
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
    })
    description:string

    @Column({
        type:"decimal",
        precision:10,
        scale:2
    })
    price:number

    @Column({
        type:"integer",
        nullable:false
    })
    stock:number 

    @ManyToOne(()=> Category, (category)=> category.products)
    category:Category
    
    @Column({
        type:"varchar",
        default:"../../assets/images/defaultIMG"
    })
    imgUrl:string
    
    @ManyToMany(()=>OrderDetails, (orderDetails)=>orderDetails.products)
    orderDetails:OrderDetails[]
}