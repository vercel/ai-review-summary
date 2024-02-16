import { Product, Review } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

const productsReviews: Record<string, Product> = {
  mower: {
    name: "Mower3000",
    reviews: [
      {
        review:
          "Absolutely love the Mower3000! Installation was a breeze, thanks to the clear instructions and videos. It navigates my complex yard with ease, even the steep parts. Plus, it's so quiet, I barely notice it's working. Truly a game-changer for lawn care.",
        authorName: "Jake P.",
        date: "2024-02-15",
        stars: 5,
      },
      {
        review:
          "The Mower3000 has been a solid addition to my garden tools. It handles the lawn autonomously, freeing up my weekends. The app control is intuitive, though I wish the Bluetooth range was better. Overall, a reliable lawn mower that does its job well.",
        authorName: "Marianne L.",
        date: "2024-01-28",
        stars: 4,
      },
      {
        review:
          "Mower3000 promises a lot but delivers just enough. It's great on flat surfaces but struggles a bit on my sloped edges. The noise level is as advertised—very quiet. The boundary wire setup took some time, but it's working fine. A decent purchase.",
        authorName: "Chris T.",
        date: "2024-02-10",
        stars: 3,
      },
      {
        review:
          "I had high hopes for the Mower3000, but it's been a mixed bag. The setup was more complicated than expected, and it occasionally misses spots on the lawn. It's quiet and the safety features are reassuring, but I expected more precision for the price.",
        authorName: "Alexa R.",
        date: "2023-12-20",
        stars: 3,
      },
      {
        review:
          "The Mower3000's streak-free technology is not as flawless as advertised. My lawn looks mostly good, but there are areas where it seems to have missed or cut unevenly. The app and setup are user-friendly, but I'm a bit disappointed in the overall performance.",
        authorName: "Derek S.",
        date: "2024-01-05",
        stars: 3,
      },
      {
        review:
          "Not impressed with the Mower3000. It's supposed to navigate narrow spaces, yet it's gotten stuck multiple times in areas of my yard that aren't that complicated. The noise level is fine, but what's the use if it can't do its primary job right?",
        authorName: "Patricia N.",
        date: "2024-02-03",
        stars: 2,
      },
      {
        review:
          "Disappointed with the Mower3000. It struggles with slopes and often leaves uneven cuts. The boundary wire installation was a hassle, and the Bluetooth connectivity is hit or miss. Expected more from such an expensive gadget.",
        authorName: "Ron J.",
        date: "2023-11-15",
        stars: 2,
      },
      {
        review:
          "Frustrated with the Mower3000. It frequently loses its boundary wire signal and ends up mowing outside its zone, causing a mess. The concept is great, but the execution is lacking. Plus, customer service hasn't been very helpful in resolving my issues.",
        authorName: "Simone K.",
        date: "2024-01-22",
        stars: 1,
      },
      {
        review:
          "The Mower3000 is decent. It mows the lawn autonomously, which is convenient. However, the setup took some effort, and the app could be more stable. It's nice to have, but I'm not sure it's worth the investment for smaller yards.",
        authorName: "Gary W.",
        date: "2024-02-05",
        stars: 3,
      },
      {
        review:
          "Overall, the Mower3000 is a good buy. It handles most of my lawn well, including the slope. The silent operation is a huge plus. Just wish the battery life was longer, as it doesn't always finish in one go. Still, it's much better than manual mowing.",
        authorName: "Bethany E.",
        date: "2024-01-19",
        stars: 4,
      },
    ],
  },
  sample1: {
    name: "Sample Product 1",
    reviews: [
      {
        review:
          "The device feels a bit flimsy and stopped working after a month of use. Customer service was slow to respond, leaving me disappointed.",
        authorName: "Alex Johnson",
        date: "2024-01-15",
        stars: 1,
      },
      {
        review:
          "Not what I expected based on the description. The color was off and it didn't fit well with my other gadgets. It works okay, but I wouldn't buy it again.",
        authorName: "Samantha Lee",
        date: "2024-02-01",
        stars: 2,
      },
      {
        review:
          "The software updates are infrequent, causing some features to become outdated quickly. It does the job, but there are definitely better options out there.",
        authorName: "Michael Brown",
        date: "2024-01-20",
        stars: 2,
      },
      {
        review:
          "It arrived on time and was well-packaged. However, the setup instructions were a bit confusing. Took me longer than expected to get it up and running.",
        authorName: "Emily Wilson",
        date: "2024-01-10",
        stars: 3,
      },
      {
        review:
          "For the price, this is a decent buy. It has a few quirks, like occasionally slow response times, but it's reliable overall. Satisfied with my purchase.",
        authorName: "David Smith",
        date: "2024-02-05",
        stars: 3,
      },
      {
        review:
          "The product is pretty good for everyday use. I've had it for a few weeks now and haven't encountered any major issues. Battery life could be better though.",
        authorName: "Jessica Miller",
        date: "2024-01-25",
        stars: 4,
      },
      {
        review:
          "I was pleasantly surprised by the build quality given the price point. It's not perfect, but it performs well for most tasks. Would recommend to others looking for a budget-friendly option.",
        authorName: "Chris Garcia",
        date: "2024-01-18",
        stars: 4,
      },
      {
        review:
          "This product exceeded my expectations. It's user-friendly and integrates well with my other devices. A great find that I've been recommending to all my friends.",
        authorName: "Olivia Martinez",
        date: "2024-02-08",
        stars: 5,
      },
      {
        review:
          "Absolutely love this product! It's been a game changer for my daily routine. High-quality, durable, and the customer support team is fantastic. Definitely worth every penny.",
        authorName: "Daniel Gonzalez",
        date: "2024-01-05",
        stars: 5,
      },
      {
        review:
          "Good value for the price. It's not without its flaws, but overall it does what it's supposed to do. The app could use some improvements, but I'm happy with my purchase.",
        authorName: "Karen Hernandez",
        date: "2024-02-10",
        stars: 3,
      },
    ],
  },
};

export function GET(request: NextRequest) {
  const productId = request.nextUrl.searchParams.get("productId") || "mower";
  const reviews = productsReviews[productId];
  if (!reviews) {
    return new Response("Product not found", { status: 404 });
  }
  return NextResponse.json(reviews);
}
