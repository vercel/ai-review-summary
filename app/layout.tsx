import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { sampleProductsReviews } from "@/lib/sample-data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Review summary",
  description: "AI summaries of customer reviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = sampleProductsReviews;
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex justify-around py-4 border-b mb-8">
          {Object.keys(products).map((productId) => (
            <Link
              key={productId}
              className="text-lg font-semibold"
              href={`/${productId}`}
            >
              {products[productId].name}
            </Link>
          ))}
        </nav>
        <p className="text-center text-gray-500 mb-8">
          This is a demo of AI-generated summaries of customer reviews. To learn
          more, see the{" "}
          <Link
            className="underline"
            target="_blank"
            href="https://vercel.com/templates/next.js/customer-reviews-ai-summary-nextjs-vercel"
          >
            complete template
          </Link>
          .{"\n          "}
        </p>
        <main className="pt-6">{children}</main>
      </body>
    </html>
  );
}
