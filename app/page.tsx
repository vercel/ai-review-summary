import { Reviews } from "@/components/reviews";
import { sampleProductsReviews } from "@/lib/sample-data";
import { Product } from "@/lib/types";
import { notFound } from "next/navigation";

export default async function Home() {
  const product = await getProduct("mower");

  return (
    <main className="pt-6">
      <Reviews product={product} />
    </main>
  );
}

async function getProduct(id: string) {
  const product = sampleProductsReviews[id] as Product;
  if (!product) {
    notFound();
  }
  return product;
}
