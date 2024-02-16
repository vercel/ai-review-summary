import { unstable_cache } from "next/cache";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Product } from "./types";

const fireworks = new OpenAI({
  baseURL: "https://api.fireworks.ai/inference/v1",
  apiKey: process.env.FIREWORKS_API_KEY!,
});

export async function summarizeReviews(product: Product) {
  const prompt = `Write a 30 word pitch for why a person who has in their shopping cart should also purchase the "${product.name}"`;

  const query = {
    model: "accounts/fireworks/models/mistral-7b-instruct-4k",
    stream: true,
    messages: buildPrompt(prompt),
    max_tokens: 1000,
    temperature: 0.75,
    top_p: 1,
    frequency_penalty: 1,
  } as const;

  return unstable_cache(async () => {
    // Request the Fireworks API for the response based on the prompt
    const response = await fireworks.chat.completions.create(query);

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
