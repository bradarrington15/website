# VI Reef Response — website

A static site for **Reef Response**, the University of the Virgin Islands' coral restoration
program. No build step, no dependencies — plain HTML/CSS/JS, deployable to GitHub Pages as-is
and straightforward to port into Wix later.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — mission, why reefs matter, key elements of restoration, history timeline |
| `about.html` | Mission & goals, citizen science, bleaching reports, sick-coral ID, team |
| `restoration.html` | Methods, microfragmentation, outplanting, the 8 coral species |
| `where-we-work.html` | Interactive Leaflet map of 24 field sites + site index |
| `get-involved.html` | Be a Reef Responder, sign-up, partners, downloads |
| `donate.html` | Appeal, impact tiers, giving options (→ GiveSmart) |
| `contact.html` | Contact form, contact details, partners |

## Run it locally

```bash
cd ~/reef-response-site && python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Deploy to GitHub Pages

1. Create an empty repo on GitHub (no README, no .gitignore).
2. Point this repo at it and push:

   ```bash
   git remote add origin https://github.com/<your-username>/<repo>.git
   git branch -M main
   git push -u origin main
   ```

3. In the repo: **Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`**.
4. The site goes live at `https://<your-username>.github.io/<repo>/` in a minute or two.

`.nojekyll` is present so GitHub Pages serves every file verbatim.

## Editing

- **Colors, type, spacing** — all in `css/style.css` under `:root`.
  Brand red `#C92838`, brand ink `#231F20`, ocean accents alongside.
- **Map sites** — `js/sites.js`. Each entry has `name`, `lat`, `lng`, `region`, and `type`
  (`"facility"` = red marker, `"site"` = teal). Derived from *Reef Response on the Map.kml*.
- **Navigation** — the `<nav>` block is repeated in the header of each page; update all seven
  if you add a page.

## Before launch — what still needs content

Everything unfinished is marked in two ways, so you can find it fast:

- `<span class="todo">` — small yellow inline chips
- `<div class="todo-block">` / `.ph` — yellow notice boxes and dashed photo placeholders

Grep for them:

```bash
grep -rn "TODO" --include="*.html" .
```

Outstanding items:

- **Photography** — every `.ph` placeholder needs a real photo (hero shots, nursery, outplanting,
  microfragments, each of the 8 species, ID tips)
- **Team** — job titles for all 8 members; bios optional
- **History timeline** (`index.html`) — milestone years and descriptions
- **Coral health report** — the survey URL for the "Submit a report" button
- **Sick coral ID tips** (`about.html`) — intro paragraph and 4 tips
- **Reef Responder program** (`get-involved.html`) — eligibility, commitment, training, cost
- **Volunteer contact** — coordinator email/phone or sign-up form
- **Partners** — full dive shop and community partner list with links
- **Downloads** — add PDFs to a `downloads/` folder (the Nursery Maintenance Guidebook is ready)
- **Donation copy** — appeal text and real impact figures
- **Contact** — public email, phone, mailing address, and a form endpoint (see below)
- **Footer** — funder acknowledgement language, if your grants require it

### Contact form

GitHub Pages can't process form submissions. Either create a free
[Formspree](https://formspree.io) form and paste the endpoint into the `action` in
`contact.html`, or delete the form and use a `mailto:` link. Wix has its own form widget, so
this only needs a stopgap until the port.

## Porting to Wix

The page structure maps 1:1 onto Wix pages. Section copy can be pasted straight across.
Two things get rebuilt rather than copied: the **Leaflet map** (use Wix's map widget, with
`js/sites.js` as your coordinate list) and the **contact form** (use Wix Forms).

## Credits

Content adapted from *Reef Response Website Content.docx*. Logo and headshots © Reef Response /
University of the Virgin Islands.
