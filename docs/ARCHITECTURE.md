# Architecture

## Status

The public website, file-based content contract, Pages CMS configuration, validation, and GitHub Pages deployment are implemented and verified end to end. The Pages CMS GitHub App is installed for only this repository.

## Current system

```text
content/site.json + app/ + public assets
                    |
                    v
          Content validation + static build
                    |
                    v
             GitHub Pages deployment
                    |
                    v
        https://johannamarie-star.github.io/
```

The site has no server runtime, application database, private API, or authentication route. Next.js produces static files, and GitHub Actions publishes them to GitHub Pages.

## Approved editor architecture

```text
Johanna's browser
      |
      | signs in with her GitHub account
      v
Hosted Pages CMS editor
      |
      | edits only configured fields and media
      v
Johanna's GitHub repository
  |- .pages.yml          editor field definitions
  |- content/site.json   editable content
  |- public/uploads/     editor-managed public files
  `- app/                maintainer-owned presentation
      |
      v
GitHub Actions validation and static build
      |
      v
GitHub Pages
```

Pages CMS is an external editing surface, not a runtime dependency of the portfolio. It writes version-controlled files to GitHub. The website reads those files during its static build and does not contact Pages CMS when a visitor opens the site.

## Ownership and trust boundaries

| Area | Owner/controller | Access boundary |
| --- | --- | --- |
| GitHub account and repository | Johanna | Her GitHub credentials; separate `Avaxerrr` collaborator invitation pending |
| Pages CMS authorization | Johanna | GitHub App restricted to this repository |
| Editable content and uploads | Johanna | Fields and media paths exposed by `.pages.yml` |
| Components, layout, CSS, and build configuration | Technical maintenance scope | Not exposed in the editor |
| Public website | Johanna | Readable by anyone |

Xavier may maintain the technical code through his separate `Avaxerrr` account after accepting Johanna's GitHub invitation. This access does not transfer ownership of the repository, content, editor, or credentials.

## Content and presentation contract

- `content/site.json` contains version-one editable values only.
- `app/` will decide where and how those values are rendered.
- `.pages.yml` exposes friendly form controls mapped to the same stable keys.
- `public/uploads/` contains only public assets intentionally uploaded for the portfolio.
- Structural identifiers needed by the layout may be stored in code or hidden/read-only fields; Johanna will not need to manage them.

Presentation can be redesigned without changing Johanna's editor when the redesign continues to consume the same content keys. A genuinely new content concept requires an intentional update to the component, content contract, editor configuration, validation, and documentation.

## Version-one editing scope

Version one may expose:

- Approved headings and descriptive text
- Project and capability copy within the existing fixed structure
- Contact and public social links
- A portrait and project images
- A public résumé PDF
- Relevant accessible alternative text

Version one will not include:

- An embedded `/admin` route
- A custom login or password system
- A database or server-side CMS API
- A drag-and-drop page builder
- Arbitrary HTML, CSS, JavaScript, or code editing
- Section creation, deletion, or reordering
- Multiple roles, approval queues, or live visual editing
- A second hosting platform

## Save and deployment behavior

The current workflow is a direct content save to the default branch:

1. Johanna edits and saves a configured field or upload.
2. Pages CMS records the file change in GitHub history.
3. A push to `main` starts the GitHub Pages workflow.
4. Validation and the static build must succeed before deployment.
5. GitHub Pages publishes the new static output.

The previously deployed website remains available during a build. If validation or build fails, the failed revision must not replace the live deployment. A mistaken but valid content change remains recoverable through Git history.

## Independence and failure behavior

- If Pages CMS is unavailable, the published site continues working.
- If Pages CMS is disconnected, all content and uploads remain in GitHub.
- If a build fails, the previous successful deployment remains live.
- If a content edit is undesirable, Git history provides a recovery path.
- If the framework changes later, retaining the content contract allows the editor configuration and stored content to remain useful.

## Activation verification

Completed on August 24, 2026:

1. Installed Pages CMS with **Only select repositories** enabled and this repository as the sole selection.
2. Verified the real content form, image controls, résumé controls, repository scope, and save message.
3. Saved a temporary metadata-only change and confirmed that Pages CMS created a GitHub commit.
4. Corrected validation so Pages CMS may safely omit empty optional fields.
5. Restored the original metadata through Pages CMS and confirmed a successful GitHub Pages deployment and live response.
