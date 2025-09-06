# Resume Analyzer (DeepKlarity Assignment Starter)

A full-stack web app to upload resumes (PDF), extract data, store in PostgreSQL, and generate AI-driven feedback via Google Gemini.

## Tech Stack
- Frontend: React (CRA)
- Backend: Node.js + Express
- DB: PostgreSQL (JSONB)
- LLM: Google Gemini via `@google/generative-ai`
- PDF parsing: `pdf-parse`
- Uploads: `multer`

## Architecture
React → Express → pdf-parse → Gemini → PostgreSQL

## Quick Start

### 1) PostgreSQL
Create DB `resumesdb` (or update `.env`):

```sql
CREATE DATABASE resumesdb;
```

### 2) Backend
```bash
cd backend
cp .env.example .env   # update values
npm install
npm run init:db        # create tables
npm run dev            # or npm start
```

### 3) Frontend
```bash
cd ../frontend
npm install
npm start
```
Open http://localhost:3000

### API
- `POST /api/resumes/upload` form-data with `resume` (PDF)
- `GET  /api/resumes` list
- `GET  /api/resumes/:id` details

## Notes
- Set `CORS_ORIGIN=http://localhost:3000` in backend `.env`.
- Requires valid `GOOGLE_API_KEY` for Gemini.
- File limit: 5MB.

## Scripts
- `backend/scripts/initDb.js` initializes table from `db/schema.sql`.
