> **⚠️ All Rights Reserved.** This repository is published for viewing and portfolio purposes only. The code is **not** open source — reuse, redistribution, modification, or derivative works are not permitted without written permission. See [LICENSE](./LICENSE).
# 💩 BullshiftDetector

### AI-powered LinkedIn cringe detector, roaster & rewriter — because someone had to do it.

![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Claude AI](https://img.shields.io/badge/Claude_AI-D97706?style=for-the-badge&logo=anthropic&logoColor=white)
![GCP](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FF6F00?style=for-the-badge&logo=firebase&logoColor=white)
![Python](https://img.shields.io/badge/Python_3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)

🔴 [**Live Demo**](https://bullshiftdetector.web.app) · 📖 [**API Docs**](https://bullshift-backend-904786422972.us-central1.run.app/docs) · ⭐ **Star this repo**

![Live](https://img.shields.io/badge/Live-GCP_Cloud_Run-brightgreen?style=flat-square)
![AI Powered](https://img.shields.io/badge/AI-Claude_Sonnet-orange?style=flat-square)
![LinkedIn Posts Roasted](https://img.shields.io/badge/LinkedIn_Posts-Roasted_Daily-red?style=flat-square)
![Bullshift Tolerance](https://img.shields.io/badge/Bullshift_Tolerance-Zero-black?style=flat-square)

---

## What is BullshiftDetector?

BullshiftDetector is a **full-stack AI application** that analyzes LinkedIn posts for corporate buzzwords, hollow humility, and performative authenticity — then roasts them with Claude AI.

> 💡 Tired of "Humbled and excited to announce"? So are we. So we built a detector.

---

## Features

- 🎯 **Cringe Score (0–100)** — AI-powered scoring of how much bullshift is in the post
- 💩 **Buzzword Detection** — highlights offending words in real time
- 🔥 **The Roast** — one savage AI-generated one-liner about the post
- ✅ **Clean Rewrite** — what they should have said like a normal human
- 📋 **Copy & Share** — copy the clean version or share your cringe score to LinkedIn
- 🌗 **Dark / Light Mode** — because we're professional like that

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| 🧠 AI Engine | Claude API (claude-sonnet-4-5) |
| ⚙️ Backend | FastAPI + Python 3.12 |
| 🎨 Frontend | Next.js 14 + Tailwind CSS |
| ☁️ Backend Deploy | GCP Cloud Run |
| 🔥 Frontend Deploy | Firebase Hosting |
| 📦 Container | Docker |
| 🔁 CI/CD | GCP Cloud Build |

---

## How It Works

```
User pastes LinkedIn post
        ↓
FastAPI backend receives request
        ↓
Claude API analyzes for buzzwords, cringe score, roast & rewrite
        ↓
Returns structured JSON response
        ↓
Next.js frontend renders animated results
```

---

## Run Locally

### 1. Clone
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

Backend: `http://localhost:8080`  
Swagger: `http://localhost:8080/docs`

### 3. Frontend
```bash
cd frontend
cp .env.example .env.local
# set NEXT_PUBLIC_API_URL=http://localhost:8080
npm install
npm run dev
```

Frontend: `http://localhost:3000`

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

gcloud builds submit \
  --tag us-central1-docker.pkg.dev/YOUR_PROJECT_ID/bullshift/bullshift-backend

gcloud run deploy bullshift-backend \
  --image us-central1-docker.pkg.dev/YOUR_PROJECT_ID/bullshift/bullshift-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars ANTHROPIC_API_KEY=your_key_here
```

### Frontend → Firebase
```bash
cd frontend
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
│   │   ├── app/page.tsx
│   │   ├── components/
│   │   │   ├── CringeMeter.tsx
│   │   │   └── HighlightedPost.tsx
│   │   └── lib/api.ts
│   ├── package.json
│   └── firebase.json
└── README.md
```

---

## Why I Built This

Because I got tired of seeing *"Humbled and excited to announce"* for the 47th time this week.

Also — it makes recruiters laugh. And laughing recruiters give offers. 😂

---

built with 🤖 Claude API · no posts stored · roasts fictional · zero bullshift tolerance 💩