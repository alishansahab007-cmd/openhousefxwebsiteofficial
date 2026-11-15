# V9 pre-deployment audit — November 15, 2026

Status: incomplete; browser verification is blocked. Do not treat this report as deployment clearance.

## Scope and repository state

Branch: `feat/conversion-homepage-v9`; HEAD: `46744bf`.
No commits, pushes, merges, or deployments were performed in this audit.
No application code was changed during this audit; this report is the only added file.

These intentional modifications already existed and were preserved:
- `app/page.tsx`
- `components/sections/Packages.tsx`
- `components/sections/Transformation.tsx`
- `docs/conversion-homepage-v9.md`
- `lib/content.ts`

No graph report or root DESIGN.md exists. Targeted source inspection was used.
No credentials or environment files were read. No form was submitted.

## Baseline

- Installed dependencies: `npm ls --depth=0` succeeded. Installed lock versions match all non-optional package-lock entries. Six extraneous WASM-related packages were reported; left untouched. `npm ci` was unnecessary.
- `npm run lint`: passed.
- `tsc --noEmit`: passed.
- `node --experimental-strip-types --test tests/pocket-studio-navigation.mjs`: 2 passed, 0 failed.
- Unit test warning: `MODULE_TYPELESS_PACKAGE_JSON` for `lib/ecosystem.ts`; Node reparses it as ESM. No package-type change was made because that would affect wider module behavior.
- `npm run build`: passed using normal Google Fonts, no stubs, no build warnings. Baseline webpack compilation: 5.1 seconds; TypeScript build phase: 2.8 seconds; static generation: 473 ms. These are local build timings, not visitor performance metrics.
- `npm start -- --port 3450`: production server started successfully.

Build routes: `/`, `/_not-found`, `/api/start-a-listing` (dynamic), `/ecosystem`, `/icon.png`, `/privacy-policy`, `/robots.txt`, `/sitemap.xml`, `/sms-terms`, `/start-a-listing`, `/terms-and-conditions`. Next reports 12 generated static-page work items; its route list has the 11 entries above.

The build CLI did not print bundle sizes. The following are independently measured sizes of unique JavaScript script sources referenced by each built HTML file, including framework/polyfill scripts. Gzip uses local Python gzip compression. These are not browser transfer totals or executed JavaScript measurements.

| Route | JS files | Raw bytes | Gzip bytes |
| --- | ---: | ---: | ---: |
| `/` | 9 | 715,652 | 225,745 |
| `/ecosystem` | 11 | 786,170 | 250,490 |
| `/start-a-listing` | 9 | 690,111 | 218,951 |
| `/privacy-policy` | 9 | 683,110 | 216,916 |
| `/terms-and-conditions` | 9 | 683,110 | 216,916 |
| `/sms-terms` | 9 | 683,110 | 216,916 |

## Built-output and source checks

All six public HTML pages have one H1, distinct titles, their own correct canonical/og:url, og:image, parseable Organization JSON-LD with the expected type/context, no duplicate IDs, and no img elements missing alt attributes. Image sources referenced by the built HTML exist in public/. This does not verify image decoding, optimization responses, or the semantic appropriateness of every decorative alt.

The generated sitemap lists all six public pages. Robots permits public crawling, excludes /api/, and references the sitemap. HTTP status and content-type checks remain pending.

The framework-generated not-found HTML contains both inherited homepage and framework 404 title elements, and inherits the homepage canonical/og:url. Runtime handling of these tags and unknown-route HTTP status needs browser/server verification before deciding whether a custom not-found metadata fix is warranted. No change was made to its copy or layout.

Hero poster preload is present with responsive image candidates and sizes=100vw. A second image preload exists for the below-fold showcase poster. Both fonts are self-hosted next/font assets, configured display=swap; two font preloads are present. Actual LCP element/timing and font requests remain unmeasured.

Three.js/R3F signatures occur in deferred chunks, not script chunks referenced by the inspected initial HTML. Source gates the main scene on viewport intersection and service scenes on activation. Network timing and drei loading still need browser verification. No GSAP signatures were found in built client chunks. `@gsap/react` has no application imports; `gsap` is referenced only by two unused legacy scroll hooks. Neither dependency was removed. Framer Motion is actively used; no narrower-loading change was attempted without measurements. Resend is used by the protected API route.

The main walkthrough scene explicitly uses frameloop=never off screen. Hero playback has intersection and document-visibility controls, reduced-motion handling and poster fallback. Slider source supports pointer capture, cancellation, arrow keys, Home/End and touch-pan-y. Nav source handles Escape and focus return. These are source observations, not browser test passes.

