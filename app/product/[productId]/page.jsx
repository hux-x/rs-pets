import ProductPage from '../../../src/components/products/page';
import { products } from '../../../src/assets/assets';
// Generate static params for all products
export async function generateStaticParams() {
 
return  products.map((product) => ({
        productId: product._id,
      }));
}


export default async function Page({ params }) {
  const { productId } = await params;
  console.log(productId)
  
  return (
    <ProductPage productId={productId} />
  );
}