# 💩 BullshiftDetector

> AI-powered LinkedIn cringe detector, roaster & rewriter — because someone had to do it.

🔴 **Live Demo → [bullshiftdetector.web.app](https://bullshiftdetector.web.app)**

---

## What is this?

Paste any LinkedIn post. Get back:

- 🎯 **Cringe Score** (0–100) — how much bullshift is in it
- 💩 **Detected Buzzwords** — the offending words, highlighted
- 🔥 **The Roast** — a savage one-liner about the post
- ✅ **Clean Version** — what they should have said like a normal human
- 🔗 **Share your score** — post your cringe rating to LinkedIn (meta 😂)

---

## Built With

| Layer | Tech |
|-------|------|
| 🧠 AI | Claude API (claude-sonnet-4-5) |
| ⚙️ Backend | FastAPI + Python 3.12 |
| 🎨 Frontend | Next.js 14 + Tailwind CSS |
| ☁️ Deploy (BE) | GCP Cloud Run |
| 🔥 Deploy (FE) | Firebase Hosting |
| 📦 Container | Docker |

---

## Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/rohithkandula19/BullshiftDetector.git
cd BullshiftDetector
```

### 2. Backend
```bash
cd backend
python3.12 -m venv venv
source venv/bin/activate
cp .env.example .env
# add your ANTHROPIC_API_KEY to .env
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8080
```

Backend runs at: `http://localhost:8080`
Swagger docs at: `http://localhost:8080/docs`

### 3. Frontend
```bash
cd frontend
cp .env.example .env.local
# set NEXT_PUBLIC_API_URL=http://localhost:8080
npm install
npm run dev
```

Frontend runs at: `http://localhost:3000`

---

## API

### POST /api/v1/detect

**Request:**
```json
{
  "post": "Humbled and excited to announce..."
}
```

**Response:**
```json
{
  "score": 89,
  "buzzwords": ["humbled", "excited to announce", "grateful"],
  "roast": "Congratulations on saying absolutely nothing in 47 words.",
  "clean": "I got a new job. Thanks everyone.",
  "verdict": "PURE UNCUT BULLSHIFT"
}
```

---

## Deploy

### Backend → GCP Cloud Run
```bash
cd backend
gcloud artifacts repositories create bullshift \
  --repository-format=docker \
  --location=us-central1

gcloud builds submit --tag us-central1-docker.pkg.dev/YOUR_PROJECT_ID/bullshift/bullshift-backend

gcloud run deploy bullshift-backend \
  --image us-central1-docker.pkg.dev/YOUR_PROJECT_ID/bullshift/bullshift-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars ANTHROPIC_API_KEY=your_key_here
```

### Frontend → Firebase Hosting
```bash
cd frontend
npm run build
firebase deploy --only hosting
```

---

## Project Structure


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
│   ├── firebase.json
│   └── .env.example
└── README.md


---

## Why I Built This

Because I got tired of seeing "Humbled and excited to announce" for the 47th time this week.
Also, it makes recruiters laugh. And laughing recruiters give offers. 😂

---

built with 🤖 Claude API · no posts stored · roasts fictional · we are not responsible for any existential crises 🫠