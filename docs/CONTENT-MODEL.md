# Content Model

## Status and purpose

This is the accepted draft for the version-one editor contract. The corresponding `content/site.json` file and Pages CMS configuration do not exist yet. Exact field names may be adjusted during implementation only when the change improves clarity or matches the current component structure; any adjustment must be reflected here in the same change.

The contract separates content Johanna may safely edit from presentation and structure maintained in `app/`.

## Modeling rules

1. Use stable, semantic keys rather than keys tied to component filenames or visual positions.
2. Preserve the current number and order of sections, three projects, and four capability cards in version one.
3. Store only public portfolio content. Never store credentials, private notes, unpublished personal data, or editor tokens.
4. Use plain text fields rather than arbitrary HTML or executable content.
5. Keep the public brand name fixed as **Johanna Marie** and enforce all identity rules in `AGENTS.md`.
6. Treat current capability and project statements as unverified placeholders until Johanna confirms them.
7. Require useful alternative text whenever a meaningful content image is present.
8. Store uploaded public paths under `/uploads/`.

## Proposed top-level groups

| Group | Purpose | Initial editor exposure |
| --- | --- | --- |
| `profile` | Professional title and public identity context | Professional title only; brand name remains fixed |
| `hero` | Opening statement, introduction, calls to action, and optional portrait/visual | Editable text and image fields |
| `capabilityStrip` | Short labels in the scrolling strip below the hero | Four editable labels in a fixed structure |
| `work` | Selected-work section introduction and three fixed project records | Editable copy, links, images, and image descriptions |
| `capabilities` | Section introduction and four fixed capability records | Editable copy within the fixed four-card structure |
| `about` | About heading, paragraphs, portrait, and portrait description | Editable |
| `testimonial` | One optional recommendation and attribution | Editable; placeholder until verified |
| `resume` | Résumé call-to-action copy and public PDF | Editable copy and PDF |
| `contact` | Contact call-to-action, email, and public LinkedIn URL | Editable and validated |

Navigation, section order, anchor identifiers, layout classes, decorative project tones, card numbering, colors, typography, responsive behavior, build settings, and deployment configuration remain outside the content model.

## Proposed semantic keys

### `profile`

- `professionalTitle`

The public brand name is deliberately not editable through the CMS. Components and metadata must continue to render **Johanna Marie** consistently.

### `hero`

- `eyebrow`
- `heading.beforeEmphasis`
- `heading.emphasis`
- `introduction`
- `primaryAction.label`
- `secondaryAction.label`
- `visual.image`
- `visual.alt`
- `visual.placeholderMessage`

Action destinations remain structural anchors in version one, so the editor cannot break page navigation.

### `capabilityStrip`

- `items` — exactly four short plain-text labels

The page may repeat these labels visually to create a continuous scrolling effect. Repetition and animation remain presentation behavior rather than duplicated content.

### `work`

- `eyebrow`
- `heading.beforeEmphasis`
- `heading.emphasis`
- `introduction`
- `projects` — exactly three records, each containing:
  - `category`
  - `title`
  - `summary`
  - `impact`
  - `image`
  - `imageAlt`
  - `caseStudyUrl`

Project identifiers, display numbers, and decorative tones remain structural. Case-study URLs may be empty until a real public destination exists; the component must handle an empty URL safely rather than using a misleading link.

### `capabilities`

- `eyebrow`
- `heading.beforeEmphasis`
- `heading.emphasis`
- `introduction`
- `items` — exactly four records, each containing:
  - `title`
  - `description`

Display numbers and card order remain structural in version one.

### `about`

- `eyebrow`
- `heading.beforeEmphasis`
- `heading.emphasis`
- `paragraphs` — exactly two plain-text paragraphs in version one
- `portrait.image`
- `portrait.alt`
- `resumeActionLabel`

### `testimonial`

- `eyebrow`
- `quote`
- `personName`
- `personRole`
- `personCompany`

The whole section remains visibly provisional until Johanna supplies and approves a real recommendation. Never invent or lightly paraphrase a testimonial.

### `resume`

- `eyebrow`
- `heading`
- `introduction`
- `actionLabel`
- `file`

Only a PDF intentionally approved for public sharing may be uploaded. The component must provide an honest unavailable state while `file` is empty.

### `contact`

- `eyebrow`
- `heading.beforeEmphasis`
- `heading.emphasis`
- `introduction`
- `email`
- `emailActionLabel`
- `linkedInUrl`

Do not publish a guessed email address or social profile. Empty values must produce a clear unavailable state rather than `#` links or fake contact information.

## Media contract

Version one will use separate constrained upload choices:

- Images: `jpg`, `jpeg`, `png`, or `webp` under `public/uploads/images/`
- Résumé: `pdf` under `public/uploads/documents/`

The public values written to the content file will begin with `/uploads/`. Uploaded filenames should be normalized to safe public filenames. Replacing an asset should not require changing page structure.

All uploaded files are public once committed. The editor guide must warn Johanna not to upload private documents, source files, or files containing information she does not intend to publish.

## Validation requirements

Before deployment, validation should confirm at minimum:

- The content file is valid JSON with the expected top-level shape.
- Required text values are present and within practical length limits.
- Projects contain exactly three records and capabilities exactly four in version one.
- URLs use an allowed public protocol and contact email has a valid shape when provided.
- Asset paths are empty or contained under `/uploads/` as appropriate.
- A non-empty image path has non-empty alternative text.
- The résumé path is empty or references a PDF in the approved documents folder.
- Unexpected executable or raw HTML fields are not part of the schema.

Validation protects deployment integrity; it does not verify whether a professional claim is true. Human confirmation remains required for portfolio facts.

## Future evolution

Adding a new section or changing a fixed cardinality is a structural change. Update the component, content data, `.pages.yml`, validator, and this document together. Do not make the editor infer or manipulate arbitrary JSX structure.
