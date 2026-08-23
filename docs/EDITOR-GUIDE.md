# Portfolio Editor Guide

## What this editor does

Pages CMS gives Johanna a form for changing approved portfolio text, images, public links, and the résumé PDF. It does not expose the page layout, styling, components, deployment workflow, or repository settings.

- Editor: <https://app.pagescms.org/>
- Repository: `johannamarie-star/johannamarie-star.github.io`
- Content form: **Portfolio content — Save publishes**

The GitHub App is installed with **Only select repositories** enabled, and this portfolio is the sole selected repository.

## Who can use it

- Johanna signs in with the `johannamarie-star` GitHub account and remains the owner.
- Xavier may sign in with `Avaxerrr` after accepting Johanna's pending GitHub collaborator invitation.
- Do not share passwords, verification codes, recovery codes, or GitHub sessions.
- Do not add Pages CMS email collaborators. Both approved users have separate GitHub identities.

## Sign in

1. Open <https://app.pagescms.org/>.
2. Choose **Sign in with GitHub**.
3. Complete GitHub verification personally if requested.
4. Open `johannamarie-star.github.io`, branch `main`.
5. Choose **Portfolio content — Save publishes**.

If GitHub reports unusual activity, stop retrying. Close the tab, wait, and try once later in a current Chrome or Edge browser with JavaScript enabled.

## Edit and publish

1. Find the section and field to change.
2. Replace only the intended text or select the intended public file.
3. Re-read the changed value for accuracy.
4. Press **Save** at the top of the editor.
5. Wait for the message `File "content/site.json" saved successfully.`
6. Allow a few minutes for GitHub Pages to validate, build, and publish the revision.

Save is disabled until the form contains a change. Every successful save creates a recoverable GitHub commit and starts publishing automatically. There is no separate Publish button.

## Images and résumé

- Use **Upload** to add a new approved file.
- Use **Select** to reuse a file already in the repository.
- Images accept JPG, JPEG, PNG, or WebP files.
- The résumé accepts a PDF.
- Add a short, accurate image description whenever an image is selected.
- Everything uploaded through the editor becomes publicly accessible. Never upload private source files, identification documents, confidential work, credentials, or an unapproved résumé.

## Content safety

- Publish only facts, projects, results, testimonials, contact details, and files Johanna has verified.
- Keep obvious placeholders until real information is approved.
- Do not place passwords, tokens, private notes, or unpublished personal data in any field.
- The editor cannot add, delete, or reorder page sections. Structural and visual changes remain maintainer work.

## If something goes wrong

- A failed build leaves the previous successful website online.
- Do not repeatedly press Save after an error.
- Open **Actions** in the Pages CMS sidebar or GitHub repository to see whether publishing succeeded.
- Give the maintainer the time of the edit and the field that changed. Do not send passwords or verification codes.
- An undesirable change can be restored with a new GitHub commit; shared history should not be deleted or rewritten.

## Verified behavior

The workflow was tested end to end on August 24, 2026. A temporary metadata-only edit created a Pages CMS commit, the project was corrected to tolerate omitted empty optional fields, and the original metadata was restored through the editor. The final GitHub Pages deployment succeeded, and the live site contained the original metadata with no temporary test text.
