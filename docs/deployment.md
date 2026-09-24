# Cloudflare Pages deployment

The production path is deliberately simple:

```text
GitHub push or merge
        │
        ▼
      main
        │
        ▼
Cloudflare Pages Git integration
        │
        ▼
  npm run build
        │
        ▼
      dist/
        │
        ▼
https://contextonion.dev
```

## One-time Cloudflare Pages setup

1. In Cloudflare, open **Workers & Pages**, choose **Create application**, then **Pages** and **Connect to Git**.
2. Authorize GitHub and select `contextonion/contextonion`.
3. Configure the build with these exact values:
   - Production branch: `main`
   - Framework preset: `Astro`
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Save and deploy the project.
5. In the Pages project's **Custom domains** section, add `contextonion.dev`. Complete any DNS instructions Cloudflare shows.
6. In **Builds & deployments**, keep automatic production deployments enabled for `main` and preview deployments enabled for non-production branches.

Do not add a GitHub Actions deployment workflow. The Git integration must remain the owner of build and deploy triggers.

## Verify the production loop

After setup, make a visible change on a feature branch and open a pull request.

1. Confirm Cloudflare creates a preview deployment and exposes its URL on the pull request.
2. Review the preview and merge the pull request.
3. Confirm the merge commit on `main` starts a production deployment automatically.
4. Confirm the deployment reports success and <https://contextonion.dev> serves that commit.

The result should support a decision within five minutes:

- **Ship:** the preview is correct and the production deployment is healthy.
- **Iterate:** the preview is usable but the change needs improvement.
- **Investigate:** the build fails, the preview is missing, or production does not match `main`.
