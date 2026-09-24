# Context Onion

Context Onion is an open model and reference standard for progressive context acquisition by engineering agents. It describes how an agent can reach sufficient, reliable context without broadly scanning a repository or loading every available source by default.

The four knowledge layers are:

1. **Current Task** — the immediate objective, issue, bug, feature, refactor, or operational change.
2. **System Understanding** — the architecture, workflows, domain model, dependencies, and boundaries that explain where the task belongs.
3. **Task Context** — the source, tests, configuration, interfaces, and implementation details needed for the change.
4. **Organizational Context** — applicable RFCs, standards, policies, quality requirements, and shared engineering guidance.

The recommended acquisition sequence is:

```text
Current Task
    → System Understanding
    → Task Context
    → Organizational Context, as applicable
    → Verification
```

The sequence is progressive and conditional: acquire enough context to make the next engineering decision safely, then expand only when uncertainty requires it. Trivial, isolated changes may move directly from Current Task to Task Context and Verification.

Read [RFC-001: Progressive Context Acquisition for Engineering Agents](rfcs/RFC-001-progressive-context-acquisition.md) for the model, normative guidance, and worked examples.

The project is maintained in the Context Onion GitHub organization and is independent of any contributor's personal GitHub namespace. Authorship and project identity are recorded separately.

- Website: <https://contextonion.dev>
- GitHub organization: <https://github.com/contextonion>
- Canonical repository: <https://github.com/contextonion/contextonion>
- Feedback: [hello@contextonion.dev](mailto:hello@contextonion.dev)
- RFC index: [rfcs/README.md](rfcs/README.md)
- Contributing: [CONTRIBUTING.md](CONTRIBUTING.md)
- Governance: [GOVERNANCE.md](GOVERNANCE.md)

## Local development

The website uses Astro and requires Node.js 22.12 or newer.

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

See [docs/deployment.md](docs/deployment.md) for setup and verification details.
