'use client';

import Product from './product';
import IProduct from './interfaces/product.interface';
import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { API_URL } from '../common/constants/api';
import revalidateProducts from './actions/revalidate-products';
import getAuthentication from '../auth/actions/get-authentication';

interface ProductGridProps {
  products: IProduct[];
}

export default function ProductsGrid({ products }: ProductGridProps) {
  useEffect(() => {
    let socket: Socket;

    const createSocket = async () => {
      socket = io(API_URL!, {
        auth: {
          Authentication: await getAuthentication(),
        },
        transports: ['websocket'],
      });

      socket.on('productUpdated', () => {
        revalidateProducts();
      });
    };

    createSocket();

    return () => {
      socket?.disconnect();
    };
  }, []);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {products?.map(product => (
        <div key={product.id} className='h-full'>
          <Product product={product} />
        </div>
      ))}
    </div>
  );
}
