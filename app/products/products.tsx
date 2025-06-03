'use client';

import React, { useEffect, useState } from 'react';
import getProducts from './actions/get-product';
import ProductsGrid from './products-grid';
import { refreshToken } from '../auth/refresh/refresh';
import Product from './interfaces/product.interface';

export default function Products() {
  const [tokenRefreshed, setTokenRefreshed] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function refreshAndFetch() {
      try {
        await refreshToken();
        setTokenRefreshed(true);
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (e) {
        console.error(e);
      }
    }
    refreshAndFetch();
  }, []);

  if (!tokenRefreshed) {
    return <div>🔄 Refreshing token...</div>;
  }

  if (!products.length) {
    return <div>No products found.</div>;
  }

  return <ProductsGrid products={products} />;
}
