# VI Reef Response — website

A static site for **Reef Response**, the University of the Virgin Islands' coral restoration
program. No build step, no dependencies — plain HTML/CSS/JS, deployable to GitHub Pages as-is
and straightforward to port into Wix later.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — mission, why reefs matter, key elements of restoration, history timeline |
| `about.html` | Mission & goals, citizen science, bleaching reports, sick-coral ID, team |
| `our-work.html` | Landing page for the three R's, plus Rescue to Reef at Lovango Cay |
| `rescue.html` | Fragments of opportunity, the land-based gene bank, the 8 coral species |
| `research.html` | Monitoring, the artificial reef, room for further projects |
| `restore.html` | Microfragmentation, in-water nurseries, outplanting |
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
- **Navigation** — the `<nav>` block is repeated in the header of each page; update all eleven
  if you add a page. Nav: Our Work is a hover/focus dropdown holding Rescue, Research and Restore. It collapses to a menu button below 1080px (set in both
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

- **Donate** (`donate.html`) — the page still shows placeholders to visitors: the appeal copy, the
  impact examples, three `$__` tiers, a note to confirm the recurring option in GiveSmart, and the
  other-giving-options box (cheques, in-kind gifts, sponsorship, tax-deductibility / EIN wording)
- **Partners** — a "Partner list" box on Get Involved, plus an "Add partner" tile there and on
  Contact
- **Additional Projects** — a deliberate "add the next project" marker, showing where a second
  project section goes

Find them all with `grep -rn "class=\"todo" --include="*.html" .`

### Contact form

GitHub Pages can't process form submissions. The form on `contact.html` therefore has a small
script at the bottom of that page which intercepts submit and composes a `mailto:` to
reefresponse@uvi.edu from the fields, so nothing a visitor writes is silently discarded.

At the Wix port, replace the `<form>` with a Wix Forms element and delete that script. To use a
real endpoint before then (e.g. [Formspree](https://formspree.io)), put it in the form's `action`
and delete the script.


## Porting to Wix

The page structure maps 1:1 onto Wix pages. Section copy can be pasted straight across.
Two things get rebuilt rather than copied: the **Leaflet map** (use Wix's map widget, with
`js/sites.js` as your coordinate list) and the **contact form** (use Wix Forms).

## Credits

Content adapted from *Reef Response Website Content.docx*. Logo and headshots © Reef Response /
University of the Virgin Islands.
