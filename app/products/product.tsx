'use client';

// import Image from 'next/image';
// import { API_URL } from '../common/constants/api';
import DeleteProduct from './create-product/delete-product';
// import { getProductImage } from './product-image';
import { useRouter } from 'next/navigation';
import { CartProductItem, useCartStore } from '../stores/cartStore/useCartStore';

interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  imageExists?: boolean;
  imageExtension?: string;
}

interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {
  const router = useRouter();
  const products = useCartStore(state => state.products);
  const addProductToCart = useCartStore(state => state.addProductToCart);

  const isInCart = products.some(p => p.id === product.id);

  const handleAddProductToCart = (productP: CartProductItem) => {
    if (isInCart) return;
    addProductToCart(productP);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div
      onClick={() => router.push(`/products/${product.id}`)}
      className={`relative flex cursor-pointer flex-col overflow-hidden rounded-lg shadow-lg
        transition-all duration-300 bg-white hover:shadow-xl
        ${isInCart ? 'border-2 border-green-400 bg-green-50' : ''}`}
    >
      {isInCart && (
        <span className='absolute top-1 right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-md shadow'>
          In Cart
        </span>
      )}

      <div className='p-6 flex flex-col flex-grow'>
        <h2 className='text-xl font-bold text-gray-800 mb-2'>{product.name}</h2>
        {/* {product.imageExists && API_URL && (
          <Image
            src={getProductImage(product.id, product.imageExtension ?? '')}
            width={500}
            height={500}
            className='w-full h-auto'
            sizes='100vw'
            alt={`Picture of ${product.name}`}
          />
        )} */}
        <p className='text-gray-600 mb-4 flex-grow'>{product.description}</p>
        <div className='flex items-center justify-between'>
          <span className='text-xl font-bold text-indigo-600'>${product.price.toFixed(2)}</span>
        </div>
        <button
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            handleAddProductToCart(product);
          }}
          disabled={isInCart}
          className={`px-4 py-2 mt-3 text-white rounded-md font-semibold tracking-wide flex items-center gap-2 group transition-all duration-200 shadow-lg
            ${
              isInCart
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 hover:from-indigo-600 hover:to-pink-600'
            }`}
        >
          <svg
            className='w-5 h-5 text-white group-hover:animate-bounce'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m1-13h2a2 2 0 012 2v2a2 2 0 01-2 2h-2.5'
            />
          </svg>
          {isInCart ? 'Already in Cart' : 'Add to Cart'}
        </button>
        <DeleteProduct productId={product.id} />
      </div>
    </div>
  );
}
