# WhatsApp CS Agents — Análisis Dashboard

Single-file React + Babel + Tailwind dashboard (all inline in `index.html`) that visualizes the
MoradaUno WhatsApp CS analysis: broker frustration, response time, writing quality, resolution
effectiveness, and problem evolution — per agent, across measurements over time.

**Live:** https://melodic-vacherin-dad12d.netlify.app/

## Deploy
Auto-deploys to Netlify on every push to `main` (publish dir = repo root, no build step — see `netlify.toml`).

To ship a change: edit `index.html` → commit → push. Netlify rebuilds automatically.

## Local preview
```
python3 serve.py   # http://localhost:5173
```

## Data
- **Live calls** are fetched at runtime from the Cloudflare Worker `delicate-poetry-a88a.ines-25d.workers.dev` (`/whatsapp-calls`).
- **Measurements** (frustration, response time, writing, resolution, problems) are baked into `index.html` as data arrays. Each analysis re-run adds a new dated measurement column. The analysis pipeline that generates these numbers lives separately in `whatsapp_analysis/` (download → batches → metrics → qualitative analysis).
