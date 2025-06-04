'use client';

import React from 'react';
import getProducts from './actions/get-product';
import ProductsGrid from './products-grid';
import { useRefreshAndFetch } from '../hooks/useRefreshAndFetch';

export default function Products() {
  const { tokenRefreshed, data: products, error, loading } = useRefreshAndFetch(getProducts);

  if (loading) {
    return <div className='flex items-center justify-center p-4'>🔄 Loading...</div>;
  }

  if (!tokenRefreshed) {
    return <div className='flex items-center justify-center p-4'>🔄 Refreshing token...</div>;
  }

  if (error) {
    return <div className='text-red-500 p-4'>Error: {error}</div>;
  }

  if (!products || products.length === 0) {
    return <div className='p-4'>No products found.</div>;
  }

  return <ProductsGrid products={products} />;
}
