# AGENTS.md

Project architecture overview for AI agents and developers working in this codebase.

## Project Overview

A single-page marketing website for **Family Dental Centre**, a premium dental clinic in Sharjah, UAE. Built with TanStack Start and deployed on Netlify.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | TanStack Start (SSR + file-based routing) |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + custom CSS variables |
| Icons | Lucide React |
| Forms | Netlify Forms (AJAX, URL-encoded) |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
public/
  contact-form.html   # Static form skeleton — required for Netlify Forms detection at build time
  favicon.ico
src/
  routes/
    __root.tsx        # Root layout: HTML shell, SEO meta tags, Google Fonts preconnect links
    index.tsx         # Entire website (single-page) — all sections in one component
  styles.css          # Global styles: CSS variables, animations, responsive utilities
  router.tsx          # TanStack Router setup
netlify.toml          # Build config: vite build, publish dist/client, dev port 8888
README.md             # Setup and run instructions
AGENTS.md             # This file
```

## Architecture Decisions

### Single-file page component
`src/routes/index.tsx` contains the entire website: Navbar, Hero, Services, Why Us, Doctors, Testimonials, Gallery placeholder, FAQ accordion, Contact/Booking Form, Location map, Footer, and Floating WhatsApp button. All section data (services, FAQ items, why-us cards) is co-located as typed constants at the top of the file.

### CSS strategy
- Tailwind CSS 4 is imported via `@import "tailwindcss"` in `styles.css`
- Custom CSS variables (`--color-teal`, `--color-gold`, etc.) defined in `:root` and `@theme` blocks
- Scroll-reveal animations use an `IntersectionObserver` hook (`useReveal`) toggling `reveal`, `reveal-left`, `reveal-right` + `.visible` classes
- Stagger delay helpers: `.delay-1` through `.delay-6`
- Responsive layout collapses via a `<style>` tag embedded in the component for structural grid media queries

### Netlify Forms
Appointment form submits via `fetch()` with `application/x-www-form-urlencoded` to `/contact-form.html`. This is required — TanStack Start's SSR intercepts POST to `/` before Netlify's form handler runs. The static skeleton at `public/contact-form.html` registers the `appointment` form at build time.

### Fonts
Google Fonts (Cormorant Garamond + Nunito) loaded via `<link>` tags in `__root.tsx`'s `head()` config with preconnect hints. The CSS `@import` in `styles.css` is a fallback only.

## Design Tokens

| Variable | Value | Usage |
|---|---|---|
| `--color-teal` | `#0a4a5e` | Primary brand colour, headings |
| `--color-teal-light` | `#1a6a84` | Hover states, gradients |
| `--color-teal-dark` | `#062d3a` | Hero bg, footer |
| `--color-cream` | `#faf8f5` | Page background |
| `--color-gold` | `#b8925a` | Accent, section tags, dividers |
| `--color-gold-light` | `#d4ae7a` | Gradient end, highlights |
| `--color-mint` | `#e8f4f0` | Section backgrounds, icon fills |
| `--font-display` | Cormorant Garamond | Headings, doctor names, quotes |
| `--font-body` | Nunito | All body copy, labels, nav |

## Content Locations (for copy updates)

| Section | Where to edit |
|---|---|
| Services | `services` array, top of `index.tsx` |
| Why Choose Us cards | `whyUs` array, top of `index.tsx` |
| FAQ | `faqs` array, top of `index.tsx` |
| Testimonials | Inline JSX in Testimonials section |
| Doctor profiles | Inline JSX in Doctors section |
| Hero headline + CTAs | Hero section JSX |
| Phone / WhatsApp | Hardcoded as `+971555777126` — global find-replace to update |
| Business address | Hardcoded in Contact + Footer sections |

## Coding Conventions

- **Components**: PascalCase; SVG icon helpers defined at the bottom of the file
- **Route files**: kebab-case
- **Styles**: inline `style={{}}` for one-off layout; Tailwind utilities for reusable patterns
- **TypeScript**: strict mode, `type` keyword for type-only imports
- **State**: React `useState` only; no global store needed
- **Comments**: only when the WHY is non-obvious
