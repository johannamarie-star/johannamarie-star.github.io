# Johanna Marie Portfolio — Editing Guide

## Main files

- `app/page.tsx` — all visible text, navigation, project cards, capabilities, and links
- `app/globals.css` — colors, fonts, spacing, layout, and responsive styling
- `app/layout.tsx` — browser title, description, and social-sharing metadata
- `public/og.png` — social-sharing preview image
- `public/favicon.svg` — browser-tab icon

## Quick edits

Search `app/page.tsx` for square brackets (`[`) to find placeholder content. Replace `your@email.com`, the `#` social links, the résumé button destination, project details, testimonial, and About copy before publishing.

The main color variables are at the top of `app/globals.css`. Update those values to recolor the whole site consistently.

## Run locally

1. Install Node.js 20 or newer.
2. Open this folder in a terminal.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local address shown in the terminal.

## Asset notes

The hero, project previews, and portrait area are CSS placeholders, not image files. Replace them with real images when your materials are ready. The only custom raster image included is `public/og.png`, which is used when the website is shared on social platforms.
