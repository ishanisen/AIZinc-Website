# AIZinc Website

A curated AI tools directory — design preview homepage built with Next.js, TypeScript, and Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Logo

Place your logo at:

```
public/aizinc-logo.png
```

If the image is missing, the navbar falls back to a text “AIZinc” logo.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Lucide React

Tool data is fetched server-side from the WordPress REST API via `lib/tools.ts`.
