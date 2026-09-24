# Repository Guidelines

## Orientation

This repository contains the Context Onion reference model and its Astro website.

- Runtime: Node.js 22.12 or newer.
- Install dependencies: `npm install`.
- Start local development: `npm run dev`.
- Build production output: `npm run build`.
- Preview the build: `npm run preview`.

Begin with `README.md` for the project overview.

## System-Understanding Routing

- Model, terminology, and acquisition flow: `rfcs/RFC-001-progressive-context-acquisition.md`.
- RFC lifecycle and index: `rfcs/README.md`.
- Publishing topology and Cloudflare workflow: `docs/deployment.md`.
- Project roles and decision-making: `GOVERNANCE.md`.

Read the relevant source before changing model behavior, terminology, governance, or deployment. Cloudflare Pages deploys the static Astro build from `main`.

## Task-Context Routing

- Canonical RFC content: `rfcs/`.
- Website routes and presentation: `src/pages/`.
- Static assets: `public/`.
- Astro configuration: `astro.config.mjs`.
- Contribution process and writing guidance: `CONTRIBUTING.md`.

Trace a rendered RFC page to its imported Markdown before editing. Use nearby Astro and CSS patterns: two-space indentation, single-quoted JavaScript strings, trailing semicolons, semantic HTML, and accessible labels.

## Constraints

- Keep RFC Markdown authoritative; do not duplicate policy into Astro pages or this file.
- Update `rfcs/README.md` when an RFC is added or its status changes.
- Keep claims vendor-neutral and supported by evidence.
- Do not commit generated `dist/` output or secrets.
- Do not add a GitHub Actions deployment workflow; Cloudflare's Git integration owns deployment.
- Use focused commits with short imperative subjects.

## Organizational-Context Routing

For model or standards work, follow [RFC-001: Progressive Context Acquisition for Engineering Agents](https://contextonion.dev/rfcs/RFC-001-progressive-context-acquisition/) as the authoritative standard. Follow `CONTRIBUTING.md` for proposal and review expectations and `GOVERNANCE.md` for ownership and decisions. Route to these sources instead of restating them here.

## Verification

Run `npm run build` for every change. For presentation changes, also run `npm run preview` and inspect affected pages at common viewport sizes. Check links, accessibility labels, canonical URLs, RFC status, and consistency among canonical Markdown, the RFC index, and rendered routes. In a pull request, state the decision enabled and validation performed; include screenshots for visible changes.

## Context-Acquisition Policy

For behavioral or cross-component work, identify the affected workflow, read enough system documentation to locate the behavior, inspect only the relevant implementation and configuration, resolve applicable repository guidance, and then verify. Expand context only while material uncertainty remains. For isolated text or style changes, go directly to the affected source and focused verification when broader system understanding cannot affect the decision.
