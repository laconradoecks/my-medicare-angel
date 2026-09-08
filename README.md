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
| `npm run build` | Typecheck, production build to `dist/`, then write `sitemap.xml` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | TypeScript only, no build |
| `npm run sitemap` | Regenerate `dist/sitemap.xml` |

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

**Social card.** [`public/logo/og-card.svg`](public/logo/og-card.svg) is a
1200×630 card built from the new mark, but no `og:image` tag is set yet — Facebook,
LinkedIn and iMessage will not render an SVG, and the pack's PNGs have transparent
backgrounds, which those clients composite unpredictably. Rasterise it once and add
the tag:

```bash
npx svgexport public/logo/og-card.svg public/og-image.png 1200:630
```

---

## Wiring up the forms

The four forms (quote, contact, booking, referral) validate properly and then POST
JSON to `VITE_FORM_ENDPOINT`. **When that variable is unset they run in demo mode:**
they validate and show the success panel, but send nothing, and the success panel
says so.

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

### Namecheap (cPanel shared hosting)

cPanel runs Apache, so it ignores `netlify.toml`, `vercel.json` and
`public/_redirects`. It reads [`public/.htaccess`](public/.htaccess) instead, which
ships in every build and provides the SPA rewrite, compression, cache headers and
the security headers. **Without it every URL except `/` returns a 404** — that file
is the whole reason deep links work on this host.

There is no Node build step on the server. Build locally, upload `dist/`.

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
- [ ] **Hero photograph** — `src/pages/Home.tsx`
- [ ] **Carrier logos and descriptions** — `src/data/carriers.ts`. The count also
      feeds the "[X] organizations / [Y] products" line on the disclaimers page,
      which must reflect actual contracts.
- [ ] **Client testimonial** — `src/pages/Home.tsx`. Needs a real, permissioned quote.
- [ ] **Email address** — `src/config/site.ts` (currently a best guess)
- [ ] **Part B premium figure** — `src/pages/learn/OriginalMedicare.tsx`, updates yearly
- [ ] **Event dates, times and venues** — `src/data/events.ts`
- [ ] **Five unwritten articles** — `src/data/articles.ts`. They render a clearly
      marked draft state and are `noindex` until `body` is filled in.
- [ ] **Privacy policy and terms** — `src/pages/legal/LegalPages.tsx`
- [ ] **Office map embed** — `src/pages/forms/Contact.tsx`
- [ ] **Form endpoint** — see above
- [ ] **Social card** — rasterise `public/logo/og-card.svg` and add the `og:image`
      tag (see Brand assets)

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
