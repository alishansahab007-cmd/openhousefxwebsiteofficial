# Policies and release checks — November 9, 2026

## Changes
- Added Privacy Policy, Terms and Conditions and SMS Terms adapted to OpenHouseFX property-media services, with the user-provided Waterbury address, info@openhousefx.com and customer service (888) 815-0017. No CNT Logistics identity or dispatch terms were retained.
- Added footer policy links and optional, initially unchecked SMS consent in the quotation form. Inquiry email records the consent choice, disclosure version and receipt time. Consent is not required to submit.
- Reject malformed JSON/field types, cap streamed request bodies at 10KB even without Content-Length, and bound the in-memory rate-limit map. Added nosniff, frame denial, referrer and browser-permission headers; removed X-Powered-By.
- Fixed the tablet navigation breakpoint and used native fragment links to support repeated section navigation. Preserved page-route prefetching on quotation and policy links.
- Includes the previously reviewed ambient glass refinement from PR #6. Does not combine the separate alternative PR #5.

## Validation
- Targeted ESLint and production webpack build, including TypeScript and static policy pages, passed.
- Existing Pocket Studio navigation tests: 2 passed.
- Local API checks: null, arrays, primitives, malformed JSON, numeric fields, invalid SMS consent and missing required fields return 400. Oversized normal and chunked requests return 413. Sixth request in the sliding window returns 429. Honeypot returns success without sending mail.
- Five page routes return 200. All 40 checked homepage local resource URLs return below 400; all 20 extracted fragment references have targets.
- Browser: default unchecked/nonrequired SMS choice; check/uncheck; three empty-form validation messages; transformation selection; comparison control; ecosystem selection; menu open/close and section navigation. No captured browser error/warning logs in the checked local flow.
- Responsive homepage widths 320, 390, 768, 1024, 1280, 1440 and 1920: no document horizontal overflow. Tablet uses mobile menu below 1024.
- No broken completed images in the checked browser page. Hero media reached readyState 4. CRM link reached its actual application after Render cold start (terminal DNS lookup alone failed, so was not treated as proof of a broken link).
- npm registry bulk advisory scan of locked production packages: no advisories returned. Full dependency scan identified development-only minimatch 10.2.6 (moderate, GHSA-g3hv-75wg-m249) and zod 4.6.5 (high, GHSA-mrhx-c7xc-m3w5). They are tooling dependencies, not production runtime dependencies; no forced cross-major override was applied.
- Tracked environment files: example only. Checked source patterns found no PEM private keys, Stripe live keys or AWS access-key IDs. This is not an exhaustive secret-history audit.

## Practical limits
- The rate limiter is per process and resets on deployment; forwarded IP handling depends on the hosting proxy. A distributed rate limiter is not implemented.
- No real lead email or SMS was sent during testing. The existing email provider must be configured in hosting. SMS consent capture is implemented; carrier enrollment, sending and STOP/HELP processing belong to the messaging provider and were not independently verified.
- Reduced-motion behavior was reviewed in source; no claim of physical-device GPU benchmarking, native OS preference testing, full penetration testing or legal-compliance certification is made.
- Deployment is verified separately against the public domain after merging, rather than inferred from a successful push.
