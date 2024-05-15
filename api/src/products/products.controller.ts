import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './products.service';
import { Product } from './product.entity'; 
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('products')
export class ProductsController {
    constructor(private productService: ProductService) {}

    @Get()
    async getAllProducts() {
      const products = await prisma.products.findMany();
      const productIds = products.map(product => product.product_id);
  
      const productOffers = await prisma.product_offers.findMany({
        where: {
          product_id: {
            in: productIds,
          },
        },
      });
  
      const formattedProducts = products.map(product => ({
        product_id :  product.product_id,
        product_name: product.product_name,
        offers: productOffers.filter(offer => offer.product_id === product.product_id).map(offer => ({
          id: offer.id,
          image_url: offer.image_url,
        })),
      }));
  
      return { products: formattedProducts };
    }
    
  

    @Get(':id')
    getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productService.findOne(id);
    }

    @Get(':id/history')
  async getProductHistory(@Param('id') id: string) {
    const productId = parseInt(id, 10);

    const productOffers = await prisma.product_offers.findMany({
      where: {
        product_id: productId,
      },
    });

    const productOfferIds = productOffers.map((offer) => offer.id);
    const history = await prisma.product_history_prices.findMany({
      where: {
        product_offer_id: {
          in: productOfferIds,
        },
      },
    });

    const stores = [...new Set(productOffers.map((offer) => offer.seller))];

    return {
      history: history.map((entry) => {
        const offer = productOffers.find((offer) => offer.id === entry.product_offer_id);
        return {
          price: entry.price,
          date: entry.data,
          seller: offer?.seller,
        };
      }),
      stores,
    };
  }
}