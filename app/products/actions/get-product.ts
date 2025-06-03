'use server';

import { GET } from '@/app/common/util/fetch';
import Product from '../interfaces/product.interface';

export default async function getProducts() {
  console.log('Fetching products...');
  return GET<Product[]>('products', ['products'], new URLSearchParams({ status: 'available' }));
}
