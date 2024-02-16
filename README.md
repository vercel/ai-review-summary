This is a demo of AI generated summaries of customer reviews.

A deployed version can be found here https://review-summary.vercel.app/

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## AI key

This demo requires an API key for Perplexity's inference API. This can be installed via
[Vercel's AI Marketplace](https://vercel.com/docs/integrations/ai).

Any other LLM model can be connected via minimal changes to `lib/ai-summary.ts`.
