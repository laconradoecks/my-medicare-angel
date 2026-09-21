# My Medicare Angel

The production website for **My Medicare Angel**, an independent Medicare insurance
agency and a Kyzer Solutions company. Built from the designs in [`designs/`](designs/)
— every page, section and line of copy is carried over from the prototype and
artboards.

React 18 + TypeScript + Vite + React Router. No CSS framework: the design tokens and
class names from the prototype are ported directly into
[`src/styles/global.css`](src/styles/global.css) so the build and the artboards can be
compared side by side.

---

## Getting started

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:5173.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Typecheck, production build to `dist/`, write `sitemap.xml`, then prerender every page |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | TypeScript only, no build |
| `npm run sitemap` | Regenerate `dist/sitemap.xml` |
| `npm run prerender` | Prerender `dist/` again without rebuilding |
| `npm run og-image` | Re-export the social card PNG from its SVG |

---

## What's in here

25 routes, mapped from the prototype's 23 in-page sections plus an article detail
route and a 404.

```
/                                              Homepage
/medicare-explained                            Medicare Explained (hub)
  /original-medicare                           Parts A & B
  /medicare-advantage                          Part C — HMO, PPO, SNP
  /medicare-supplements                        Medigap
  /part-d-drug-plans                           Part D
  /medicare-vs-medicaid                        Medicare vs Medicaid
/compare                                       Original vs Advantage
  /advantage-plans                             HMO vs PPO vs SNP
  /supplement-plans                            Plan G vs Plan N
/insurance-partners                            Carriers
/turning-65                                    Enrollment checklist
/leaving-employer-coverage                     Retiring after 65
/veterans                                      VA, TRICARE For Life
/articles                                      Article index
/articles/:slug                                Article detail
/faqs                                          FAQs (accordion)
/events                                        Seminars
/refer-a-friend                                Referral form
/get-a-quote                                   Lead form
/contact                                       Contact form
/book-a-consultation                           Booking form
/privacy-policy  /terms-of-use  /medicare-disclaimers
```

### Layout

```
src/
  config/site.ts        Phone, address, disclaimer, form endpoint — edit here first
  routes.ts             Every path in one table; nav and sitemap both read from it
  data/                 Nav structure, FAQs, articles, carriers, events
  components/
    Layout, Header, Footer, Seo
    Blocks.tsx          TitleBand, ArticleLayout, SideCard, Callout, Parts,
                        CompareTable, ArticleCta, CtaBand, Guidance, Testimonial
    FormControls.tsx    Field, OptionGroup, ChoiceGroup, ThankYou
    Icons.tsx           SVGs lifted from the designs
  lib/forms.ts          Validation + submit controller shared by all four forms
  pages/                One file per route
```

Change a phone number, address or the footer disclaimer in
[`src/config/site.ts`](src/config/site.ts) and it updates everywhere.

---

## Brand assets

The logo is the angel mark from `logo/mymedicareangel-logo-pack.zip` — a navy ring,
gold halo and winged figure. It replaced the earlier checkmark mark.

Every file from the pack is unpacked into [`public/logo/`](public/logo/) so it can be
referenced by URL (`/logo/primary-horizontal.svg`) from anywhere, including outside
React.

| File | Use |
| --- | --- |
| `mark.svg` | Full mark — four feathers per wing, finer strokes. Large display. |
| `mark-small.svg` | Three feathers, heavier strokes. Legible at header/favicon size. |
| `mark-white.svg` | White-on-navy version of the full mark. |
| `mark-navy-mono.svg` / `mark-white-mono.svg` | Single-colour, for faxes, stamps, one-colour print. |
| `primary-horizontal.svg` / `-dark.svg` | Mark + wordmark, side by side. |
| `stacked.svg` / `stacked-dark.svg` | Mark above wordmark. |
| `app-icon-navy.svg` / `app-icon-gold.svg` | Rounded-square app icons. |

In React the mark is drawn inline by `LogoMark` in
[`src/components/Icons.tsx`](src/components/Icons.tsx), so it inherits crisp
rendering at any size with no extra network request:

```tsx
<LogoMark />                          // header default: "small" cut, navy
<LogoMark size={72} variant="full" /> // large display
<LogoMark tone="light" />             // white, for the navy bands
```

The header pairs the small cut with the text wordmark at 32px, matching the designs.

**Favicons and app icons** are wired in [`index.html`](index.html): `favicon.svg`
(the navy app icon), a 32px PNG fallback, an Apple touch icon, and
[`site.webmanifest`](public/site.webmanifest) for add-to-homescreen.

