'use client'
import React, { useEffect, useState } from 'react';
import styles from '../styles/Products.module.css'; 
import { Product, Offer } from '@/interfaces/product';
import { useRouter } from 'next/router';
  


const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);  
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const results = products.filter(product =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  const handleProductClick = (id: number) => {
    router.push(`/product-details/${id}`);
  }; 
  
  return (
    <div>
      <input
        type="text"
        placeholder="Pesquisar produtos"
        className={styles.searchBar}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={styles.productsContainer}>
        {filteredProducts.map(product => (
          <div
            key={product.offers[0].product_id}
            className={styles.productCard}
            onClick={() => handleProductClick(product.offers[0].product_id)}
          >
            <img src={product.offers[0].image_url} alt={product.product_name} className={styles.productImage} />
            <div className={styles.productName}>{product.product_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};




export default ProductsPage;