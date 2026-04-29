# Family Dental Centre

A modern, professional website for **Family Dental Centre** — a premium dental clinic located on Buhairah Corniche St, Sharjah, UAE.

## About

This is a single-page marketing website showcasing the clinic's services, doctors, testimonials, and contact information. It includes an appointment booking form powered by Netlify Forms and a floating WhatsApp chat button.

## Key Technologies

| Technology | Purpose |
|---|---|
| [TanStack Start](https://tanstack.com/start) | Full-stack React framework (file-based routing, SSR) |
| [TanStack Router](https://tanstack.com/router) | Client-side routing |
| [React 19](https://react.dev) | UI rendering |
| [Vite 7](https://vitejs.dev) | Build tool |
| [Tailwind CSS 4](https://tailwindcss.com) | Utility-first styling |
| [Lucide React](https://lucide.dev) | Icon library |
| [Netlify Forms](https://docs.netlify.com/forms/setup/) | Serverless form handling |
| TypeScript | Strict-mode type safety |

## Fonts

- **Cormorant Garamond** — Display / headings (elegant serif)
- **Nunito** — Body copy (clean, friendly sans-serif)

Both loaded from Google Fonts.

## Running Locally

```bash
npm install
npm run dev
```

The dev server starts on **http://localhost:3000**.

> **Note:** Netlify Forms submissions do not work in local development — they require a deployed Netlify environment. To test form handling, deploy a preview branch.

## Building for Production

```bash
npm run build
```

Output goes to `dist/client/`. Deployed automatically via Netlify on push.

## Environment Variables

No environment variables are required for the base website. If you add AI features, set one of:

- `ANTHROPIC_API_KEY`
- `OPENAI_API_KEY`
- `GEMINI_API_KEY`
