# AGENTS.md

## Repository

- Runtime: cloudflare pages
- Node.js 22.12 or newer.
- Install dependencies: `npm install`.
- Start local development: `npm run dev`.
- Build production output: `npm run build`.
- Preview the build: `npm run preview`.

Begin with `README.md` for the project overview.

## System

- Model, terminology, and acquisition flow: `rfcs/RFC-001-progressive-context-acquisition.md`.
- Machine-readable MUST/SHOULD projection: `rfcs/RFC-001-progressive-context-acquisition.statements.json` (published at `/rfcs/RFC-001-progressive-context-acquisition.statements.json`).
- RFC lifecycle and index: `rfcs/README.md`.
- Publishing topology and Cloudflare workflow: `docs/deployment.md`.
- Project roles and decision-making: `GOVERNANCE.md`.
- Canonical RFC content: `rfcs/`.
- Website routes and presentation: `src/pages/`.
- Static assets: `public/`.
- Astro configuration: `astro.config.mjs`.

Read the relevant source before changing model behavior, terminology, governance, or deployment. Cloudflare Pages deploys the static Astro build from `main`. Trace a rendered RFC page to its imported Markdown before editing.

## Conventions

- Contribution process and writing guidance: `CONTRIBUTING.md`.
- Use nearby Astro and CSS patterns: two-space indentation, single-quoted JavaScript strings, trailing semicolons, semantic HTML, and accessible labels.
- For model or standards work, follow [RFC-001: Progressive Context Acquisition for Engineering Agents](https://contextonion.dev/rfcs/RFC-001-progressive-context-acquisition/) as the authoritative standard. Follow `CONTRIBUTING.md` for proposal and review expectations and `GOVERNANCE.md` for ownership and decisions. Route to these sources instead of restating them here.

## Boundaries

- Keep RFC Markdown authoritative; do not duplicate policy into Astro pages or this file.
- Keep `rfcs/*.statements.json` projections aligned with capitalized requirements in their RFC Markdown.
- Update `rfcs/README.md` when an RFC is added or its status changes.
- Keep claims vendor-neutral and supported by evidence.
- Do not commit generated `dist/` output or secrets.
- Do not add a GitHub Actions deployment workflow; Cloudflare's Git integration owns deployment.
- Use focused commits with short imperative subjects.

## Verification

Run `npm run build` for every change. For presentation changes, also run `npm run preview` and inspect affected pages at common viewport sizes. Check links, accessibility labels, canonical URLs, RFC status, and consistency among canonical Markdown, the RFC index, and rendered routes. In a pull request, state the decision enabled and validation performed; include screenshots for visible changes.

## Context acquisition

For behavioral or cross-component work, identify the affected workflow, read enough system documentation to locate the behavior, inspect only the relevant implementation and configuration, resolve applicable repository guidance, and then verify. Expand context only while material uncertainty remains. For isolated text or style changes, go directly to the affected source and focused verification when broader system understanding cannot affect the decision.