**Social card.** `og:image` uses [`public/logo/og-card.jpg`](public/logo/og-card.jpg), a
1200x630 composite of the `og-background` photo and the white logo lockup. See
Prerendering below for how to regenerate it.

---

## Photography

Page photos live in [`public/images/`](public/images/) as `<name>.webp` with a
`<name>.jpg` fallback, plus `<name>@2x.webp` where the source had enough resolution for
one. [`scripts/process-images.mjs`](scripts/process-images.mjs) crops, resizes and
compresses them, and writes their dimensions to `src/data/images.ts`.

Pages use `<SiteImage name="plan-hmo" alt="..." sizes={imageSizes.article} />` from
[`src/components/SiteImage.tsx`](src/components/SiteImage.tsx). It sets width and height
so nothing shifts while images load, and lazy-loads everything except the homepage hero.

To add or replace images, put the originals in a folder outside `public/`, add them to
`SPEC` in the script, then run:

```bash
npm install --no-save sharp
```

```bash
node scripts/process-images.mjs path/to/originals
```

Keep each 1x file under about 150 KB. Delete the originals afterwards rather than
committing them.

---

## Wiring up the forms

The four forms (help, contact, booking, referral) validate properly and then POST
JSON to `site.formEndpoint`. In production that defaults to
[`public/api/lead.php`](public/api/lead.php), which runs on the site's own cPanel
hosting and mails each enquiry to the agency, so leads never pass through a
third-party form service. The handler checks the form name, requires a name and a
way to reply, drops anything that fills the hidden honeypot field, and limits each
IP to ten submissions an hour.

Change the destination address at the top of that file. **In development there is no
PHP, so the forms stay in preview mode:** they validate and show the success panel,
send nothing, and say so.

If enquiries do not arrive, check the spam folder first: mail sent by shared hosting
to a free mailbox often lands there until the domain's SPF record is in place. A
failed send returns a 502 and the form shows its error panel rather than a false
success.

```bash
cp .env.example .env
```

Then set the endpoint to any handler that accepts a JSON POST — Formspree, Basin, a
Netlify function, or your own API:

```
VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

The payload is `{ form, ...fields, submittedAt }`, where `form` is `quote`,
`contact`, `book` or `refer`.

Because these forms collect names, phone numbers and ages, send them somewhere you
control and that is covered by the privacy policy. Do not point this at a third-party
lead marketplace.

---

## Deploying

The site is a static SPA — `npm run build` produces `dist/`, which any static host
can serve. Deep links need a rewrite to `index.html`; configs for the two easiest
hosts are already committed, so a connected host needs no dashboard setup beyond
picking the repo.

**Netlify** — [`netlify.toml`](netlify.toml) sets the build command, publish
directory, SPA rewrite and cache headers.

**Vercel** — [`vercel.json`](vercel.json) does the same.

**Namecheap / cPanel shared hosting** — see below.

**Anywhere else** — serve `dist/` and add a catch-all rewrite to `/index.html`.

### Prerendering

`npm run build` finishes by prerendering every URL in the sitemap
([`scripts/prerender.mjs`](scripts/prerender.mjs)). Each route is loaded in headless
Chromium and saved as `dist/<route>/index.html`, so crawlers and link previews get that
page's own title, description, content and structured data instead of the empty app
shell. The app still loads on top and handles navigation exactly as before.

**This needs a machine that can run Chromium.** Puppeteer downloads it during
`npm install`. If it cannot start (some shared hosts cannot run it), the build stops
with a message rather than shipping unprerendered pages.

On Apache and LiteSpeed, [`public/.htaccess`](public/.htaccess) serves `/areas-we-serve`
from `areas-we-serve/index.html` and turns off the automatic trailing-slash redirect, so
clean URLs return 200 rather than a 301. After a deploy, confirm one deep link:

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://www.mymedicareangel.com/areas-we-serve
```

```bash
curl -s https://www.mymedicareangel.com/areas-we-serve | grep '<title>'
```

The first should print `200` and the second the Areas We Serve title, not the homepage's.

**Social card.** `og:image` points at `public/logo/og-card.jpg`, composed at 1200x630 by
[`scripts/export-og-image.mjs`](scripts/export-og-image.mjs) from
`public/images/og-background.jpg` and the white logo lockup. It is a JPEG rather than a
PNG because WhatsApp drops link previews whose image is much over 300 KB. After changing
the background or the lockup, run `npm run og-image` and commit the JPEG.

