import React from 'react';
import getProducts from './actions/get-product';
import ProductsGrid from './products-grid';

export default async function Products() {
  const products = await getProducts();

  return <ProductsGrid products={products} />;
}
 
