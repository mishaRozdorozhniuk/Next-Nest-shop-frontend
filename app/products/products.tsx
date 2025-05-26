import getProducts from './actions/get-product';
// import ProductsGrid from './products-grid';

export default async function Products() {
  const products = await getProducts();

  console.log('Products:', products);

  // return <ProductsGrid products={products} />;
  return <>test</>
}
