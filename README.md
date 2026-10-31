# FITBEAT v0.2 — Cozy Animated Edition

A pastel 2D rhythm-fitness prototype inspired by the approved game art reference. Includes original layered art panels, a hand-built SVG puppy with CSS movement animations, three playable levels, flower timing, score/combo, sound and results.

## GitHub Pages
Upload all contents of this ZIP to the **root** of your existing `mid-project` repository (replace files with matching names), commit, and refresh the Pages URL. Do not upload the ZIP itself.

## Controls
Open `index.html`. Choose a level. On the computer, use Left Arrow, Right Arrow, Up Arrow and Space (Twist) to hit falling flowers near the target line. Pause button supported.

Open `controller.html` on iPhone Safari (HTTPS), tap Enable Motion and Calibrate. The page displays sensor readings, but **does not yet connect to the computer**. Real-time remote control requires a relay server and pairing, planned for next iteration.

## Art & animations
`assets/puppy.svg` is a separate animatable character. CSS classes `idle`, `dance-left`, `dance-right`, `reach`, `twist`, `cheer`, and `miss` animate it. Background art is cropped from the user-approved reference concept; some decorative UI text is baked into those art images, while the actual buttons and HUD are separate interactive HTML. Future production assets should be individually illustrated to avoid repeated baked-in labels.
