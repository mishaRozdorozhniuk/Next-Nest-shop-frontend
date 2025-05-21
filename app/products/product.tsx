"use client";

import Image from 'next/image';
import { API_URL } from '../common/constants/api';

import DeleteProduct from './create-product/delete-product';
import { getProductImage } from './product-image';
import { useRouter } from 'next/navigation';

interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  imageExists?: boolean;
}

interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {
  const router = useRouter();

  if (!product) return <div>Loading...</div>;

  return (
    <div
      onClick={() => router.push(`/products/${product.id}`)}
      className='flex cursor-pointer flex-col overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300'
    >
      <div className='p-6 flex flex-col flex-grow'>
        <h2 className='text-xl font-bold text-gray-800 mb-2'>{product.name}</h2>
        {product.imageExists && API_URL && (
          <Image
            src={getProductImage(product.id)}
            width={500}
            height={500}
            className='w-full h-auto'
            sizes='100vw'
            alt={`Picture of ${product.name}`}
          />
        )}
        <p className='text-gray-600 mb-4 flex-grow'>{product.description}</p>
        <div className='flex items-center justify-between'>
          <span className='text-xl font-bold text-indigo-600'>${product.price.toFixed(2)}</span>
        </div>
        <button className='px-4 py-2 mt-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors'>
          Add to Cart
        </button>
        <DeleteProduct productId={product.id} />
      </div>
    </div>
  );
}
