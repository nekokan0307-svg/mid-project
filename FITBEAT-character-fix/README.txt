FITBEAT Character Visibility Fix v1

1. Upload character-fix.css to the repository root (beside index.html).
2. In index.html, after the art-ui.css stylesheet link and before </head>, add:
<link rel="stylesheet" href="character-fix.css?v=1">
3. Commit changes, then hard refresh GitHub Pages.

This patch reduces clipping caused by CSS sizing and movement. It does not repair any pixels already missing from assets/puppy-art.png and does not create articulated animation. A sprite sheet or separate limb layers will be needed for that.
