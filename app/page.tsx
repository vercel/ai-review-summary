import { Reviews } from "@/components/reviews";
import { Product } from "@/lib/types";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function Home() {
  const product = await getProduct();

  return (
    <main className="pt-6">
      <Reviews product={product} />
    </main>
  );
}

async function getProduct() {
  let origin = `https://${process.env.VERCEL_URL}`;
  if (process.env.NODE_ENV === "development") {
    origin = `http://${headers().get("host") || "localhost:3000"}`;
  }
  console.log(`${origin}/api/sample-reviews?productId=mower`);
  const response = await fetch(`${origin}/api/sample-reviews?productId=mower`, {
    headers: {
      "x-vercel-protection-bypass":
        process.env.VERCEL_AUTOMATION_BYPASS_SECRET || "",
    },
  });
  if (response.status === 404) {
    notFound();
  }
  if (response.status !== 200) {
    throw new Error("Failed to fetch product");
  }
  return (await response.json()) as Product;
}
