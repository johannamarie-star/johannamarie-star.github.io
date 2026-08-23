# Deployment

## Canonical locations

- Repository: <https://github.com/johannamarie-star/johannamarie-star.github.io>
- Public website: <https://johannamarie-star.github.io/>
- Publishing branch: `main`
- Workflow: `.github/workflows/pages.yml`

No Cloudflare deployment is part of the current architecture.

## Current publishing flow

Every push to `main` starts the GitHub Pages workflow:

1. Check out the repository.
2. Configure Node.js 22.13.0 and the npm cache.
3. Configure GitHub Pages.
4. Install exact locked dependencies with `npm ci`.
5. Run ESLint.
6. Build the Next.js static export.
7. Upload the generated `out/` directory as the Pages artifact.
8. Deploy that artifact to the `github-pages` environment.

The workflow can also be started manually through `workflow_dispatch`.

## Deployment safety

The deploy job depends on the build job. A lint or build failure prevents a new Pages artifact from being deployed, leaving the previous successful website available.

The content validator runs as part of `npm run build`, so invalid editor content or a missing referenced upload cannot reach the deploy job.

## Local pre-push verification

From the repository root:

```bash
npm ci
npm run check
```

`npm run check` runs lint, validates `content/site.json` and its referenced uploads, and creates the production static build.

## Recovery

For an undesirable content change, prefer a new revert commit so history remains intact. Do not rewrite shared history or use destructive resets on the published branch.

For a failed workflow:

1. Read the failing GitHub Actions step.
2. Reproduce the relevant check locally.
3. Correct the source, content, or configuration.
4. Run the full local check.
5. Push the fix and confirm the new workflow succeeds.

Do not add a second host as a workaround for a normal build failure.

## Editor publishing

Pages CMS is installed for only this repository and writes content or public media changes to `main`. Each save creates a GitHub commit and starts this existing GitHub Pages pipeline; the editor does not have a separate deployment process.

The workflow was verified end to end on August 24, 2026 with a temporary metadata save followed by a Pages CMS restore. Both the repaired content model and the final restored revision completed successful static deployments.
