import { GET } from '@/app/common/util/fetch';
import Product from '../interfaces/product.interface';

export default async function getProduct(productId: string) {
  return GET<Product>(`products/${productId}`);
}
