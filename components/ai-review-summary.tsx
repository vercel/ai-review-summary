import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Product } from "@/lib/types";
import { summarizeReviews } from "@/lib/ai-summary";
import { FiveStarRating } from "./five-star-rating";

export async function AIReviewSummary({ product }: { product: Product }) {
  const summary = await summarizeReviews(product);
  const averageRating =
    product.reviews.reduce((acc, review) => acc + review.stars, 0) /
    product.reviews.length;
  return (
    <Card className="w-full max-w-prose p-10 grid gap-10">
      <CardHeader className="items-center space-y-0 gap-4 p-0">
        <div className="grid gap-1 text-center">
          <CardTitle className="text-lg">AI Summary</CardTitle>
          <CardDescription className="text-xs">
            Based on {product.reviews.length} customer ratings
          </CardDescription>
        </div>
        <div className="bg-gray-100 px-3 rounded-full flex items-center py-2 dark:bg-gray-800">
          <FiveStarRating rating={Math.round(averageRating)} />
          <span className="text-sm ml-4 text-gray-500 dark:text-gray-400">
            {numberWithOneDecimal(averageRating)} out of 5
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0 grid gap-4">
        <p className="text-sm leading-loose text-gray-500 dark:text-gray-400">
          {summary}
        </p>
      </CardContent>
    </Card>
  );
}

function numberWithOneDecimal(num: number) {
  if (num === Math.round(num)) return num;
  return Math.round(num * 10) / 10;
}
