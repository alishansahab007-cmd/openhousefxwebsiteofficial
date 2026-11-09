# Footer navigation repair — November 9, 2026

Production baseline: 61ea412b168cbc3fcca9f9bfabaf1f23be89e828 (Hostinger main deployment).

## Reproduction and cause
A footer Privacy Policy click changed the route to /privacy-policy but left scrollY at 2867.2 and its h1 at -2653.9px. The footer remained on screen, making navigation look broken. Ambient pointer-events computed to none; the link was the actual hit-test target, with no captured navigation error. Default App Router scroll handling retained a visible shared footer rather than guaranteeing an explicit legal-page arrival. Global CSS smooth scrolling also lacked Next's data-scroll-behavior="smooth" root opt-in for route/history scroll handling.

## Scoped fix
- NavigationLink retains Next.js client routing and queues a policy scroll/focus reset only for deliberate policy clicks. PolicyArrival consumes that intent at route commit. Browser history traversal cancels pending intent and retains framework restoration.
- Same-document footer fragments use native smooth scrolling, including repeated same-hash clicks. Cross-route fragments use Next Link without reloading the shared welcome/gradient layout.
- Root smooth-scroll opt-in lets Next avoid smooth scrolling during route/history restoration. Existing header offset and reduced-motion scroll override are retained.
- Legal articles have a 240ms, 8px entrance under no-preference only, starting at readable opacity 0.92. No hidden-until-JS content, exit animation, loading gate or new framework.
- Footer links gain gold underlines and explicit keyboard focus styling. Form policy links share the same navigation behavior; no submission logic changed.
- No legal text, backend API, media, package, contact, authentication, CRM, Studio or environment change.

## Executed validation
- npm ci: passed (423 packages). Existing npm audit summary: 8 moderate / 1 high; no dependency manifests or lockfile changed, no audit force-fix applied. unrs-resolver install script was blocked by npm's default allowScripts policy; subsequent checks passed.
- npm run lint, TypeScript noEmit and production webpack build: passed. Final root-attribute build also passed. Existing navigation unit tests: 2 passed.
- CUA browser regression harness: all three footer policy arrivals at scrollY=0; Back/Forward restoration passed for each. All five sections passed from homepage and from each of the three legal pages (20 source/destination combinations), with repeated hash navigation.
- Requested widths 375, 390, 768, 1440 and 1920: 10 checks passed at each width (three policy links, five section links, repeated hash and overflow/ambient/welcome checks). No horizontal overflow, ambient pointer-events none, content not inert.
- Initial large browser batch timed out and was not counted. A mobile assertion initially assumed the header height exactly equaled configured scroll padding; corrected assertions verify the declared offset and no header overlap. A browser sandbox global-name incompatibility in the harness was corrected before the five successful viewport runs.
- No captured JS errors in checked navigation flows. An existing THREE.Clock deprecation warning occurred in a property preview; no unrelated media framework change made.

## Limits and release
The browser safety layer stopped native-window access during a reduced-motion emulation attempt. Native/DevTools reduced-motion emulation and a complete keyboard walkthrough were not completed; reduced-motion CSS was inspected and no claim of those tests passing is made. User subsequently requested deployment explicitly. Live footer interactions and Hostinger current commit must be checked after the approved merge. The browser harness is retained at tests/footer-navigation.browser.mjs and executes through the documented CUA tab API.
