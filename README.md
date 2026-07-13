# AIZinc Website

A curated AI tools directory built with Next.js, TypeScript, and Tailwind CSS. Tool data comes from WordPress via the REST API.

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

- Next.js App Router (static export)
- TypeScript
- Tailwind CSS
- Lucide React
- WordPress REST API (client-side fetch)

## Deploy to Hostinger (static)

This app is built as a **static export** for Hostinger shared hosting (`public_html`).

```bash
npm run build
```

Upload the **contents** of the generated `out/` folder to Hostinger `public_html`.

**Notes:**
- WordPress tool data loads **client-side** in the browser after the page loads.
- Normal tool/content updates in WordPress do **not** require rebuilding the frontend.
- Rebuild and re-upload only when you change the Next.js app code, styles, or layout.

## CORS

The WordPress site must allow browser requests from your AIZinc domain. If tools fail to load in production, check WordPress/CORS settings for the REST API.
