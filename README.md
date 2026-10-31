# FITBEAT v0.3 — Separate Art Layers

This build replaces the previous full-screen concept-art screenshots with original standalone SVG backgrounds (`assets/*-scene.svg`). **No menus, characters, labels, scores or buttons are baked into these backgrounds.** The puppy remains a separate SVG with CSS movement animations; the rhythm targets and HUD are live HTML/JS.

## Deploy to GitHub Pages
Unzip and upload the **contents** (not the ZIP) to the root of `mid-project` on branch `main`, replacing matching files. Open `https://nekokan0307-svg.github.io/mid-project/?v=3`. You may leave old image files in assets; they are no longer used for screen backgrounds.

## Current limitations
The puppy is an animated single SVG using CSS transformations, not yet a multi-frame skeletal animation. iPhone controller displays motion readings but does not yet send live commands to the computer. Keyboard controls work.
