import { API_URL } from '../common/constants/api';

export const getProductImage = (productId: number, ext: string) => {
  return `${API_URL}/images/products/${productId}${ext}`;
};
