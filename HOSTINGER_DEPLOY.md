# Deploy OpenHouseFX on Hostinger

This project runs as a **Next.js Node.js Web App**. It has a server-side lead
form API route, so deploy it through Hostinger's Node.js Web App flow rather
than copying the files into a static `public_html` directory.

Hostinger's managed Node.js Web Apps require an eligible Business/Unlimited
or Cloud plan. If the domain already hosts a WordPress or PHP site, Hostinger
requires adding the Node.js app as a separate website; use a subdomain or
review Hostinger's migration guidance before changing the existing website.

## Upload the ZIP

1. In hPanel, open **Websites → Create site → Web App**.
2. Choose **Upload your website files** and upload
   `openhouseFX-hostinger-ready.zip`.
3. Select **Next.js** when Hostinger asks for the framework. Choose **Node.js
   24.x**.
4. Keep the detected Next.js build configuration. If Hostinger asks for
   commands, use `npm run build` to build and `npm start` to start.
5. Add the environment variables below, then deploy.

The build script selects webpack for compatibility with Hostinger's build
servers. Use `npm run build` and keep `.next` as the output directory.

The ZIP has `package.json` and `package-lock.json` at its root. Hostinger
installs packages from the lockfile and creates the Next.js production build.

## Lead form environment variables

Set these in the Hostinger app's **Environment Variables** section:

- `RESEND_API_KEY` — required for the listing request form to send email.
- `LEAD_TO_EMAIL` — optional; defaults to `info@openhousefx.com`.
- `LEAD_FROM_EMAIL` — optional; configure a sender address verified with
  Resend for production.

The ZIP intentionally does not include `.env.local` or any secret values.

## GitHub deployment

For automatic redeploys after each push, put the extracted project in a
private GitHub repository, push it to the `main` branch, then choose
**Import Git Repository** in Hostinger's Node.js Web App flow. Hostinger
supports GitHub deployments for Node.js apps; the ZIP upload path above is
available when you want to deploy without connecting a repository.

## Local verification

```bash
npm ci
npm run lint
npm run build
npm start
```

Hostinger's Node.js Web App plans and setup steps are documented in its
[Node.js deployment guide](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/).
