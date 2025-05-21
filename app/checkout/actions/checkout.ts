'use server';

import { POST } from '@/app/common/util/fetch';

export default async function checkout(productId: number) {
  return POST('checkout/session', { productId });
}
