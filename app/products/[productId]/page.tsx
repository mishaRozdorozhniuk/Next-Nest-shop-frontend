import Image from 'next/image';
import getProduct from './get-product';
import { Stack, Typography } from '@mui/material';
import { getProductImage } from '../product-image';
import Checkout from '@/app/checkout/checkout';

interface SingleProductProps {
  params: {
    productId: string;
  };
}

export default async function SingleProduct({ params }: SingleProductProps) {
  console.log(params, params.productId);
  const product = await getProduct(params.productId);

  return (
    <Stack spacing={4} sx={{ marginBottom: '2rem', alignItems: 'center' }}>
      <Typography variant='h4' component='h1' sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        {product.name}
      </Typography>
      {product.imageExists && (
        <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Image
            src={getProductImage(product.id)}
            alt={`Picture of ${product.name}`}
            width={400}
            height={400}
            className='rounded-md shadow-md'
            sizes='(max-width: 768px) 100vw, 50vw'
          />
          <Typography variant='body1' sx={{ color: 'text.secondary', maxWidth: '600px' }}>
            {product.description}
          </Typography>
          <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            ${product.price.toFixed(2)}
          </Typography>
          <Checkout productId={product.id} />
        </Stack>
      )}
    </Stack>
  );
}
