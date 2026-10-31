# FITBEAT v0.4 — Hand-drawn backgrounds

Four **separate** backgrounds, cropped from the approved 2×2 image:

- `assets/menu-bakery.webp` — Home menu
- `assets/level1-spring.webp` — Level 1 / Easy
- `assets/level2-bakery.webp` — Level 2 / Medium
- `assets/level3-night.webp` — Level 3 / Hard

`scene-fix.css` selects the correct image and `game.js` updates `data-level` when starting each level. Existing gameplay, puppy SVG and controller files are preserved.

## GitHub Pages installation
Upload/replace the following at the **repository root**: `index.html`, `game.js`, `scene-fix.css`, plus the four new images inside `assets/`. Other existing files can stay unchanged.

No menu buttons, text, puppy or score are baked into these backgrounds.
