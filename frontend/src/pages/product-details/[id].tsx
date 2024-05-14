import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ProductDetail from '../../components/productDetails'; // Importe o componente
import { Product } from '../../interfaces/product'; // Ajuste o caminho conforme necessário

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/products/${id}`)
        .then(response => response.json())
        .then(data => setProduct(data))
        .catch(error => {
          console.error('Error fetching data:', error);
          setProduct(null);
        });
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
   <ProductDetail product={product} /> // Use o componente de detalhes do produto
    
  );
};

export default ProductDetailPage;