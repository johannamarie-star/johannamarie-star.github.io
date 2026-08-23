# Decision Record

This document records decisions that should influence future work. It is not a commit log. Update an existing decision when it is superseded and link the replacement.

## D001 — Public identity and content integrity

- **Status:** Accepted
- **Decision:** The public brand is always **Johanna Marie**. The prohibited surname identified in `AGENTS.md` must never be displayed or reintroduced. Unverified professional facts remain obvious placeholders rather than invented claims.
- **Reason:** The portfolio must protect Johanna's chosen public identity and remain truthful to recruiters and employers.

## D002 — GitHub-owned publishing

- **Status:** Implemented
- **Decision:** The canonical repository is `johannamarie-star/johannamarie-star.github.io`, and the canonical website is <https://johannamarie-star.github.io/>. GitHub Actions builds the static export and GitHub Pages hosts it.
- **Reason:** Johanna wanted publishing through GitHub without requiring Cloudflare or another hosting account.
- **Consequence:** Do not reintroduce Cloudflare or the former ChatGPT Sites deployment without an explicit new decision.

## D003 — Retain the current framework for now

- **Status:** Accepted
- **Decision:** Keep the current Next.js, React, TypeScript, and custom CSS implementation while adding the editor.
- **Reason:** The framework is more capable than a one-page static site strictly requires, but it already builds successfully and changing frameworks would add migration risk without improving Johanna's editing experience.
- **Consequence:** A future simplification remains possible because the output and planned content contract are static and file-based.

## D004 — Separate content from presentation

- **Status:** Implemented
- **Decision:** Move approved editable values into `content/site.json`. Keep components, layout, style, section order, and behavior in `app/`.
- **Reason:** Johanna needs safe small edits while structural changes remain a maintainer responsibility.
- **Consequence:** Presentation redesigns should preserve semantic content keys when practical. New content concepts require deliberate contract changes.

## D005 — Use hosted Pages CMS as the editing surface

- **Status:** Repository integration implemented; hosted authorization pending
- **Decision:** Use the hosted Pages CMS interface as a form-based layer over the GitHub repository. Do not build or embed a custom editor application.
- **Reason:** A custom editor would require additional hosting, authentication, security, and maintenance. Pages CMS provides structured file and media editing while GitHub remains the content source of truth.
- **Consequence:** The Pages CMS GitHub App must be restricted to Johanna's portfolio repository. The public site must not depend on Pages CMS at runtime.

## D006 — Johanna owns and controls editor access

- **Status:** Accepted
- **Decision:** Johanna authorizes and uses the editor through her own GitHub account. Xavier may build and maintain the technical integration when asked but does not own the editor, content, or credentials and does not need permanent editor access.
- **Reason:** The tool is being created for Johanna's independent use, not for remote control by the maintainer.
- **Consequence:** Never share account credentials. Any future collaborator access must use separate identities and least privilege.

## D007 — Keep version one intentionally small

- **Status:** Implemented
- **Decision:** Version one supports constrained text, public links, images, accessible image descriptions, and a résumé PDF within the existing page structure. It excludes an embedded admin route, custom authentication, database, drag-and-drop building, arbitrary code editing, role systems, approval queues, and live visual editing.
- **Reason:** This is the minimum useful editor for independent routine updates and avoids turning a portfolio into a software product.

## D008 — Direct publishing with validation and recovery

- **Status:** Implemented
- **Decision:** An editor save records a GitHub change and triggers the existing `main` branch deployment. Content validation and the static build must pass before publishing; Git history provides rollback.
- **Reason:** Requiring maintainer approval for every text edit would defeat Johanna's independence. Validation and previous-deployment retention limit technical risk.
- **Consequence:** Version one will not add a draft or approval workflow unless real use demonstrates a need.

## D009 — Documentation is layered and maintained with changes

- **Status:** Implemented
- **Decision:** Keep non-negotiable instructions and routing in `AGENTS.md`; store product, architecture, content-model, deployment, maintenance, and decision detail under `docs/`.
- **Reason:** A short entry point is easier to keep authoritative, while focused documents reduce duplication and stale mixed-state handoffs.
- **Consequence:** Significant changes must update their relevant document in the same commit.

## D010 — Every verified change has a recoverable commit

- **Status:** Accepted
- **Decision:** Agents and maintainers create a focused commit after each coherent, verified change and include only files belonging to that task. Pages CMS creates a Git commit automatically whenever Johanna saves content or media.
- **Reason:** The portfolio will evolve incrementally, so small meaningful commits provide understandable recovery points without requiring Johanna to learn Git.
- **Consequence:** Do not commit every keystroke, read-only investigation, known failure, unfinished experiment, generated output, secret, or unrelated pre-existing change. Push to `main` only when the verified change is intended to be shared or published.
