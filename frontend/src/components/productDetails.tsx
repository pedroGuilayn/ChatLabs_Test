import React from 'react';
import { Product as ProductDetailInterface } from '../interfaces/product';
import styles from '../app/ProductDetail.module.css';

interface ProductDetailProps {
  product: ProductDetailInterface;
}

const formatCurrency = (value: number) => {
  return (value / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  if (!product || !product.offers) {
    return <div>Codigo de produto inexistente</div>;
  }

  const { product_name, offers } = product;

  const minPrice = Math.min(...offers.map((offer) => offer.price));
  const medPrice = Math.round(offers.reduce((sum, offer) => sum + offer.price, 0) / offers.length);
  const maxPrice = Math.max(...offers.map((offer) => offer.price));

  return (
    <div className={styles.productDetailContainer}>
      <div className={styles.productHeader}>
        <img src={offers[0].image_url} alt={product_name} className={styles.productImage} />
        <div className={styles.productInfo}>
          <h1>{product_name}</h1>
          <div className={styles.productPrices}>
            <a href={offers[0].scraped_from_url} target="_blank" rel="noopener noreferrer">
              Mínimo: {formatCurrency(minPrice)}
            </a>
            <a href={offers[0].scraped_from_url} target="_blank" rel="noopener noreferrer">
              Médio: {formatCurrency(medPrice)}
            </a>
            <a href={offers[0].scraped_from_url} target="_blank" rel="noopener noreferrer">
              Máximo: {formatCurrency(maxPrice)}
            </a>
          </div>
        </div>
      </div>
      <h2>Veja onde comprar o produto:</h2>
      <div className={styles.offerList}>
        {offers.map((offer) => (
          <a
            key={offer.id}
            href={offer.scraped_from_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.offerCard}
          >
            <div className={styles.offerInfo}>
              <img src={offer.image_url} alt={offer.seller} className={styles.offerImage} />
              <div className={styles.offerDetails}>
                <h3>{offer.seller}</h3>
                <p>Rating: {offer.rating}</p>
                <p>{offer.title}</p>
              </div>
              <div className={styles.offerPrice}>
                {formatCurrency(offer.price)}
                <span className={styles.arrow}>→</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
