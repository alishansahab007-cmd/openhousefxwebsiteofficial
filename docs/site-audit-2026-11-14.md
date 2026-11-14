# Website audit — November 14, 2026

Scope: source review of the Next.js marketing website, lead API, legal pages, local media inventory, and attempts to reach the public domain. No application code, hosting settings, or legal terms were changed. Findings below distinguish source-confirmed issues from operational checks still needed. This is a technical risk review, not a legal opinion or compliance certification.

## Priority findings

### High — advertising examples need clearer qualification

`lib/media.ts` identifies the property imagery as generated. The homepage nevertheless presents comparisons under “Proof, Not Promises” and “The difference is the deliverable” (`lib/content.ts`), without clearly identifying generated demonstration imagery in that section. `components/sections/ShowcaseTelemetry.tsx` renders “+35% engagement / sample” in the film preview. “Sample” helps, but the number can still suggest measured performance. The overlay is also hidden from assistive technology with `aria-hidden`.

Recommendation: visibly label generated examples as illustrative demonstrations; remove the engagement percentage unless supported by actual evidence and an appropriate explanation. Qualify “48-hour turnaround” with when the clock starts and applicable exceptions. Verify absolute claims such as architecture “never invented” against actual production quality controls.

Basis: FTC guidance requires a reasonable basis for objective express and implied advertising claims before publication: https://www.ftc.gov/legal-library/browse/ftc-policy-statement-regarding-advertising-substantiation

### High, conditional — virtual staging delivery compliance

The terms assign review and disclosure responsibility to customers, but that does not establish that delivered images and publishing workflows meet applicable requirements. For California property-sale advertising, DRE identifies AB 723 requirements for digitally altered images, including disclosure. Applicability depends on the image, customer, and advertising use; this is not a finding that the marketing homepage itself violates that law.

Recommendation: have counsel review applicable markets and MLS rules. Include appropriate disclosure assets, preserve originals, and document customer approval and permitted edits in production agreements. A footer disclaimer alone should not be treated as a delivery compliance process.

Source: https://dre.ca.gov/Newsroom/DRE_Updates/2026_05_06_EOY_Bill_Summaries_2025.html

### Medium — lead form abuse protection depends on unverified proxy behavior

`app/api/start-a-listing/route.ts` trusts the first `x-forwarded-for` value, then `x-real-ip`. If hosting preserves client-supplied values, an attacker can rotate them to evade the five-request limit. Conversely, absent forwarding headers all users share `unknown`. The limiter resets on restarts and is separate on each instance. At 2,048 active distinct keys, new IPs are rejected until entries expire.

Recommendation: verify the hosting proxy's sanitization and trusted IP contract; enforce limits at the edge or in shared storage, and add bot protection if abuse warrants it. HTML escaping, streamed 10 KB limits, type checks, and a honeypot already provide useful protection.

### Medium — SMS evidence and opt-out handling require operational verification

The checkbox is optional and initially unchecked, which is good. The API emails a boolean consent choice and a hardcoded disclosure version of `2026-11-09`; policy pages display November 12. Different dates are not inherently wrong, but the actual disclosure text and version are not coupled. The plain-text email records receipt time, while the HTML body omits it. This repository has no durable consent ledger, SMS sender, or STOP/HELP handler.

Recommendation: maintain a versioned copy of the precise disclosure, record server receipt time and consent choice durably, and verify messaging-provider suppression and reasonable revocation workflows before sending automated texts. These features may exist externally; their absence here does not establish they are missing from the business.

FCC reference: https://docs.fcc.gov/public/attachments/FCC-24-24A1.pdf . Counsel/provider should confirm currently applicable requirements and implementation dates.

### Medium — production lead delivery remains unverified

The form requires `RESEND_API_KEY`; missing configuration returns 500. The default sender is `onboarding@resend.dev`, so production delivery depends on provider restrictions and verified sender configuration. There is no durable lead queue or outbox; an email failure requires the visitor to retry.

Recommendation: verify the production API key and authorized sender/domain, test delivery to the configured recipient using an authorized test submission, and monitor failures. No real lead was submitted in this audit.

### Medium — HTTPS hardening absent from application configuration

`next.config.mjs` sets nosniff, frame denial, referrer policy, and permissions policy. It does not configure HSTS or Content-Security-Policy. The host/CDN may add them; live response headers could not be inspected.

Recommendation: verify actual headers and HTTP-to-HTTPS redirects. Add HSTS only after confirming affected hostnames support HTTPS; do not enable `includeSubDomains` or preload blindly. Develop a CSP in report-only mode first because this site includes inline bootstrap code and framework scripts.

### Low — incomplete form validation and accessibility feedback

The phone field accepts any nonempty string on both client and server. Client inputs lack maximum lengths even though the API enforces them, so a visitor can fill a form that the server will reject. Validation does not move focus to the first invalid field; success has no live-region announcement or explicit focus change.

Recommendation: add practical international phone validation, shared length limits, and accessible error/success focus management. Avoid imposing a US-only format without a business requirement.

## Additional legal/business checks

- Confirm Savology Hub LLC identity, business address, contact details, media/music licenses, and rights to display screenshots. Source code cannot establish ownership or permission.
- The privacy policy describes retention in broad terms. Define internal retention/deletion schedules and confirm actual providers and connected apps match the policy. Determine state/international privacy obligations from customer locations, processing activities, and statutory thresholds; a cookie banner is not automatically required by the session-storage feature alone.
- Website terms defer fees, revisions, rights, and remedies to project agreements. Verify those agreements actually exist and cover payment, cancellation, delivery acceptance, licensing, AI processing, and disputes before accepting work.
- Review Scraper Ultra permissions and outreach rules before release; the current page labels it planned and already qualifies source permissions.

## SSL/TLS and live-site status — not verified

Attempts to open both `https://openhousefx.com` and `https://www.openhousefx.com` through the web tool failed. Direct curl returned `Could not resolve host`; repeating the apex request outside the sandbox also failed. This environment's DNS failure is not evidence of an expired certificate or a global outage.

Still required from a working network:

1. Resolve apex, www, and `crm.openhousefx.com`; confirm intended DNS records.
2. Verify certificate hostname coverage, issuer chain, not-before/not-after dates, and renewal monitoring for each domain independently, including the linked Pocket Studio host.
3. Verify HTTP redirects, TLS protocol support, live headers, and absence of mixed content.
4. Exercise homepage, quotation and policy routes, mobile navigation, linked applications, and authorized email delivery in a real browser.

## Validation limitations

- Node.js and npm are absent from this environment, so build, lint, tests, and a fresh dependency advisory scan were not run.
- `docs/policies-security-release.md` records earlier checks and development dependency advisories; those are historical claims, not current test results from this audit.
- No active vulnerability exploitation, real email/SMS delivery, or changes to production were performed.
- A full accessibility assessment, contract review, asset-rights audit, dependency scan, and live TLS inspection remain separate verification work.
