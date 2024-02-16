import { Reviews } from "@/components/reviews";
import { getProduct, sampleProductsReviews } from "@/lib/sample-data";

export default async function ProductPage({
  params: { productId },
}: {
  params: { productId: string };
}) {
  const product = await getProduct(productId);

  return <Reviews product={product} />;
}

export async function generateStaticParams() {
  const productIds = Object.keys(sampleProductsReviews);

  return productIds.map((id) => ({
    productId: id,
  }));
}
