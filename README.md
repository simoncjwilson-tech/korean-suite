# Korean Suite

Simon's personal Korean-learning apps. Static HTML + React via CDN, served from GitHub Pages, with session logging to Google Drive via a Google Apps Script webhook.

## Apps

- `docs/flashcards/` — vocabulary reference (flip + bilingual + multi-deck)
- `docs/drill/` — fast repetition
- `docs/seoul/` — conversational phrases
- `docs/listening/` — listening comprehension

## URLs (after Pages enabled)

- https://simoncjwilson-tech.github.io/korean-suite/
- /flashcards/
- /drill/
- /seoul/
- /listening/

## Logging

Each app POSTs session events to a Google Apps Script web app (fire-and-forget, no-cors). Logs land as `.jsonl` files in Drive at `My Drive/Korean Suite Logs/`, which sync to `/Users/simonwilson/My Drive/Korean Suite Logs/` on the Mac.

The webhook URL lives in `docs/shared/logger.js`. To rotate or redeploy, edit the constant and push.

## Editing

```bash
cd /Users/simonwilson/Documents/Code/korean-suite
git pull
# edit docs/<app>/index.html
git add -A && git commit -m "..." && git push
```

GitHub Pages rebuilds in ~30–90s.

## Spec

Full architecture rationale: `Simon's Inbox/ran-korean-suite-infra-spec-2026-05-14.md` (in the Claude working directory).
