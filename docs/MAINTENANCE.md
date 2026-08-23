# Maintenance

## Current operational state

The public site and hosted Pages CMS editor are operational and verified. Johanna can make routine form-based content and media edits without using Git commands.

- Johanna-facing content lives in `content/site.json`.
- Editor-managed public assets live in `public/uploads/`.
- `.pages.yml` defines the allowed editing interface.
- `scripts/validate-content.mjs` blocks invalid structure, unsafe paths, malformed links, missing alternative text, and missing referenced files.
- `app/` continues to own layout, rendering, and visual behavior.

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

The check includes ESLint, content and referenced-file validation, and a production static build. GitHub Actions uses the same validated build path.

For visible or interactive changes, also inspect the page at desktop and mobile sizes and check the browser console. Confirm that navigation anchors, mail links, résumé behavior, image loading, and external links work as intended.

## Git change discipline

1. Inspect `git status` before editing and preserve unrelated work.
2. Complete one coherent requested change.
3. Run the checks appropriate to that change.
4. Commit only the files belonging to the task with a descriptive message.
5. Push after verification when the change is intended for the shared repository or live site.

Do not create commits for read-only investigations or known failures. Do not include secrets, generated output, unrelated pre-existing changes, or unfinished experiments. Routine Pages CMS saves are committed automatically and do not require Johanna to use Git commands.

## Safe change boundaries

### Content-only changes

Routine editor changes should update only `content/site.json` and approved files under `public/uploads/`. They should not require component or CSS edits. Empty optional editor values may be omitted from JSON and must remain safe for validation and rendering.

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
- Keep the Pages CMS GitHub App scoped to this repository only.
- Xavier uses the separate `Avaxerrr` collaborator account when repository or editor access is needed; he never uses Johanna's credentials.

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
- This operational-state section
- `docs/EDITOR-GUIDE.md` whenever the verified editor experience changes
