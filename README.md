# Context Onion

An Astro site deployed to Cloudflare Pages at <https://contextonion.dev>.

## Local development

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev
```

Create the production output locally with:

```sh
npm run build
```

The generated site is written to `dist/`.

## Deployment

Cloudflare Pages owns the build and deployment trigger through its native GitHub integration. There is intentionally no GitHub Actions deployment workflow.

| Cloudflare Pages setting | Value |
| --- | --- |
| Git provider | GitHub |
| Repository | `contextonion/contextonion` |
| Production branch | `main` |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Production domain | `contextonion.dev` |

Every successful push or merge to `main` triggers a production build. Pull requests and non-production branches receive preview deployments from Cloudflare Pages when branch deployments are enabled.

The release decision is visible in Cloudflare Pages: review the preview URL, merge when it is good enough to ship, and investigate any failed production build before treating the change as released.

See [docs/deployment.md](docs/deployment.md) for setup and verification details.
