import CreateProductFab from './products/create-product/create-product-fab';
import Products from './products/products';
import ClientWrapper from './hooks/useRefreshAndFetch';

export default function Home() {
  return (
    <ClientWrapper>
      <Products />
      <CreateProductFab />
    </ClientWrapper>
  );
}
