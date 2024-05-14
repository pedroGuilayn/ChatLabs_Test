import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './products/product.entity';
import { ProductOffer } from './products/productOffers.entity';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres', 
    host: 'localhost', 
    port: 5432, 
    username: 'postgres', 
    password: 'postgres123', 
    database: 'postgres', 
    entities: [Product, ProductOffer]
  }),ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
