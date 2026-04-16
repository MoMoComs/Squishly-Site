# Squishly Site

This repository is now publishable as a static website.

## Quick publish options

### GitHub Pages
1. Go to **Settings → Pages**
2. Set **Source** to `Deploy from a branch`
3. Select branch `copilot/make-website-publishable` (or your default branch) and folder `/ (root)`
4. Save

### Netlify / Vercel / Cloudflare Pages
- Import this repository
- Build command: **(none)**
- Output directory: **.**

## Local preview
Open `index.html` directly in a browser, or run:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.
