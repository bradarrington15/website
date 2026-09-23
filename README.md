# Reef Response — website

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

- **Donate** (`donate.html`) — the other-giving-options box (cheques, in-kind gifts, sponsorship,
  tax-deductibility / EIN wording)
- **Site media** — every site on the map shows a "360° tour coming soon" placeholder until it has a
  `photo` or a `video360` in `js/sites.js` (see below)

Find them all with `grep -rn "class=\"todo" --include="*.html" .`

### Site media on the map

Clicking a marker — or a site name in the index — zooms the map to that location and opens a panel
underneath it. The panel's media slot is driven by two optional fields on each site in
`js/sites.js`:

```js
{ name: "Hull Bay", lat: 18.37, lng: -64.95, region: "St. Thomas — North Shore",
  type: "primary", spawning: false,
  photo: "images/site/hull-bay.jpg",   // a still of the site
  video360: "dQw4w9WgXcQ" }            // a YouTube video id for a 360 tour
```

`video360` wins when both are set. Upload the 360 footage to YouTube — it reads the camera's 360
metadata and serves the drag-to-look player, on phones too — then paste the id from the watch URL
(`youtube.com/watch?v=THIS_PART`). A site with neither field shows the placeholder.

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
