"use server"

import { DELETE } from '@/app/common/util/fetch'

export default async function deleteProduct(productId: number) {
  return DELETE(`products/${productId}`);
}
