// src/products/products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>
    ) {}

    findAll(): Promise<Product[]> {
        return this.productsRepository.find({
            relations: ['offers'], 
            select: ['product_name'] 
        })
        
    }
    async findOne(product_id: number): Promise<Product> {
        const product = await this.productsRepository.findOne({
            where: { product_id },
            relations: ['offers']
        });
        if (!product) {
            throw new NotFoundException(`Product with ID ${product_id} not found`);
        }
        return product;
    }
}