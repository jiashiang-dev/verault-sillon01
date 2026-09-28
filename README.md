# VÉRAULT — Sillon 01

A seven-chapter React, TypeScript, Tailwind and shadcn-compatible portfolio experience for a fictional mechanical watch concept. The watch imagery is concept visualization; no physical watch is manufactured or offered for sale.

## Run

Requires Node.js 22.12+ and pnpm.

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm build
```

`pnpm build` runs TypeScript checking and creates the Vite production bundle. The development server defaults to `http://127.0.0.1:5173/`.

## Project paths

- Entry page: `src/pages/Sillon01Page.tsx`
- Parallax Hero: `src/components/ui/parallax-scrolling.tsx` and `watch-hero.css`
- Chapters 02–07: `src/components/sections/WatchStory.tsx` and `WatchStory.css`
- Shared styles and Tailwind: `src/index.css`
- Product imagery: `public/images/verault/`
- Editorial routes: `public/dossier.html`, `public/case-study.html`, `public/credits.html`
- Sillon 01 detail portal: `src/components/ui/glyph-portal.tsx` and `glyph-portal.css`

The `@/*` alias resolves to `src/*`. The shadcn UI convention is `src/components/ui`, as configured in `components.json`.

## Assets and interaction

The ten supplied PNGs remain in `public/images/verault/`; matching WebP files are used by the site with PNG fallbacks. Replace a visual by updating both files with the same stem and dimensions. The desktop Hero uses the three-quarter image; mobile uses the front portrait. Below-the-fold images load lazily.

GSAP and ScrollTrigger control the restrained Hero depth and desktop Section 02 view crossfade. Lenis is active only on desktop when reduced motion is not requested. Tablet and mobile use native scrolling and static image sequencing. Section 05 preserves the imported Glyph Portal's live-type camera, letter selection and scroll reveal, then presents five watch details in its feature grid without an extra scroll trigger. Reduced-motion visitors receive the complete story without scroll animation.

The public dossier labels product dimensions and performance figures as design targets or proposed movement specifications. It must not be presented as a manufactured product specification.
