import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductOffer } from './productOffers.entity';  

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    product_id: number;

    @Column()
    product_name: string;

    @OneToMany(() => ProductOffer, offer => offer.product)
    offers: ProductOffer[];
}


