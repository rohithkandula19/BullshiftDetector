# BullshiftDetector

> AI-powered LinkedIn cringe detector, roaster & rewriter — built with Claude API + FastAPI + Next.js 14

---

## Stack

| Layer | Tech |
|-------|------|
| AI | Claude API (claude-sonnet-4-20250514) |
| Backend | FastAPI + Python 3.12 |
| Frontend | Next.js 14 + Tailwind CSS |
| Deploy (BE) | GCP Cloud Run |
| Deploy (FE) | Firebase Hosting |

---

## Local Setup

### 1. Backend

```bash
cd backend
cp .env.example .env
# add your ANTHROPIC_API_KEY to .env

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8080
```

Backend runs at: http://localhost:8080
Swagger docs at: http://localhost:8080/docs

### 2. Frontend

```bash
cd frontend
cp .env.example .env.local
# set NEXT_PUBLIC_API_URL=http://localhost:8080

npm install
npm run dev
```

Frontend runs at: http://localhost:3000

---

## API Endpoints

### POST /api/v1/detect

Request:
```json
{
  "post": "Humbled and excited to announce..."
}
```

Response:
```json
{
  "score": 87,
  "buzzwords": ["humbled", "excited to announce", "grateful"],
  "roast": "Congratulations on saying absolutely nothing in 47 words.",
  "clean": "I got a new job. Thanks everyone.",
  "verdict": "PURE UNCUT BULLSHIFT"
}
```

---

## Deploy to GCP + Firebase

### Backend → Cloud Run

```bash
cd backend
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/bullshift-backend
gcloud run deploy bullshift-backend \
  --image gcr.io/YOUR_PROJECT_ID/bullshift-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars ANTHROPIC_API_KEY=your_key_here
```

### Frontend → Firebase

```bash
cd frontend
# update .env.local with Cloud Run URL
npm run build
firebase deploy --only hosting
```

---

## Project Structure

```
bullshiftdetector/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/detect.py
│   │   ├── services/claude_service.py
│   │   └── models/schemas.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── CringeMeter.tsx
│   │   │   └── HighlightedPost.tsx
│   │   └── lib/api.ts
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── firebase.json
│   └── .env.example
└── README.md
```
