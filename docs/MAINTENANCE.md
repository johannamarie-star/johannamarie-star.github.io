# Maintenance

## Current transition state

The public site is operational, but the content editor is not implemented yet. Visible homepage content currently lives in `app/page.tsx`. Do not tell Johanna that the form editor is available until the end-to-end workflow has been tested.

After implementation:

- Johanna-facing content will live in `content/site.json`.
- Editor-managed public assets will live in `public/uploads/`.
- `.pages.yml` will define the allowed editing interface.
- `app/` will continue to own layout, rendering, and visual behavior.

## Local development

Requirements:

- Node.js 22.13.0 or newer
- npm

From the repository root:

```bash
npm ci
npm run dev
```

Open the local address printed by Next.js.

## Required verification

Run this before publishing a technical change:

```bash
npm run check
```

The current check includes ESLint and a production static build. When content validation is added, it must be included in the same command and in GitHub Actions.

For visible or interactive changes, also inspect the page at desktop and mobile sizes and check the browser console. Confirm that navigation anchors, mail links, résumé behavior, image loading, and external links work as intended.

## Safe change boundaries

### Content-only changes

Once the editor exists, routine changes should update only `content/site.json` and approved files under `public/uploads/`. They should not require component or CSS edits.

### Structural changes

Changing sections, layout, component behavior, field cardinality, or visual design is maintainer work. Update all affected parts together:

1. React components
2. Content data and defaults
3. `.pages.yml`
4. Content validation
5. Relevant documentation
6. Johanna's editor guide when her experience changes

### Framework changes

Do not migrate away from Next.js merely because a simpler stack could render the current page. Consider a migration only when it has a concrete maintenance benefit, and preserve the semantic content contract so Johanna's editing workflow does not needlessly change.

## Content integrity

- Confirm personal and professional facts with Johanna.
- Keep placeholders obvious until confirmed.
- Never invent metrics, testimonials, clients, roles, outcomes, credentials, contact details, or project claims.
- Never expose private source documents or unintended personal data through `public/`.
- Ensure meaningful images have accurate alternative text.
- Ensure external links are real and use safe public URLs before exposing them.

## Account and access safety

- Johanna uses her own GitHub sign-in and controls repository-connected applications.
- Do not request or store her password, recovery code, session cookie, or token.
- Scope the Pages CMS GitHub App to this repository only during setup.
- Xavier does not need editor ownership or shared credentials to maintain the code.

## Dependency and workflow maintenance

- Keep `package-lock.json` committed.
- Use `npm ci` for reproducible checks and CI.
- Review dependency upgrades for Next.js static-export compatibility.
- Preserve the GitHub Pages permissions and build-before-deploy dependency in `.github/workflows/pages.yml`.
- Avoid adding server-only features that cannot run on GitHub Pages.

## Documentation maintenance

Update documentation as part of the same change when facts move from planned to implemented. In particular, the editor implementation must update:

- `AGENTS.md` current technical truth
- `docs/ARCHITECTURE.md` status and actual data flow
- `docs/CONTENT-MODEL.md` exact field names and validation
- `docs/DECISIONS.md` only if a decision changes
- `docs/DEPLOYMENT.md` validation order
- This transition section
- A new `docs/EDITOR-GUIDE.md` based on verified behavior
