# CRM Clone

A modern CRM application inspired by Zoho Bigin.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Shadcn UI
- Prisma
- PostgreSQL
# CRM Clone Enterprise

An enterprise-grade CRM platform built with React 19 and FastAPI.

## Tech Stack
- **Frontend:** React 19, Vite, Tailwind CSS, Axios, React Hook Form, React Icons
- **Backend:** FastAPI, SQLAlchemy 2.0, Pydantic v2, Uvicorn, PostgreSQL

## Project Setup

### Backend Initialization
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

Frontend Initialization
Bash
cd frontend
npm install
npm run dev

---

## 6. Explanation

* **Pydantic Settings Management:** `backend/app/core/config.py` uses `pydantic-settings` to validate setup environments automatically. The `assemble_cors_origins` validator converts strict JSON array strings or comma-separated strings into standard Python arrays required by `CORSMiddleware`.
* **Path Resolution (`@` alias):** `vite.config.js` configures `@` to map to `./src`, making component and service imports modular without deep nested relative paths (`../../`).
* **Modular FastAPI Blueprint:** The application mounts API routes under `/api/v1`, exposing OpenAPI specs (`/api/v1/docs`) for documentation generation.