### Namecheap (cPanel shared hosting)

cPanel runs Apache, so it ignores `netlify.toml`, `vercel.json` and
`public/_redirects`. It reads [`public/.htaccess`](public/.htaccess) instead, which
ships in every build and provides the SPA rewrite, compression, cache headers and
the security headers. **Without it every URL except `/` returns a 404** — that file
is the whole reason deep links work on this host.

**How deploys work: GitHub builds, the server copies.** Prerendering needs Chromium, and
this host cannot run it (it lacks `libatk-bridge` and `libatspi`), so the server no longer
builds anything. On every push to `main`,
[`.github/workflows/build-and-publish.yml`](.github/workflows/build-and-publish.yml)
builds and prerenders the site on GitHub and publishes the finished files to the `deploy`
branch. A cron job on the server checks that branch every 5 minutes and copies any new
build into the web root, and the workflow's last step waits until the live site serves
it. **A green tick on the commit means the change is live.**

One-time setup, in the cPanel terminal. Install the deploy script
([`scripts/server-deploy.sh`](scripts/server-deploy.sh)) and run it once:

```bash
mkdir -p ~/bin && curl -fsSL https://raw.githubusercontent.com/laconradoecks/my-medicare-angel/main/scripts/server-deploy.sh -o ~/bin/deploy-mymedicareangel.sh && bash ~/bin/deploy-mymedicareangel.sh
```

Then schedule it every 5 minutes (safe to re-run; it replaces its own entry):

```bash
(crontab -l 2>/dev/null | grep -v deploy-mymedicareangel; echo "*/5 * * * * /bin/bash $HOME/bin/deploy-mymedicareangel.sh >> $HOME/logs/mymedicareangel-deploy.log 2>&1") | crontab - && crontab -l
```

