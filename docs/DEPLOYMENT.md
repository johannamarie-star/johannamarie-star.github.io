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

The planned content validator must run before or as part of the build so invalid editor content cannot reach the deploy job.

## Local pre-push verification

From the repository root:

```bash
npm ci
npm run check
```

`npm run check` currently runs lint and the production static build. After the editor implementation it must also validate `content/site.json`.

## Recovery

For an undesirable content change, prefer a new revert commit so history remains intact. Do not rewrite shared history or use destructive resets on the published branch.

For a failed workflow:

1. Read the failing GitHub Actions step.
2. Reproduce the relevant check locally.
3. Correct the source, content, or configuration.
4. Run the full local check.
5. Push the fix and confirm the new workflow succeeds.

Do not add a second host as a workaround for a normal build failure.

## Future editor publishing

Pages CMS will write content or public media changes to the same repository. Those changes will use this existing GitHub Pages pipeline; the editor does not need its own website deployment process.
