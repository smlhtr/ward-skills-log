# Ward Skills Log

A phone-friendly PWA for tracking Duke-NUS Y4 procedure skills on the ward.

Live: https://smlhtr.github.io/ward-skills-log/

- Tappable attempt checkboxes, with date and supervisor
- 2 Oct 2026 snapshot preloaded (14 of 56 target attempts done, 42 left)
- Met badges, search, filters, dark mode
- Works offline; state is saved in this browser (`localStorage`)
- Export / Import JSON, and Reset to the 2 Oct snapshot

Source lives in this repository (and in `/workspace/ward-skills-log-src` on the box). GitHub Pages serves the built site from the `main` branch root, same pattern as [Popcorn](https://smlhtr.github.io/popcorn/).

```bash
npm install
npm run dev
npm run build
```

Vite `base`, the web app manifest `start_url` / `scope`, and the service worker are all set to `/ward-skills-log/`.
