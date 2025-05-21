'use client';

import { Button } from '@mui/material';
import checkout from './actions/checkout';
import getStripe from './stripe';

interface CheckoutProps {
  productId: number;
}

export default function Checkout({ productId }: CheckoutProps) {
  const handleCheckout = async () => {
    const session = await checkout(productId);
    console.log('Session:', session);
    const stripe = await getStripe();

    console.log('Stripe:', stripe);
    await stripe?.redirectToCheckout({
      sessionId: session.data.id,
    });
  };

  return (
    <Button variant='contained' color='primary' onClick={handleCheckout}>
      Buy Now
    </Button>
  );
}
