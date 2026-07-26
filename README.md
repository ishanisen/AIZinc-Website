# AIZinc Website

A curated AI tools directory built with Next.js, TypeScript, and Tailwind CSS. Homepage tool data comes from Supabase.

## Setup

```bash
npm install
cp .env.example .env.local   # if .env.local does not exist yet
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase (required)

Homepage tools are loaded from the `public.tools` table via Supabase.

**`.env.local`** is gitignored. Replace the placeholders with your real values from Supabase → **Project Settings → API**:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key_here
```

| Variable | What to use |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Base project URL, e.g. `https://abcdefgh.supabase.co` — **not** the `/rest/v1` URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | The **publishable (anon) key** — never use the service role / secret key in the frontend |

Until you replace the placeholders, the homepage shows a friendly error with **Try again**.

## Logo

Place your logo at:

```
public/aizinc-logo.png
```

If the image is missing, the navbar falls back to a text “AIZinc” logo.

## Stack

- Next.js App Router (static export)
- TypeScript
- Tailwind CSS
- Lucide React
- Supabase (homepage tool data)

## Deploy to Hostinger (static)

```bash
npm run build
```

Upload the **contents** of the generated `out/` folder to Hostinger `public_html`.

Set the same `NEXT_PUBLIC_*` env vars at build time (or bake them into `.env.local` before running `npm run build`) so they are included in the static bundle.

Tool content updates in Supabase appear on refresh — no frontend rebuild needed for data changes.
