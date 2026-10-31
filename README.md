# FITBEAT animated character sprites v1
This pack contains individual 256x256 transparent PNG poses extracted from the approved character concept sheet. The extraction is automated, so inspect edges and poses; some may have artifacts. No approved backgrounds are changed.

Upload `assets/sprites/` and the two files `sprites.css`, `sprites.js` to the root of your GitHub repository.

In `index.html`, add immediately AFTER the existing art-ui.css stylesheet:
`<link rel="stylesheet" href="sprites.css?v=1">`

At the end of index.html, immediately AFTER `<script src="game.js"></script>` add:
`<script src="sprites.js?v=1"></script>`

IMPORTANT: The sprite animation is based on the existing game.js CSS class changes. It cycles different pose images, unlike the previous single-image CSS transforms. The initial still image will be replaced automatically when the page loads. All backgrounds remain unchanged.

Known limitations: automatic extraction from a design sheet is not equivalent to individually illustrated professional sprites; some edges, hand/foot details, and poses may need touch-ups. Use these as a functional first pass.
