# NOIR HIDE (Django + React)

Luxury leather footwear e-commerce demo inspired by a contemporary workshop + editorial fashion tone.

## Quick start

### 1) Backend (Django REST API)
```bash
cd backend
.\venv\Scripts\python.exe -m pip install -r requirements.txt
.\venv\Scripts\python.exe manage.py migrate --noinput
.\venv\Scripts\python.exe manage.py seed_data
.\venv\Scripts\python.exe manage.py runserver 8000
```

API base used by the frontend: `http://localhost:8000/api`

### 2) Frontend (React + Vite + Tailwind)
```bash
cd frontend
npm install
npm run dev
```

## Project structure

- `backend/` Django project + REST endpoints (`shop` app)
  - `backend/shop/models.py` product/material/journal data models
  - `backend/shop/management/commands/seed_data.py` seeds a mock catalog using Unsplash placeholders
  - `backend/shop/views.py` read-only API viewsets + newsletter subscribe + collections list
  - `backend/db.sqlite3` local sqlite database
- `frontend/` React app (Vite)
  - `frontend/src/pages/` all routes (Home, Shop, Product, Materials, Collections, Journal, About, Account, Legal)
  - `frontend/src/components/` luxury UI components (Header, Hero sections, CartDrawer, ProductGallery, filters, etc.)
  - `frontend/src/data/` centralized mock catalog (products/materials/journal/testimonials)
  - `frontend/src/context/` local cart + favorites persisted to `localStorage`

## Deploy free on Render (Blueprint)

This repo ships a [`render.yaml`](./render.yaml) that provisions two free services:

- `noirhide-api` — Django REST API (Python web service, runs migrate + seed on build)
- `noirhide-web` — React/Vite static site (always-on, free)

### Steps
1. Push this repo to GitHub (already done if `gh` was used).
2. Go to [Render](https://dashboard.render.com) → **New** → **Blueprint**.
3. Connect the GitHub repo — Render reads `render.yaml` and creates both services.
4. Click **Apply**. First deploy takes a few minutes (backend build seeds the catalog).
5. Open the `noirhide-web` URL. The frontend auto-targets the API via the injected
   `VITE_API_BASE` host (see `frontend/src/lib/api.ts`).

### Free-tier caveats
- The backend **sleeps after ~15 min idle**; the first request then takes ~30–50s to wake.
- SQLite data is **ephemeral** — it resets on each redeploy (the catalog is re-seeded on build).
- CORS is opened (`CORS_ALLOW_ALL=True`) for the demo; tighten it for real use.

## Notes

- Cart + favorites persist in the browser via `localStorage`.
- Checkout is mock-only (no payment provider integrated).
- Newsletter submits to the Django endpoint when the backend is running.

