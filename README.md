# AIZinc Website

A curated AI tools directory built with Next.js, TypeScript, and Tailwind CSS. Tool and category data comes from Supabase.

## Setup

```bash
npm install
cp .env.local.example .env.local   # if .env.local does not exist yet
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase (required)

Directory data is loaded server-side from the `public.tools` and `public.categories` tables via Supabase.

**`.env.local`** is gitignored. Copy `.env.local.example` and replace the placeholders with your real values from Supabase → **Project Settings → API**:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key_here
```

| Variable | What to use |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Base project URL, e.g. `https://abcdefgh.supabase.co` — **not** the `/rest/v1` URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | The **publishable (anon) key** — never use the service role / secret key in the frontend |

## Logo

Place your logo at:

```
public/aizinc-logo.png
```

If the image is missing, the navbar falls back to a text “AIZinc” logo.

## Stack

- Next.js App Router (Vercel-ready, server-side data fetching)
- TypeScript
- Tailwind CSS
- Lucide React
- Supabase

## Deploy to Vercel

1. Push the repo and import the project in Vercel.
2. Set the environment variables above in **Project Settings → Environment Variables** (Production, Preview, and Development as needed).
3. Deploy. Vercel runs `next build` and hosts the Node.js server — no static `out/` folder upload.

Tool and category updates in Supabase appear on the next request — no frontend rebuild required for content changes.
