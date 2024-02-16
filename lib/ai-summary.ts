import { unstable_cache } from "next/cache";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Product } from "./types";

if (!process.env.PERPLEXITY_API_KEY) {
  throw new Error(
    "PERPLEXITY_API_KEY environment variable is required. You can get this via https://vercel.com/docs/integrations/ai"
  );
}
const perplexity = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY || "",
  baseURL: "https://api.perplexity.ai",
});

export async function summarizeReviews(product: Product) {
  const averageRating =
    product.reviews.reduce((acc, review) => acc + review.stars, 0) /
    product.reviews.length;

  const prompt = `Write a summary of the reviews for the ${
    product.name
  } product.
Your goal is to highlight the most common themes and sentiments expressed by customers.
If multiple themes are present, try to capture the most important ones.
If no patterns emerge but there is a shared sentiment, capture that instead.
Try to use natural language and keep the summary concise.
Use a maximum of 4 sentences and 30 words.

Start the summary with "Customers like…" or "Customers mention…"

The product's average rating is ${averageRating} out of 5 stars. Hit the following tone based on rating:
- 1-2 stars: negative
- 3 stars: neutral
- 4-5 stars: positive

The customer reviews to summarize are as follows:
${product.reviews
  .map((review, i) => `Review ${i + 1}:\n${review.review}`)
  .join("\n\n")}`;

  const query = {
    model: "pplx-7b-chat",
    stream: true,
    messages: buildPrompt(prompt),
    max_tokens: 1000,
    temperature: 0.75,
    top_p: 1,
    frequency_penalty: 1,
  } as const;

  return unstable_cache(async () => {
    const response = await perplexity.chat.completions.create(query);

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);

    // Respond with the stream
    const streamingResponse = new StreamingTextResponse(stream);
    let text = await streamingResponse.text();
    // Remove the quotes from the response tht the LLM sometimes adds.
    text = text.trim().replace(/^"/, "").replace(/"$/, "");
    return text;
  }, [
    JSON.stringify(query),
    "1.0",
    process.env.VERCEL_BRANCH_URL || "",
    process.env.NODE_ENV || "",
  ])();
}

function buildPrompt(prompt: string) {
  return prompt.split("\n").map((message) => ({
    role: "user" as const,
    content: message,
  }));
}

function getAIService() {}