If the host blocks `crontab`, add the same job in cPanel → Cron Jobs ("Once per five
minutes"). Each published build adds a line to `~/logs/mymedicareangel-deploy.log`.

The script clones `deploy` on first run, copies a build only when its `version.txt`
differs from the live one, never copies `.git` into the web root, and skips a run if
the previous one is still going. If a run's final step fails, GitHub says so on the
commit, and the log above is the first place to look.

To take the forms live, set `VITE_FORM_ENDPOINT` as a repository variable (Settings →
Secrets and variables → Actions → Variables); the next run builds it in.

The two options below build on your own computer instead, if GitHub Actions is ever
unavailable.

**Option A — SSH (Namecheap Stellar Plus and above):**

```bash
cp .env.deploy.example .env.deploy
```

Fill in your cPanel host and username, then dry-run first — it prints exactly what
would change and uploads nothing:

```bash
./scripts/deploy-namecheap.sh
```

```bash
./scripts/deploy-namecheap.sh --run
```

The script skips `.well-known` (AutoSSL's validation path) and `cgi-bin`, and does
**not** delete anything on the server unless you add `--prune`. `.env.deploy` is
gitignored; authentication is your SSH key, so no password is stored anywhere.

Note that Namecheap shared hosting listens on **port 21098**, not 22 — already the
script's default.

**Option B — cPanel File Manager, no SSH:**

1. `npm run build`
2. Zip the *contents* of `dist/` (not the folder itself)
3. File Manager → `public_html` → Upload → Extract
4. Confirm `.htaccess` is present afterwards — turn on **Settings → Show Hidden
   Files** to see it. If it did not survive the zip, upload it separately; nothing
   but the homepage will work without it.

**After the first upload:**

- Wait for cPanel to show AutoSSL as active, then uncomment the two HTTPS-redirect
  lines at the top of `.htaccess` and re-upload. Enabling it before the certificate
  exists makes the site unreachable behind a certificate warning.
- Set `site.url` and `public/robots.txt` to the live address (see below).

**Deploying to a subfolder** (e.g. `yourdomain.com/preview/`) needs two changes,
because the app currently assumes it is served from the domain root:

```ts
// vite.config.ts
export default defineConfig({ base: '/preview/', /* ... */ });
```

```tsx
// src/main.tsx
<BrowserRouter basename="/preview">
```

A cPanel **subdomain** (`preview.yourdomain.com`) avoids both edits and is the
cleaner way to host a client preview — point `DEPLOY_PATH` at its document root.

### Deploying from git

The repo is initialised with an initial commit. Add your remote and push:

```bash
git remote add origin git@github.com:YOUR-ORG/mymedicareangel.git
```

```bash
git push -u origin main
```

Then in Netlify or Vercel, "Add new site → Import an existing project", pick the
repo, and accept the detected settings — both read the committed config. Every push
to `main` redeploys; pull requests get preview URLs.

Set `VITE_FORM_ENDPOINT` in the host's environment variables (not in a committed
`.env` — `.env` is gitignored) and redeploy to take the forms live.

### Pointing your domain at it

1. Push and let the host build once; confirm the site works on its default URL.
2. Add your domain as a custom domain in the host's dashboard.
3. At your registrar, follow the host's DNS instructions — usually an `A` record for
   the apex and a `CNAME` for `www`. Netlify and Vercel both print the exact values,
   and issue the TLS certificate automatically once DNS resolves.
4. **Set the domain in two places**, then commit and push:
   - `site.url` in [`src/config/site.ts`](src/config/site.ts)
   - the `Sitemap:` line in [`public/robots.txt`](public/robots.txt)

   Both currently read `https://www.mymedicareangel.com`. Canonical URLs, Open Graph
   tags and `sitemap.xml` are all generated from that value, so if your live domain
   differs, change it before launch or search engines will index the wrong host.
5. Submit `https://yourdomain.com/sitemap.xml` to Google Search Console.

---

## Before launch

These were placeholders in the designs and are carried through as placeholders in
the code, deliberately visible rather than invented. Search for `TODO` and `[` to
find them.

- [x] ~~Logo~~ — the angel mark from the pack is wired into the header, favicons,
      app icons and manifest.
- [x] ~~Hero photograph~~ — placed with the rest of the photography (see Photography).
- [x] ~~Carrier names~~ — Cigna, UnitedHealthcare, Aetna, Humana and Blue Cross Blue
      Shield, in `src/data/carriers.ts`.
- [ ] **Carrier logo permission** — the client's logo files are processed by
      `scripts/process-logos.mjs` and now shown on the homepage strip and the partners
      page. Carriers set brand-usage rules for appointed agents, so confirm written
      permission for each, and replace the generic Blue Cross mark with the specific
      company the agency is appointed with.
- [ ] **Real testimonials** — `src/data/testimonials.ts` holds four samples, labelled
      as samples on the page. Replace the quotes and attributions together.
- [ ] **Disclaimer counts** — the "[X] organizations / [Y] products" line on the
      disclaimers page must match actual contracts. Blue Cross Blue Shield plans are
      separate companies by state, so confirm which ones the agency is appointed with
      before counting.
- [ ] **Client testimonial** — `src/pages/Home.tsx`. Needs a real, permissioned quote.
- [ ] **Email address** — `src/config/site.ts` (currently a best guess)
- [ ] **Part B premium figure** — `src/pages/learn/OriginalMedicare.tsx`, updates yearly
- [ ] **Event dates, times and venues** — `src/data/events.ts`
- [ ] **Five unwritten articles** — `src/data/articles.ts`. They render a clearly
      marked draft state and are `noindex` until `body` is filled in.
- [ ] **Privacy policy and terms** — `src/pages/legal/LegalPages.tsx`
- [x] ~~Office map placeholder~~ — replaced by the office photo on the contact page. Add
      an embedded map later if one is wanted.
- [ ] **Form endpoint** — see above
- [x] ~~Social card~~ — `public/logo/og-card.jpg`, set as `og:image` on every page.

### Compliance note

This site markets Medicare plans, so CMS marketing rules apply. The required
non-governmental disclaimer sits in the footer of every page
(`src/config/site.ts`), and the disclaimers page carries the longer version. Have
whoever handles your carrier compliance review the copy — particularly the
disclaimers page and the quote form's consent text — before it goes live.

---

## Relationship to `designs/`

`designs/` is untouched and stays the visual reference:

- `mymedicareangel-prototype.html` — the clickable 23-page prototype; the source of
  all copy
- `*.dc.html` + `canvas.json` — the design canvas artboards

`logo/` holds the supplied logo pack (`mymedicareangel-logo-pack.zip` and
`proof-sheet.png`) as the delivered source; the unpacked, web-served copies live in
`public/logo/`.

Two deliberate departures from the prototype:

1. **Section padding.** The prototype's `.sect { padding: 64px 0 }` overrode
   `.wrap`'s side padding, so those sections ran edge-to-edge on phones. The port
   uses `padding-block` so the inset holds.
2. **Booking dates.** The prototype showed `Mon [DATE]` chips. The app renders the
   next five business days so the picker works without a scheduling backend — swap
   in real availability when a calendar integration is added.
