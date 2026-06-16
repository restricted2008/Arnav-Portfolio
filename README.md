# Arnav Sharma — Portfolio

Single-page portfolio for Arnav Sharma (graphic designer & performance marketer).
Editorial "print-magazine" design with scroll-triggered motion.

## Stack

- **React 19** + **Vite** — app & build
- **GSAP / ScrollTrigger** — entrance + scroll animations
- **Lenis** — smooth scrolling (disabled when the OS requests reduced motion)
- **Tailwind 4** + hand-written design tokens in `src/index.css`
- **Bootstrap grid** (grid CSS only) — section layouts

## Develop

```bash
npm install
npm run dev      # local dev server
npm run lint     # ESLint
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Structure

```
src/
├── App.jsx             # smooth scroll, loader gate, section order
├── index.css           # design tokens, typography, components, a11y
├── lib/motion.js       # prefers-reduced-motion helper
└── components/         # one file per section (Hero, About, Work, …)
public/assets/          # images, certs, design thumbnails
```

## Deploy

Auto-deploys to Netlify (`netlify.toml`): build `npm run build`, publish `dist/`.
SPA redirect to `/index.html` is configured.

> Before sharing the live link, set an absolute `og:image` URL (and `og:url`)
> in `index.html` so social previews render a real card.
