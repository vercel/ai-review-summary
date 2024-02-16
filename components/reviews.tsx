import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Product, Review as ReviewType } from "@/lib/types";
import ms from "ms";

export function Reviews({ product }: { product: Product }) {
  const averageRating =
    product.reviews.reduce((acc, review) => acc + review.stars, 0) /
    product.reviews.length;
  return (
    <div className="mx-auto px-4 md:px-6 max-w-2xl grid gap-12">
      <Card className="w-full max-w-sm p-10 grid gap-10">
        <CardHeader className="items-center space-y-0 gap-4 p-0">
          <div className="grid gap-1 text-center">
            <CardTitle className="text-lg">AI Summary</CardTitle>
            <CardDescription className="text-xs">
              Based on {product.reviews.length} customer ratings
            </CardDescription>
          </div>
          <div className="bg-gray-100 px-3 rounded-full flex items-center py-2 dark:bg-gray-800">
            <FiveStarRating rating={averageRating} />
            <span className="text-sm ml-4 text-gray-500 dark:text-gray-400">
              {numberWithOneDecimal(averageRating)} out of 5
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0 grid gap-4">
          <p className="text-sm leading-loose text-gray-500 dark:text-gray-400">
            Customers generally have a positive experience with this product.
            They praise its durability and ease of use. However, some customers
            have reported issues with the product's battery life.
          </p>
        </CardContent>
      </Card>
      {product.reviews.map((review) => (
        <div key={review.review}>
          <Review key={review.review} review={review} />
          <Separator />
        </div>
      ))}
    </div>
  );
}

export function Review({ review }: { review: ReviewType }) {
  const date = new Date(review.date);
  return (
    <div className="flex gap-4">
      <Avatar className="w-10 h-10 border">
        <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="grid gap-4">
        <div className="flex gap-4 items-start">
          <div className="grid gap-0.5 text-sm">
            <h3 className="font-semibold">{review.authorName}</h3>
            <time
              className="text-sm text-gray-500 dark:text-gray-400"
              suppressHydrationWarning
            >
              {timeAgo(date)}
            </time>
          </div>
          <div className="flex items-center gap-0.5 ml-auto">
            <FiveStarRating rating={review.stars} />
          </div>
        </div>
        <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
          <p>{review.review}</p>
        </div>
      </div>
    </div>
  );
}

function FiveStarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) =>
        i < rating ? (
          <StarIcon key={i} className="w-5 h-5 fill-black" />
        ) : (
          <StarIcon
            key={i}
            className="w-5 h-5 fill-muted stroke-muted-foreground"
          />
        )
      )}
    </div>
  );
}

function numberWithOneDecimal(num: number) {
  if (num === Math.round(num)) return num;
  return Math.round(num * 10) / 10;
}

/**
 * You probably want to wrap the parent element of this component with `suppressHydrationWarning`
 */
const timeAgo = (date: Date, suffix = true) => {
  if (Date.now() - date.getTime() < 1000) {
    return "Just now";
  }
  return `${ms(Date.now() - date.getTime(), { long: true })}${
    suffix ? " ago" : ""
  }`;
};

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
