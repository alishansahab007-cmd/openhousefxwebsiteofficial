# V9 — Conversion-focused homepage and `/ecosystem`

Branch `feat/conversion-homepage-v9`, committed locally, not pushed. `main` deploys to Hostinger, so nothing here is live.

## What changed

**Homepage order:** Nav → Hero + showreel → Trust strip → Before/after proof (`#work`) → Eight-deliverable showcase (`#services`) → Interactive walkthrough (`#experience`) → Packages (`#packages`) → Testimonials (hidden until real ones exist) → How it works (`#process`) → Ecosystem preview (`#technology`) → Founder message → Final CTA (`#start`) → Footer (`#contact`).

- **Hero:** same headline; the supporting line now names the services; CTAs are "Enhance Your Listing" (`/start-a-listing`) and "Explore Our Work" (`/#work`). The phone layout shows the headline and both buttons on the first screen.
- **Trust strip (new):** four statements, each restating something already published on the site. No logos, counts, ratings or delivery guarantees.
- **Proof:** sliders are labelled on the image ("Unedited / Enhanced", "Empty room / Digitally staged") with a line stating the examples are illustrative and staged decor is digitally generated. The kicker "Proof, Not Promises" became "The work". The "+35% engagement" overlay figure is removed.
- **Showcase:** the selected deliverable now shows its service description, which lets it stand in for the separate Services grid.
- **Walkthrough hotspots:** 44px touch targets, hover/focus/open states, Escape to close, labels at a fixed readable size that open toward the middle of the frame.
- **Packages:** `startingPrice` and `turnaround` fields per collection in `lib/content.ts`. Both are `null`, so cards read "Tailored quotation". "Get Started" on each card, one "Request Custom Quote" under the grid.
- **Testimonials / case studies:** component and data model exist; `TESTIMONIALS` and `CASE_STUDIES` are empty, so the section renders nothing.
- **Ecosystem:** the full showcase moved, unchanged in content, to `/ecosystem` with its own metadata and an `h1`. The homepage keeps a compact four-product preview at `#technology`. The nav links to `/ecosystem`.
- **Founder message:** moved from the footer to its own section directly above the final CTA ("Send Your First Listing", plus the published phone and email).
- **Brand:** 13 visible "OpenhouseFX" spellings corrected to "OpenHouseFX".
- **SEO:** canonical URLs, Open Graph, `sitemap.xml`, `robots.txt`, Organization structured data (name, URL, logo, published phone/email, social profiles only).

## Removed from the homepage (components kept)

`Problem`, `Services` (grid), `Distribution`, `ForTeams`. To restore one, add it back to `app/page.tsx`. `#services` now points at the showcase.

## Not changed

`app/api/start-a-listing`, the form, `next.config.mjs` (headers and CRM redirects), `lib/lead-form.ts`, dependencies, environment files, tests. Every external URL present on `main` is still present; the only new ones are `https://schema.org` and `https://www.openhousefx.com`.

## Verification

- `eslint`: clean. `tsc --noEmit`: clean. `tests/pocket-studio-navigation.mjs`: 2/2.
- `next build --webpack`: passes, 12 routes, **with Google Fonts stubbed** because the build sandbox cannot reach fonts.googleapis.com. Run `npm run build` on a normal network before deploying.
- Headless Chrome against `next start` at 1440, 820 and 390 px: no horizontal overflow, no console errors beyond the stubbed font files, anchors land under the header, slider works by keyboard and drag, showcase and Hallcrest preview work, hotspot labels open, mobile menu lists all links, reduced-motion removes the hero film, ecosystem product switching keeps the Pocket Studio and AlphaCompanion links.
- Not done: Lighthouse / Core Web Vitals, a real phone, Safari, `tests/footer-navigation.browser.mjs`, any form submission.

## Needs an owner decision

1. Starting prices for the four collections (or confirm quote-only).
2. "48-hour turnaround" (Essential) and "Dedicated producer" (Luxury): confirm, and say when the 48 hours start.
3. Whether Professional is the approved recommended collection (it keeps its existing gold emphasis).
4. Real testimonials or documented projects, with permission.
5. Whether to restore any of the four removed sections.
6. Product statuses on `/ecosystem` (three "Product Preview", Scraper Ultra "Planned").
7. Analytics: none is installed. Proposal before adding one: a cookieless provider, with events for hero CTA, package CTA, successful inquiry, slider use and ecosystem navigation, no personal data in properties.
8. The Open Graph image is the hero poster (WebP); a 1200×630 JPG would be safer for some platforms.
