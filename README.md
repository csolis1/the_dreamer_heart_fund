# The Dreamer Heart Fund
 
The Dreamer Heart Fund supports low-income artists and creators through direct mutual aid, storytelling, and community awareness. This repo contains the source for [dreamerheartfund.netlify.app](https://dreamerheartfund.netlify.app/) — a static site with no build step, currently running as a benefit site ahead of formal nonprofit status.
 
## Site structure
 
| Page | Purpose |
|---|---|
| `index.html` | Homepage — mission summary, upcoming/past events, donate section |
| `about.html` | Mission page with photo gallery |
| `programs.html` | Detailed program listings |
| `shop.html` | Print shop — Carlos Solis's surrealist print series |
 
Each HTML page has a matching JS file for its interactive behavior (`main.js`, `programs.js`, `shop.js`, `donate.js`), and all pages share one stylesheet, `index.css`.
 
## How things work
 
- **Donations** — handled client-side via the PayPal JS SDK (`donate.js`). Preset or custom amounts are validated before the PayPal button becomes active.
- **Print orders** — `shop.js` opens a modal for each print (data comes from `data-*` attributes on each product card, not hardcoded in JS). "Order This Print" links to a Google Form, pre-filled so the correct print's checkbox is already checked, using each card's `data-print-label` attribute. See `entry.1000027` in the form URL inside `shop.js` if you need to adjust which field gets pre-filled.
- **Images** live in `images/`, organized by use (paintings, icons, etc).
## Deployment
 
Deployed on Netlify from the `main` branch. Changes on other branches (e.g. `quick-fix-print-size`) need a merged pull request before they go live.