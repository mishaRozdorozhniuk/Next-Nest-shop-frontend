'use server';

import { revalidateTag } from 'next/cache';
import { getHeaders, POST } from '../../common/util/fetch';
import { API_URL } from '@/app/common/constants/api';

export default async function createProduct(formData: FormData) {
  const response = await POST('products', formData);

  const productImage = formData.get('image') as File;

  if (productImage instanceof File && !response.error) {
    const productId = response?.data?.id;
    await uploadProductImage(productId, productImage);
  }
  revalidateTag('products');

  return response;
}

async function uploadProductImage(productId: string, file: File) {
  const formData = new FormData();

  formData.append('image', file);

  await fetch(`${API_URL}/products/${productId}/image`, {
    body: formData,
    method: 'POST',
    headers: await getHeaders(),
  });
}
