import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const urls = [
    'http://85.31.60.80:26500/search?text=notebook',
    'http://85.31.60.80:26500/search?text=amazfit%20gts%204',
    'http://85.31.60.80:26500/search?text=iphone%2014'
];

async function fetchAndStoreData(url: string) {
    const response = await axios.get(url);
    const data = response.data.data;

    const product = await prisma.products.upsert({
        where: { product_name: data.title },
        update: {
            min_price: data.prices.min,
            med_price: data.prices.med,
            max_price: data.prices.max,
        },
        create: {
            product_name: data.title,
            min_price: data.prices.min,
            med_price: data.prices.med,
            max_price: data.prices.max,
        }
    });

    await Promise.all(
        data.products.map(async (offer: any) => {
            const product_offer = await prisma.product_offers.upsert({
                where: {
                    scraped_from_url: offer.scraped_from_url,
                },
                update: {
                    price: offer.price,
                    rating: offer.rating,
                },
                create: {
                    product_id: product.product_id,
                    rating: offer.rating,
                    price: offer.price,
                    scraped_from_url: offer.scraped_from_url,
                    image_url: offer.image_url,
                    seller: offer.seller,
                    seller_url: offer.seller_url,
                    title: offer.title,
                }
            });

             await prisma.product_history_prices.create({
                data: {
                    product_offer_id: product_offer.id,
                    price: offer.price,
                    data: new Date(),
                }
            });
        })
    );
}

async function main() {
    for (const url of urls) {
        try {
            await fetchAndStoreData(url);
            console.log(`Dados inseridos com sucesso para a URL: ${url}`);
        } catch (error) {
            console.log(`Erro ao processar a URL: ${url}`);
        }
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
