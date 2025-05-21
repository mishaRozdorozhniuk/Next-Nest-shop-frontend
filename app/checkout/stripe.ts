import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Stripe | null = null;

const getStripe = async () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
    if (!publishableKey) {
      throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined');
    }
    stripePromise = await loadStripe(publishableKey);
  }

  return stripePromise;
};

export default getStripe;
