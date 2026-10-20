# VÉRAULT — Sillon 01

A seven-chapter React, TypeScript, Tailwind and shadcn-compatible portfolio experience for a fictional mechanical watch concept. The watch imagery is concept visualization; no physical watch is manufactured or offered for sale.

## Run

Use Node.js 24 and pnpm 11.25.0, matching the GitHub Actions build. The exact pnpm version is recorded in `package.json`.

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

## GitHub Pages

This existing project is prepared for the public repository `jiashiang-dev/verault-sillon01`, on branch `main`. Its Pages URL will be:

https://jiashiang-dev.github.io/verault-sillon01/

Production builds and `pnpm preview` use `/verault-sillon01/` as the base path. Development still runs at `/`. React media and editorial links use the shared `sitePath` helper and Vite's base URL. The three editorial pages use relative URLs because Vite copies `public/` files without processing their HTML. All original images, styles, motion and responsive layouts are preserved.

To check the production build locally:

```bash
pnpm install --frozen-lockfile
pnpm run build
pnpm preview
```

Open the preview URL with `/verault-sillon01/` at the end. Both the main watch experience and the Sakura demo entry are built into `dist/`. The dossier, case study and credits pages, their stylesheet, and media are copied from `public/`. Build output and dependencies stay excluded from Git; GitHub Actions generates `dist/` itself.

### Commit and push with GitHub Desktop

1. Select the existing `verault-sillon01` repository. If it is not listed, use **File → Add local repository** and select the existing folder `C:\Users\Asus\Documents\GitHub\verault-sillon01`.
2. Confirm the current branch is `main` and the repository is `jiashiang-dev/verault-sillon01`.
3. Review the changes, enter a summary such as `Prepare Sillon 01 for GitHub Pages`, and click **Commit to main**.
4. Click **Push origin**. This pushes the source and runs a build check; it does **not** publish the site.

### Publish only when you choose

The workflow `.github/workflows/pages.yml` follows the GT-R build → artifact → GitHub Pages deployment structure, using this project's existing pnpm lockfile. Pushes and pull requests run the build only. Publication requires a manual run on `main`.

1. Open https://github.com/jiashiang-dev/verault-sillon01/settings/pages and select **GitHub Actions** under **Build and deployment → Source**. Do not select a branch or `dist/` as a publishing folder.
2. Open the repository's **Actions** tab and select **Build and publish Sillon 01**.
3. Select **Run workflow**, choose `main`, and click **Run workflow** when ready to publish.
4. Wait for the build and deploy jobs to succeed, then open the Pages URL above. Test the mobile menu, chapter links, dossier, case study and credits.

No remote settings are changed by local preparation. No commit, push, workflow run or deployment is performed for you. This project has no Netlify-specific configuration or service dependency to remove.

GitHub Pages workflow reference: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
