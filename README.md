# OpenHouseFX

Real estate. Higher standards.

## Requirements

- Node.js 24.x
- npm

## Run locally

```bash
npm ci
npm run dev
```

## Production

```bash
npm ci
npm run build
npm start
```

The production server reads its port from the `PORT` environment variable.

## Lead form

The listing request form sends email through Resend. Set `RESEND_API_KEY` in
the hosting provider's environment variables. `LEAD_TO_EMAIL` and
`LEAD_FROM_EMAIL` are optional; see `.env.local.example`.

## Hostinger

See [HOSTINGER_DEPLOY.md](./HOSTINGER_DEPLOY.md) for the Node.js Web App upload
and GitHub deployment steps.

## Stack

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, GSAP, and
React Three Fiber. The hero loops a muted cinematic video, with a property
image fallback for reduced-motion, low-power, or unsupported-video cases.
