'use client';

import { useCartStore } from '../stores/cartStore/useCartStore';
import { Typography, Paper } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
// import Image from 'next/image';
// import { getProductImage } from '../products/product-image';
import CartTotalSummary from '../components/CartTotalSummary';

export default function Cart() {
  const products = useCartStore(state => state.products);
  const removeCardFromProduct = useCartStore(state => state.removeProductFromCart);

  if (!products.length) {
    return (
      <div className='flex flex-col items-center justify-center h-screen text-center'>
        <ShoppingCartCheckoutIcon sx={{ fontSize: 80, color: 'gray' }} />
        <Typography variant='h4' gutterBottom>
          Your cart is empty
        </Typography>
        <Typography variant='subtitle1'>Looks like you haven’t added anything yet.</Typography>
      </div>
    );
  }

  return (
    <div className='p-8'>
      <h1 className='text-3xl font-bold mb-6'>🛒 Your Shopping Cart</h1>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {products.map(product => (
            <div
              key={product.id}
              className='bg-white rounded-lg shadow flex flex-col overflow-hidden'
            >
              {/* {product.imageExists && (
                <Image
                  src={getProductImage(product.id, product.imageExtension ?? '')}
                  width={300}
                  height={200}
                  style={{ objectFit: 'cover' }}
                  alt={`Picture of ${product.name}`}
                />
              )} */}
              <div className='flex flex-col flex-grow p-4'>
                <h2 className='text-lg font-semibold mb-1'>{product.name}</h2>
                <p className='text-sm text-gray-600 flex-grow'>{product.description}</p>
                <p className='text-indigo-600 font-semibold mt-2'>${product.price.toFixed(2)}</p>
              </div>
              <div className='p-4'>
                <button
                  className='w-full py-2 text-sm font-medium bg-red-100 text-red-600 border border-red-500 rounded-md hover:bg-red-200 transition'
                  onClick={() => removeCardFromProduct(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <Paper elevation={3} className='p-4'>
            <CartTotalSummary products={products} />
          </Paper>
        </div>
      </div>
    </div>
  );
}
