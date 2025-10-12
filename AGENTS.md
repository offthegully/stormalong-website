# Repository Guidelines

## Project Structure & Module Organization
- Next.js App Router. Core pages in `app/` (`layout.tsx`, `page.tsx`, route folders). Global styles in `app/globals.css`.
- Reusable UI in `components/` (file names kebab-case, e.g., `page-header.tsx`).
- Utilities in `lib/`, React hooks in `hooks/`, shared types in `types/`.
- Static assets in `public/`; Tailwind config in `tailwind.config.ts`; PostCSS in `postcss.config.mjs`.
- Path alias `@/*` is available (see `tsconfig.json`).

## Build, Test, and Development Commands
- `npm run dev` – start Next.js dev server.
- `npm run build` – production build.
- `npm start` – run the built app.
- `npm run lint` – Next.js ESLint checks.

## Coding Style & Naming Conventions
- Language: TypeScript (`strict: true`). Prefer explicit types on public APIs.
- Indentation: 2 spaces; single quotes or project default; semicolons optional per ESLint.
- Components: export names in PascalCase; files in kebab-case (`testimonial-carousel.tsx`).
- Hooks prefixed with `use-` (e.g., `hooks/use-mobile.tsx`).
- Use `clsx`/`tailwind-merge` for class names; keep Tailwind classes readable and grouped.
- Imports: prefer `@/` alias for local modules.

## Testing Guidelines
- No test runner configured yet. If adding tests:
  - Unit: Vitest + React Testing Library (`*.test.tsx`) colocated with source or under `__tests__/`.
  - E2E: Playwright in `tests/` with project-specific fixtures.
  - Aim for critical-path coverage (navigation, forms, key components).

## Commit & Pull Request Guidelines
- Commits: short, imperative summaries (e.g., "add cider specs icons"). Group related changes; avoid noisy WIP commits.
- Branching: create feature branches from `develop` (if present) or `main`; open PRs back to the same.
- PRs must include:
  - Description of changes and rationale; linked issues (e.g., `Closes #123`).
  - Screenshots/video for UI changes.
  - How to test (steps, expected results).
  - Checks passing: `build`, `lint`, and local run sanity.

## Security & Configuration
- Secrets in `.env.local` (never commit). Reference via `process.env.NEXT_PUBLIC_*` for client-safe vars.
- Keep dependencies minimal; prefer existing utilities in `components/`, `lib/`, and `hooks/` before adding packages.
