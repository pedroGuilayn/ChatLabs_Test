
export interface Offer {
  id: number;
  product_id: number;
  image_url: string;
  price: number;
  rating: number;
  scraped_from_url: string;
  seller: string;
  seller_url: string;
  title: string;
}

export interface Product {
  product_id: number;
  product_name: string;
  offers: Offer[];
}
