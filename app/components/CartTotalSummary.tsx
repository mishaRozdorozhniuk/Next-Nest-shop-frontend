import { useCartStore } from '../stores/cartStore/useCartStore';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  imageExists?: boolean;
  imageExtension?: string;
}

interface CartTotalSummaryProps {
  products: Product[];
}

export default function CartTotalSummary({ products }: CartTotalSummaryProps) {
  const totalPrice = useCartStore(state => state.getTotalPrice);

  return (
    <div className='w-full max-w-sm mx-auto bg-[#fdf7f2] p-6 rounded-md shadow-md'>
      <h2 className='text-lg font-semibold text-gray-800 mb-4'>Summary</h2>

      <div className='flex justify-between text-sm mb-2'>
        <span>Subtotal ({products.length} Items)</span>
        <span>${products.length}</span>
      </div>

      <hr className='border-gray-300 mb-4' />

      {products?.map(product => (
        <div key={product.id} className='flex justify-between text-sm text-black mb-2'>
          <span>{product.name}</span>
          <span>${product.price.toFixed(2)}</span>
        </div>
      ))}

      <div className='flex justify-between font-bold text-black text-lg mb-4'>
        <span>Balance</span>
        <span>{totalPrice()}</span>
      </div>

      <button className='w-full py-2 px-4 bg-[#0a0a23] text-white rounded-md hover:bg-[#1a1a3c] transition'>
        Checkout
      </button>
    </div>
  );
}
