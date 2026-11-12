# Claude V7 integration — November 12, 2026

Source: openhousefxwebsite-liquidglass-v7.zip, compared with production c5562655254ac10bf424192f8bccc6c42ff17943. ZIP paths were checked for containment and symlinks before extraction.

Imported only the 13 declared visual files, including new GlassPointerLight. Twelve imported files match Claude's ZIP byte-for-byte; Footer differs only by restoring the current Savology Hub LLC copyright disclosure. No design adjustments were made. Apparent other ZIP differences were line endings or older policy wording; they were not imported.

Preserved the current Privacy Policy, SMS Terms, Terms and Conditions, shared legal page, repaired navigation, form, API, dependency manifests/lockfile, integrations, media, and hosting configuration. All policies retain the November 12 revision and Savology Hub LLC relationship.

Checks executed: targeted ESLint passed; source preservation assertions passed; existing navigation tests 2/2 passed. A VM harness transpiled the two actual controllers and checked RAF sleep after settling, resize offset continuity, hidden-tab cancellation, reduced-motion static values, pointer coordinates, touch/reduced-motion listener gating and cleanup. All passed. This does not constitute a physical-device performance benchmark or native motion-preference test.

The V7 welcome CSS pauses light-field keyframes; the ambient scroll controller itself gates on document visibility and reduced motion. No claim that the controller directly observes the welcome attribute is made. Unrelated performance changes were intentionally avoided.

Production build, browser and release outcomes are recorded in the release PR and final delivery. No new dependencies, real leads, SMS messages, other-app deployment or environment changes.
## Built-site validation
Production webpack build including TypeScript and all static routes passed. Browser regression harness passed three policy arrivals at scrollY=0 and Back/Forward for each; five homepage sections and repeated hash navigation passed. Five viewport widths 375/390/768/1440/1920 showed no horizontal overflow. Chromium computed header backdrop-filter as blur(18px) saturate(1.5), ambient field count 5, and 15 glass-track surfaces. No completed broken images or captured browser errors in the checked flow. At 390px, menu opened with opaque rgb(6,16,28) and no backdrop blur; quotation navigation worked, SMS consent unchecked/nonrequired. Viewport override restored. Native OS reduced-motion and physical-device performance not independently tested.
