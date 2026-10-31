# 🌸 FITBEAT — Move to the Beat!

A cozy 2D rhythm-fitness web-game starter for a midterm project.

## Included (v0.1)
- `index.html`: desktop rhythm game demo, keyboard/buttons, score, combo, timer, results
- `controller.html`: iPhone motion sensor test with permission and calibration
- `style.css`: pastel cozy styling
- `game.js`, `controller.js`: JavaScript logic
- `assets/concept-art.png`: visual concept reference (not yet sliced into production sprites)

## Publish with GitHub Pages
1. Create a **public** GitHub repository named `fitbeat`.
2. Upload the **contents** of this folder to the repository root, keeping `assets/` as a folder.
3. Go to **Settings → Pages → Build and deployment**.
4. Select **Deploy from a branch**, branch **main**, folder **/(root)**, and **Save**.
5. Wait for deployment, then open `https://YOUR-USERNAME.github.io/fitbeat/`.
6. Open `https://YOUR-USERNAME.github.io/fitbeat/controller.html` on your iPhone in Safari and tap **Enable Motion**.

## Important limitations
- This starter **does not yet connect the iPhone to the computer**. That requires a separate real-time service (e.g. Socket.IO on a deployed server), room pairing and secure connections.
- The game demo currently responds to **keyboard/buttons**; sensor values appear only on the phone page.
- GitHub Pages hosts static files, **not a Node.js WebSocket server**.
- DeviceOrientation requires user permission on iOS Safari and a secure HTTPS context.
- Phone orientation does not verify exercise form or measure joint angles.

## Next steps
1. Test sensor axes on iPhone and calibrate.
2. Add WebSocket room pairing and real-time game control.
3. Create original sprite sheets/backgrounds based on the approved art direction.
4. Add original rhythm audio and beat synchronization.