## Findings awaiting browser reproduction and measurement

| Finding | Reproduction to run | Source cause | Proposed minimal fix; disposition |
| --- | --- | --- | --- |
| Footer film remains eligible to loop off screen | Reach final CTA, then scroll back to top; inspect playing video | `components/sections/CinematicFooterVideo.tsx:45`: intersection observer disconnects after first entry; state never resets. End handler restarts playback. | Track visibility continuously and pause off screen/when hidden. Not applied: required before/after trace and screenshot checks blocked. |
| Service preview can remain active off screen | Touch-activate or keyboard-focus a video/3D card, then scroll away without blurring | `lib/hooks/useCardInteraction.ts:32` retains activation without visibility; `InteractivePreviewCard.tsx:44` uses it directly; card Canvas defaults to continuous rendering | Gate playback/rendering by visibility while preserving activation semantics. Not applied: browser reproduction and performance measurements blocked. |
| Repeated WebGL capability probes | Switch service selections repeatedly and inspect context creation | `lib/three/detectWebGL.ts:3` creates a canvas/context on every snapshot call; `useSupportsWebGL.ts:17` supplies it to useSyncExternalStore | Investigate caching capability and WebGL2 compatibility. Not applied: context cost/failure impact unmeasured. |
| Below-fold poster preloaded at initial load | Inspect fresh homepage network priority and LCP with/without showcase preload | `components/sections/Transformation.tsx:94` passes initial featuredPoster=true to image preload | Consider removing only this preload if measured benefit and unchanged output. Not applied: LCP/transfer measurement blocked. |

No bug fix or performance optimization was claimed complete. No speculative performance edits were retained.

## Lighthouse before/after

N/M means not measured. No after run exists because no optimization was made.

| Page/device | Perf before/after | Accessibility before/after | Best Practices before/after | SEO before/after | LCP before/after | CLS before/after | INP/TBT before/after | Total transfer before/after | Browser JS transfer before/after |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` mobile | N/M | N/M | N/M | N/M | N/M | N/M | N/M | N/M | N/M |
| `/` desktop | N/M | N/M | N/M | N/M | N/M | N/M | N/M | N/M | N/M |
| `/ecosystem` mobile | N/M | N/M | N/M | N/M | N/M | N/M | N/M | N/M | N/M |
| `/ecosystem` desktop | N/M | N/M | N/M | N/M | N/M | N/M | N/M | N/M | N/M |

Lighthouse lab TBT must not be represented as measured field INP. None of the requested performance/accessibility score targets has been verified.

## Security and scope

Manual OWASP-oriented review of the five pre-existing changed files found no new untrusted HTML insertion, external data boundary, authorization change, credential handling, or dynamic redirect. Package strings are rendered through React text interpolation. Root inline scripts use local constants, not user input. This is a limited source review, not a penetration test or dependency-vulnerability certification.

`git diff --exit-code` confirms no edits to the listing API, form component, lead-form library, next.config.mjs, package.json or package-lock.json. Protected CRM/Pocket Studio links were not changed by this audit. No third-party script, analytics, environment, Supabase or Render change was made.

## Blocked and untested

The CUA browser denied http://localhost:3450 twice, including after the owner replied “enable”: a saved permission or managed policy blocks origin access. The agent cannot change this permission or bypass it via another browser, raw CDP, alternate origin, or driver.

Consequently untested: all 390/820/1440 browser layouts; console/hydration/network failures; welcome/session behavior; repeated anchors and footer browser harness; menu/focus; video playback/failure/reduced-motion; sliders/touch/keyboard; all eight deliverables and Hallcrest; WebGL/hotspots/fallback; CTA navigation; ecosystem switching; form validation; unknown-route response; Lighthouse; scroll trace; screenshots; actual Cache-Control responses for static/media assets. Real phone, Safari and live form delivery are also untested. Live form delivery is explicitly excluded.

No hosting cache change is recommended as a verified fix yet: inspect actual responses first. The owner must enable the preview origin in saved permissions (or resolve its managed policy) before browser-dependent work can resume.

## Verdict

Final rerun: lint, standalone TypeScript, both unit tests and the normal-font production build all passed. The same test-only module-type warning remained; no build warning appeared. No application edits were made between baseline and final checks.

Buildable, but not cleared for deployment under the requested audit gates. Remaining blockers are browser access, the full interaction/visual pass, measured performance baseline and retesting of any resulting fixes. Existing work remains uncommitted and undeployed.
