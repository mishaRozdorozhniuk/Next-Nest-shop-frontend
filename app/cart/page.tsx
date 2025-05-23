"use client";

import { useCartStore } from '../stores/cartStore/useCartStore';
import { Card, CardContent, Typography, Grid, Button, Box, Paper } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Image from 'next/image';
import { getProductImage } from '../products/product-image';
import CartTotalSummary from '../components/CartTotalSummary';

export default function Cart() {
  const products = useCartStore(state => state.products);
  const removeCardFromProduct = useCartStore(state => state.removeProductFromCart);

  if (!products.length) {
    return (
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        height='100vh'
        textAlign='center'
      >
        <ShoppingCartCheckoutIcon sx={{ fontSize: 80, color: 'gray' }} />
        <Typography variant='h4' gutterBottom>
          Your cart is empty
        </Typography>
        <Typography variant='subtitle1'>Looks like you haven’t added anything yet.</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant='h3' gutterBottom>
        🛒 Your Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {products.map(product => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {product.imageExists && (
                    <Image
                      src={getProductImage(product.id, product.imageExtension)}
                      width={300}
                      height={200}
                      style={{ objectFit: 'cover' }}
                      alt={`Picture of ${product.name}`}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant='h6'>
                      {product.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary' mb={1}>
                      {product.description}
                    </Typography>
                    <Typography variant='subtitle1' color='primary'>
                      ${product.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                  <Box px={2} pb={2}>
                    <Button
                      variant='outlined'
                      color='error'
                      onClick={() => removeCardFromProduct(product.id)}
                      fullWidth
                    >
                      Remove
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3}>
            <CartTotalSummary products={products} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
