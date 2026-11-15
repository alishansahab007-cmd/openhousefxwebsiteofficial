# V8 — Scroll smoothness and load weight

Performance-only pass on top of V7. No layout, copy, API, form, dependency or deployment files changed. All changes are uncommitted in the working tree on `main` for review.

## What was measured (live site, before changes)
- Built-in browser pane, 1024×768 at 1× pixel density, no WebGL: about 57 fps while scrolling the full page, no long main-thread tasks. JavaScript is not the bottleneck.
- 42 elements had an active `backdrop-filter`; only the sticky header had moving content behind it.
- The hero film was 2560×1440 at 14 Mbps (17.5 MB transferred); the page total was 18 MB, of which the film was 97%.
- Server response (TTFB) was about 0.9 s.
- Not measured: a full-size Retina window, a phone, or the WebGL scene. The remaining cost scales with pixel count, so those are where the difference will show.

## Changes
| Area | Before | After |
| --- | --- | --- |
| Hero film (desktop) | 2560×1440, 17.9 MB | 1920×1080, 4.6 MB (SSIM 0.983 vs. the original) |
| Hero film (mobile) | 1920×1080, 11.8 MB | 1280×720, 2.2 MB (SSIM 0.972) |
| Backdrop blur | 42 elements | Header only (plus the small hero pause button) |
| Ambient light | 5 drifting full-screen layers | 3 drifting layers; glint and light sheet painted into the static base |
| Page glow | `background-attachment: fixed` on `body` | Own fixed layer (`body::before`) |
| Icon halos | Looping on every icon, on and off screen | Drift only while the card is hovered |
| 3D scenes | Up to 2× pixel density, forces discrete GPU | Up to 1.5×, default GPU |
| Welcome intro | 2.45 s (2.8 s fail-safe) | 1.55 s (1.9 s fail-safe), same sequence |

## Files
- `public/media/hero-cinematic.mp4`, `public/media/hero-cinematic-mobile.mp4`: re-encoded (H.264, faststart, no audio track as before). Originals are in git history.
- `app/globals.css`: body glow layer; blur removed from `.glass-panel`, `glass-liquid-crystal`, `.btn-secondary` (its tint goes 46% → 58% to compensate); ambient fields 4 and 5 folded into the container background; icon-halo animation hover-only.
- `components/effects/AmbientGradient.tsx`: renders 3 fields instead of 5.
- `components/ecosystem/orbital.module.css`, `components/ecosystem/ecosystem.module.css`, `components/layout/footer.module.css`: blur removed, tints raised slightly.
- `components/three/ArchitecturalScene.tsx`, `CardArchitecturalScene.tsx`: `dpr={[1, 1.5]}`, `powerPreference: "default"`.
- `lib/welcome.ts`, `components/welcome/welcome.module.css`: shorter timeline. The two must stay in step: the right curtain ends at 850 ms + 700 ms = 1550 ms = `sequenceDuration`.

## Why the blur could go without a visible change
The cards sit on flat or smoothly graded section backgrounds, and the ambient light is drawn above the page, not behind the cards. Blurring a flat colour returns the same colour, so the filter cost a GPU pass per card per frame and changed nothing. Checked by applying the same overrides to the live Services section: before and after screenshots match.

## Validation
- `eslint`: clean.
- `tsc --noEmit`: only the existing `LayoutProps` error that clears after `next build` / `next typegen`.
- `globals.css` compiles through `@tailwindcss/postcss` with no warnings; the only remaining `backdrop-filter` rules are the header's.
- **`next build` was not run**: the SWC binary crashes in the sandbox used for this pass. Run `npm run build` before deploying.
- Not yet checked in a real browser after the change: the 3D scene at 1.5×, the shortened welcome, and scrolling on a Retina display and a phone.

## Left alone
- Server response time (~0.9 s) and the inode allowance are hosting matters.
- `public/` media has no long-lived cache header; worth adding once file names are versioned.
- The 3D scene still renders continuously while on screen (it has a constant camera drift). Switching it to render on interaction is the next step if it is still heavy on a given device.
