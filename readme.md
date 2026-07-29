
# AI Powered Customer Complaint Management System

An AI-powered customer complaint management system built for the pharmaceutical manufacturing domain.  
The application combines a React + Redux frontend with a FastAPI backend, PostgreSQL database, LangGraph AI workflow, and Groq LLM integration to help users log, edit, and extract complaint details from natural language or uploaded documents.

## Live Demo

- **Frontend:** https://ai-based-complaint-managment-system-jdts56wb5.vercel.app/
- **Backend Health Check:** https://ai-based-complaint-managment-system.onrender.com/health
- **GitHub Repository:** https://github.com/rohitkumar91131/ai-based-complaint-managment-system

---

## Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Frontend Overview](#frontend-overview)
- [Backend Overview](#backend-overview)
- [API Endpoints](#api-endpoints)
- [Local Setup](#local-setup)
- [Deployment](#deployment)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Future Improvements](#future-improvements)
- [Screenshots](#screenshots)
- [Author](#author)

---

## About the Project

This project is designed as an AI copilot for pharmaceutical complaint handling.  
Instead of filling a long manual form first, the user can simply:

- type a complaint in natural language,
- edit an existing complaint using natural language,
- upload a complaint PDF,
- or continue the conversation like a copilot/chat interface.

The AI extracts relevant complaint fields, generates a summary, assesses risk, and populates the complaint form automatically.

This makes the complaint intake workflow faster, more intelligent, and more aligned with real-world quality assurance processes in pharma manufacturing.

---

## Key Features

### AI Copilot
- Natural language complaint logging
- Complaint editing using chat-like messages
- PDF document extraction
- AI-generated summary
- AI risk assessment
- Intent detection using LangGraph

### Complaint Management
- Create complaint
- View all complaints
- View complaint details
- Update complaint
- Delete complaint
- Save to PostgreSQL

### Dashboard
- AI Copilot panel
- Complaint form auto-population
- Complaint list page
- Complaint details modal
- Backend connection status indicator
- Health check monitoring

### UX Features
- Responsive layout
- Modern SaaS-style dashboard
- Toast notifications
- Loading states
- Error states
- PDF drag-and-drop upload
- Live backend health indicator

---

## Tech Stack

### Frontend
- React
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS
- React Hook Form
- React Dropzone
- Lucide React
- Framer Motion
- Sonner

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- Pydantic
- LangGraph
- LangChain
- Groq LLM
- PyMuPDF

### Deployment
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** Render PostgreSQL

---

## Project Architecture

```text
User
  |
  v
React Frontend
  |
  +--> AI Copilot Chat / PDF Upload
  |        |
  |        v
  |   FastAPI /api/copilot/chat
  |        |
  |        v
  |   LangGraph Workflow
  |        |
  |        +--> Intent Detection
  |        +--> Complaint Extraction
  |        +--> Complaint Editing
  |        +--> Document Extraction
  |        +--> Summary Generation
  |        +--> Risk Assessment
  |
  +--> Complaint Save / Update / Delete
           |
           v
     FastAPI CRUD API
           |
           v
      PostgreSQL Database
````

---

## Frontend Overview

The frontend is a modern two-panel dashboard:

### Left Panel

* Complaint form
* Auto-filled by AI Copilot
* Editable fields
* Save and reset buttons

### Right Panel

* Chat-like AI Copilot
* PDF upload support
* AI summary card
* AI risk assessment card
* Backend health status
* Groq status badge

### Main Pages

* `/dashboard` — AI copilot and complaint intake
* `/dashboard/complaints` — complaint list and management
* complaint detail modal for rich viewing

---

## Backend Overview

The backend is built with FastAPI and contains:

### AI Layer

* `intent.py` — detects intent like log/edit/document extraction
* `extractor.py` — extracts structured complaint data
* `editor.py` — updates existing complaint fields
* `summarizer.py` — generates complaint summary
* `risk_assessor.py` — generates risk assessment
* `pdf_extractor.py` — extracts text from uploaded PDF files
* LangGraph orchestration layer for routing requests

### Database Layer

* PostgreSQL via SQLAlchemy
* complaint models and CRUD service functions

### API Layer

* `/api/copilot/chat`
* `/api/complaints`
* `/api/complaints/{id}`
* `/health`

---

## API Endpoints

### Health Check

`GET /health`

Response:

```json
{
  "status": "ok",
  "service": "Complaint AI Backend"
}
```

### AI Copilot

`POST /api/copilot/chat`

Supports:

* text prompt
* complaint edit message
* PDF upload
* current complaint JSON

### Complaints CRUD

* `POST /api/complaints`
* `GET /api/complaints`
* `GET /api/complaints/{complaint_id}`
* `PUT /api/complaints/{complaint_id}`
* `DELETE /api/complaints/{complaint_id}`

---

## Local Setup

## Backend Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

Docs:

```text
http://127.0.0.1:8000/docs
```

Health:

```text
http://127.0.0.1:8000/health
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Deployment

### Backend on Render

* Create a Render Web Service
* Root directory: `backend`
* Build command:

  ```bash
  pip install -r requirements.txt
  ```
* Start command:

  ```bash
  uvicorn app.main:app --host 0.0.0.0 --port $PORT
  ```

### Backend environment variables

```env
DATABASE_URL=<render-postgres-url>
GROQ_API_KEY=<your-groq-api-key>
CORS_ORIGINS=http://localhost:5173,https://ai-based-complaint-managment-system-jdts56wb5.vercel.app
```

### Frontend on Vercel

* Connect the GitHub repository
* Set environment variable:

  ```env
  VITE_API_URL=https://ai-based-complaint-managment-system.onrender.com
  ```

---

## Folder Structure

### Backend

```text
backend/
├── app/
│   ├── ai/
│   ├── document/
│   ├── graph/
│   ├── models/
│   ├── routers/
│   ├── schemas/
│   └── services/
├── sample_documents/
├── test_*.py
├── requirements.txt
└── .env
```

### Frontend

```text
frontend/
├── src/
│   ├── api/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── utils/
│   └── App.jsx
└── package.json
```

---

## Environment Variables

### Backend `.env`

```env
DATABASE_URL=postgresql://...
GROQ_API_KEY=...
CORS_ORIGINS=http://localhost:5173,https://ai-based-complaint-managment-system-jdts56wb5.vercel.app
```

### Frontend `.env`

```env
VITE_API_URL=https://ai-based-complaint-managment-system.onrender.com
```

---

## Screenshots

### AI Copilot Dashboard

Add a screenshot of the dashboard here.

### Complaint List Page

Add a screenshot of the complaint list page here.

### Complaint Details Modal

Add a screenshot of the complaint modal here.

---

## Future Improvements

* Authentication and role-based access
* Audit trail for complaint edits
* Similar complaint detection
* CAPA recommendation engine
* Email notification workflow
* Complaint analytics dashboard
* Export to PDF / Excel
* Advanced search and filters
* Full activity timeline for each complaint

---

## Author

Built by **Rohit Kumar**

GitHub: [https://github.com/rohitkumar91131](https://github.com/rohitkumar91131)

```

---

If you want, I can also turn this into a cleaner **professional README with badges, emoji headings, and a sharper portfolio style**, or I can make a **separate `README.md` for backend and frontend folders** so each one has its own setup instructions.
```
