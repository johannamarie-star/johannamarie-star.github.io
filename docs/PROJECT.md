# Project

## Purpose and status

Johanna Marie's portfolio is a professional hub she can share with potential employers and recruiters. The website is publicly available at <https://johannamarie-star.github.io/> and remains a work in progress while verified content and assets replace the current placeholders.

## Ownership and roles

- **Owner and content editor:** Johanna Marie
- **Optional technical maintainer:** Xavier
- **Repository owner:** `johannamarie-star`

Johanna owns the repository, public website, content, uploaded assets, and authorization for any editing service. The maintainer may build or change the technical system when asked but does not own Johanna's editor or content and does not require permanent editor access.

## Confirmed brand and audience

- Public brand name: **Johanna Marie**
- Professional title: **Marketing Specialist / Content Writer**
- Primary audience: potential employers and recruiters
- Tone: thoughtful, capable, approachable, clear, and professional
- Visual direction: soft, feminine, and professional
- Current content approach: obvious editable placeholders until Johanna provides verified material

Public-facing content must use only the confirmed brand name, including metadata, asset names, résumé links, and social previews.

## Current homepage structure

1. Sticky header with brand, professional title, and Work, About, Contact, and Résumé links
2. Hero with a value proposition, introduction, calls to action, and visual placeholder
3. Scrolling capability strip
4. Three selected-work placeholders
5. Four “What I bring” capability cards
6. About section with portrait placeholder
7. Testimonial placeholder
8. Résumé call to action
9. Contact call to action
10. Footer

The hierarchy was informed by an “Anatomy of a Portfolio Homepage” reference image. That reference is guidance only; it is not content or a design to copy.

## Current draft and placeholder content

The hero currently says:

> I turn ideas into content that connects.

Three unverified project placeholders represent:

- Content Strategy
- Campaign Marketing
- Copywriting

Four unverified capability starting points are:

- Content strategy
- Content writing
- Campaign support
- Brand communication

The project descriptions, results, capability claims, About copy, portrait, testimonial, contact details, social links, and résumé destination require confirmation or replacement before the portfolio is considered final. Do not infer or embellish them.

## Visual system

- Warm ivory and cream main background
- Muted rose primary accent
- Muted sage secondary accent
- Blush, peach, warm beige, and dark brown-gray supporting colors
- DM Sans body and navigation typography
- Playfair Display editorial italic accents
- Rounded editorial cards, soft gradients, fine borders, generous spacing, and subtle motion
- Responsive desktop, tablet, and mobile layouts

Do not replace this direction with a generic black-and-white technology portfolio unless the user explicitly requests a rebrand.

## Current assets

- `public/og.png` — custom social-sharing image
- `public/favicon.svg` — browser icon
- Google Fonts — DM Sans and Playfair Display
- CSS-created hero, project, and portrait placeholders and decorative visuals

No stock photos, client logos, real project thumbnails, or portrait photographs are currently included.

## Main source locations

- `content/site.json` — editable public content and media references
- `.pages.yml` — restricted Pages CMS form and upload configuration
- `scripts/validate-content.mjs` — content shape, link, media-path, and referenced-file validation
- `app/page.tsx` — homepage structure and rendering
- `app/globals.css` — visual system and responsive layout
- `app/layout.tsx` — metadata and social-sharing configuration
- `app/robots.ts` and `app/sitemap.ts` — public indexing metadata
- `public/` — public static assets
- `.github/workflows/pages.yml` — validation, build, and GitHub Pages publishing

Editable values are stored in `content/site.json`, and editor-managed assets are restricted to `public/uploads/`. `app/` continues to own presentation and structure. The hosted editor still requires Johanna's repository authorization before routine editing begins.
