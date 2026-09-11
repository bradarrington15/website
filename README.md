# VI Reef Response — website

A static site for **Reef Response**, the University of the Virgin Islands' coral restoration
program. No build step, no dependencies — plain HTML/CSS/JS, deployable to GitHub Pages as-is
and straightforward to port into Wix later.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — mission, why reefs matter, key elements of restoration, history timeline |
| `about.html` | Mission & goals, citizen science, bleaching reports, sick-coral ID, team |
| `restoration.html` | Methods, microfragmentation, outplanting, Rescue to Reef, the 8 coral species |
| `additional-projects.html` | Projects beyond the nurseries — currently the artificial reef |
| `outreach.html` | Outreach & education — Corals in the Classroom, teacher contact, community outreach |
| `where-we-work.html` | Interactive Leaflet map of 24 field sites + site index |
| `get-involved.html` | Ways to help (report, donate, partner), partners, downloads |
| `donate.html` | Appeal, impact tiers, giving options (→ GiveSmart) |
| `contact.html` | Contact form, contact details, partners |

## Run it locally

```bash
cd ~/reef-response-site && python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Deploy to GitHub Pages

The remote is already configured: <https://github.com/bradarrington15/website>

```bash
git push -u origin main
```

Then in the repo on GitHub: **Settings → Pages → Source: Deploy from a branch →
`main` / `/ (root)`**.

The site goes live at **<https://bradarrington15.github.io/website/>** a minute or two later.
All paths in the site are relative, so it works correctly from that subdirectory.

`.nojekyll` is present so GitHub Pages serves every file verbatim.

## Editing

- **Colors, type, spacing** — all in `css/style.css` under `:root`.
  Brand red `#C92838`, brand ink `#231F20`, ocean accents alongside.
- **Map sites** — `js/sites.js`. Each entry has `name`, `lat`, `lng`, `region`, and `type`
  (`"facility"` = red marker, `"site"` = teal). Derived from *Reef Response on the Map.kml*.
- **Navigation** — the `<nav>` block is repeated in the header of each page; update all nine
  if you add a page. The nav collapses to a menu button below 1280px (set in both
  `css/style.css` and `js/main.js` — keep the two in sync).
- **Adding a project** — `additional-projects.html` is built to hold several. Copy the
  artificial reef section: a `<section>` with an `id`, a lead `<figure>`, body copy, and an
  optional `.spec` or `.gallery` block.

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
