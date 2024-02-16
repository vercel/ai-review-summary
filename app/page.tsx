import { Reviews } from "@/components/reviews";
import { getProduct } from "@/lib/sample-data";

export default async function Home() {
  const product = await getProduct("mower");

  return <Reviews product={product} />;
}
