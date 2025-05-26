// import Image from 'next/image';
import getProduct from './get-product';
import { Stack, Typography } from '@mui/material';
// import { getProductImage } from '../product-image';
import Checkout from '@/app/checkout/checkout';
import Image from 'next/image';

interface SingleProductProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function SingleProduct({ params }: SingleProductProps) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.productId);

  if (!product.id) {
    return (
      <Stack spacing={4} sx={{ marginBottom: '2rem', alignItems: 'center' }}>
        <Typography variant='h4' component='h1' sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Product not found
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack spacing={4} sx={{ marginBottom: '2rem', alignItems: 'center' }}>
      <Typography variant='h4' component='h1' sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        {product.name}
      </Typography>
      <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center' }}>
        <Image
          src={product?.imageUrl}
          width={100}
          height={100}
          className='w-full h-auto'
          sizes='100vw'
          alt={`Picture of ${product.name}`}
        />
        <Typography variant='body1' sx={{ color: 'text.secondary', maxWidth: '600px' }}>
          {product.description}
        </Typography>
        <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          ${product.price.toFixed(2)}
        </Typography>
        <Checkout productId={product.id} />
      </Stack>
    </Stack>
  );
}
