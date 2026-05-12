# Handoff — Jini Park Artist Portfolio

## Goal
Recreate jinipark.com (Wix, $40/month) as a free static HTML site hosted on GitHub Pages, with the same visual design, layout, and image order as the original. The domain jinipark.com is currently being transferred from Wix to Namecheap (transfer was in progress — "Awaiting release from previous registrar" was the last known status).

## Live Site
- GitHub Pages: https://ltiernol.github.io/jiniparkart/
- Repo: https://github.com/ltiernol/jiniparkart
- Local path: /Users/logantierno/development/jiniparkart

## Current State

### What's working
- Fixed left sidebar (300px) with vertical nav — matches original Wix layout
- 3-column explicit div masonry gallery on paint.html — columns are now locked so images go in exact positions
- Lightbox on click with keyboard nav (← → Esc)
- Active nav link highlighted in purple (#7B5EA7)
- Mobile hamburger menu
- Auto-push to GitHub on every file edit (PostToolUse hook) — **NOTE: this hook has been silently failing; always push manually with:**
  ```
  git -C /Users/logantierno/development/jiniparkart add -A && git -C /Users/logantierno/development/jiniparkart commit -m "update" && git -C /Users/logantierno/development/jiniparkart push origin main
  ```

### What still needs work
- **paint.html order**: The 28 images are now in correct column positions but captions for images 22–28 haven't been confirmed (left blank). Verify against original site.
- **Other gallery pages**: screenprint.html, 3d.html, digital.html, draw.html, mural.html, zbrush.html all show "Images coming soon." — no images added yet.
- **about.html (CV)**: Exists as a shell, no content added yet.
- **index.html (homepage)**: Uses 4 local images from images/Home/ in confirmed order. Looks correct.
- **Domain**: jinipark.com transfer to Namecheap was in progress. Once complete, point DNS to GitHub Pages (CNAME → ltiernol.github.io).

## File Structure

```
jiniparkart/
├── index.html          # Homepage — 4 featured images stacked vertically
├── paint.html          # Painting gallery — 3 explicit columns, 28 images
├── screenprint.html    # Empty (placeholder)
├── 3d.html             # Empty (placeholder)
├── digital.html        # Empty (placeholder)
├── draw.html           # Empty (placeholder)
├── mural.html          # Empty (placeholder)
├── zbrush.html         # Empty (placeholder)
├── about.html          # CV page — shell only
├── css/style.css       # All styles
├── js/main.js          # Sidebar toggle, active nav, lightbox
├── images/
│   ├── Home/           # 4 images for homepage (named files)
│   └── Painting/       # 28 numbered files: 1.jpg–28.png
└── .claude/
    └── settings.local.json  # Auto-push hook (currently unreliable)
```

## Key CSS Details (style.css)
- `--sidebar-width: 300px`
- `--active: #7B5EA7` (purple nav highlight)
- `.gallery-grid` uses `display: flex` with three `.gallery-col` children (NOT column-count — this was intentionally changed to allow precise column control)
- `.gallery-col { flex: 1; display: flex; flex-direction: column; gap: var(--gap); }`
- Mobile: sidebar collapses to hamburger at 860px, 2 cols at 860px, 1 col at 500px

## paint.html Column Mapping
Images are numbered 1–28 in left-to-right, top-to-bottom reading order from the original Wix site.

| Column | Image numbers |
|--------|--------------|
| Left   | 1, 4, 7, 10, 13, 16, 19, 22, 25, 28 |
| Middle | 2, 5, 8, 11, 14, 17, 20, 23, 26 |
| Right  | 3, 6, 9, 12, 15, 18, 21, 24, 27 |

Known captions (from Wix):
- 1: flashe, gouache and airbrushed acrylic on canvas, 20 x 16 inches, 2025
- 2: acrylic, gouache, screenprint and mixed media on canvas, 10 x 16 inches, 2025
- 3: acrylic and caran d'ache on canvas, 10 x 24 inches, 2025
- 4: gouache, acrylic, oil and caran d'ache on loose canvas, 8 x 8 feet, 2019
- 5: flashe, gouache and acrylic on canvas, 6 x 8 feet, 2020
- 6: acrylic and screenprint on canvas, 10 x 16 inches, 2024
- 7: mixed media on canvas, 24 x 36 inches, 2019
- 8: gouache and acrylic on canvas, 62 x 34 inches, 2019
- 10: found objects, acrylic, oil, gouache, mixed media on canvas, 24 x 36 inches, 2018
- 11: acrylic on wood, 18 x 24 inches, 2018
- 12: mixed media on canvas, 36 x 36 inches, 2018
- 13: acrylic on canvas, 24 x 36 inches, 2018
- 14: acrylic on canvas, 24 x 36 inches, 2018
- 15: acrylic on canvas, 18 x 24 inches, 2018
- 16: acrylic on canvas, 32 x 46 inches, 2017
- 17: acrylic on canvas, 24 x 36 inches, 2018
- 18: acrylic on canvas, 20 x 16 inches, 2018
- 19: acrylic on canvas, 20 x 16 inches, 2016
- 20: oil on canvas, 24 x 36 inches, 2017
- 21: acrylic on wood, 30 x 64 inches, 2016
- 23: acrylic on canvas, 18 x 24 inches, 2016
- 24: acrylic on canvas, 24 x 18 inches, 2016
- 9, 22, 25, 26, 27, 28: captions unknown — left blank

## index.html Image Order (confirmed from Wix)
All from images/Home/:
1. Unbounded Being- Layers of Identity.jpg (horse)
2. Tears of the Untainted Soul-2.jpg
3. Bicheon - Flying Heavenly Deities.jpg (triptych)
4. Echoes of the Diaspora.jpg (layered silhouettes)

## Git / Deploy Notes
- SSH key is configured for GitHub push
- GitHub Pages serves from the `main` branch root
- The auto-push hook in .claude/settings.local.json runs on every Write/Edit but has been silently failing — always push manually after edits
- GitHub Pages takes 1–3 minutes to reflect changes after push
