"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import deleteProduct from '../actions/delete-product';

export default function DeleteProduct({ productId }: { productId: number }) {
  const router = useRouter();

  const handleDeleteProduct = async () => {
    try {
      const response = await deleteProduct(productId);

      if (response?.error) {
        console.error('Failed to delete product:', response.error);
      } else {
        console.log('Product deleted successfully');
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <button
      className='px-4 py-2 mt-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'
      onClick={handleDeleteProduct}
    >
      Delete
    </button>
  );
}
