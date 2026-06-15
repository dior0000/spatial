# Локус — marketing site

Production-ready marketing site with interactive demo for **Локус** — a spatial AI grounding layer for CIS-market agents.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

The demo works **fully without any API keys** — a rich deterministic mock fills every schema field, including source reconciliation discrepancies and a caught "naive LLM" error.

## Environment variables (all optional)

Copy `.env.example` → `.env.local`:

| Variable | Purpose |
|---|---|
| `LLM_API_KEY` | Anthropic API key. If set, enables real orchestration path. |
| `LLM_PROVIDER` | `anthropic` (default). Extend `api/spatial-demo.ts` for other providers. |
| `MAPBOX_TOKEN` | Mapbox Directions / Geocoding. Used in real orchestration path. |
| `DGIS_KEY` | 2GIS API key. Used in real orchestration path. |

Without keys → `api/spatial-demo.ts` falls back to `getMockForQuery()` from `src/lib/mock-demo.ts`.

## Deploy to Vercel

```bash
npx vercel
```

All serverless functions live in `/api` and are auto-detected by Vercel. Set env vars in the Vercel dashboard (Project → Settings → Environment Variables).

## Project structure

```
src/
  lib/
    types.ts          # Shared TypeScript schema (SpatialDemoResponse, etc.)
    mock-demo.ts      # Rich per-chip mock responses
    demo-client.ts    # fetch wrappers — swap for TMA transport later
  components/
    Nav / Hero / ScopePanel
    Problem / Solution
    Demo + DemoTrace  # Centrepiece interactive section
    HowItWorks        # 6-step SVG/CSS agent cycle
    Moat / WhyNow
    Waitlist / Footer
  hooks/
    useDemo.ts        # Data-fetching state machine

api/
  spatial-demo.ts     # POST /api/spatial-demo — orchestration or mock
  waitlist.ts         # POST /api/waitlist — TODO: wire real storage
```

## Agent cycle (6 steps)

1. **Запрос** — user sends a natural-language spatial query
2. **План** — LLM decomposes the task, selects tools (never computes geometry directly)
3. **Грундинг** — spatial-RAG: each entity resolved via local CIS graph + 2ГИС/OSM/Яндекс
4. **Примирение** — source conflicts (2ГИС vs Яндекс vs OSM vs Mapbox) resolved explicitly with reason logged
5. **Расчёт** — distances / ETAs / routes / isochrones computed by deterministic tool, not LLM
6. **Верификация** — automated checks: coords within city bounds, plausible ETA, every fact has a source, no hallucinated places → answer returned with `confidence` score

## Telegram Mini App migration

Business logic lives in `src/lib/` and is framework-agnostic. To move to a TMA:

1. Replace `submitSpatialDemo` in `demo-client.ts` with a TMA-aware transport (WebApp.sendData / bot webhook).
2. Keep all components — they only depend on `SpatialDemoResponse` from `types.ts`.
3. Adjust global CSS variables if brand palette changes.

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | TypeScript check + Vite production build |
| `npm run lint` | ESLint strict |
| `npm run preview` | Preview production build locally |
