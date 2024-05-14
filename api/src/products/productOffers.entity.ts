import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_offers')
export class ProductOffer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product_id: number;

    @Column()
    image_url: string;

    @Column()
    price: number;

    @Column()
    rating: number;

    @Column()
    scraped_from_url: string;

    @Column()
    seller: string;

    @Column()
    seller_url: string;

    @Column()
    title: string;

    @ManyToOne(() => Product, product => product.offers, {nullable:false})
    @JoinColumn({ name: 'product_id' })
    
    product: Product;
}
