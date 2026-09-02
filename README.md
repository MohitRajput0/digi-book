# Digi Book 📚

> A modern, modular academic resource sharing platform built with a high-performance FastAPI backend, PostgreSQL database, and a React (Vite) frontend.

---

## 🛠️ Tech Stack

- **Backend:** FastAPI, SQLAlchemy 2.0, Pydantic v2, PostgreSQL (psycopg2)
- **Frontend:** React 18, Vite, Lucide React
- **Architecture:** Modular CRUD repository pattern, RESTful API, OpenAPI 3.1 (Swagger UI)

---

## 📂 Project Structure

\\\	ext
digi-book/
├── backend/
│   ├── app/
│   │   ├── api/v1/endpoints/  # Route controllers (users, resources)
│   │   ├── core/              # Config and settings
│   │   ├── crud/              # Database operations
│   │   ├── database/          # Engine and session lifecycle
│   │   ├── models/            # SQLAlchemy database tables
│   │   └── schemas/           # Pydantic data validation schemas
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/                   # React components and views
│   └── package.json
└── README.md
\\\

---

## 🚀 Getting Started

### 1. Backend Setup

\\\ash
cd backend
python -m venv venv

# Windows PowerShell:
.\venv\Scripts\Activate.ps1

# Install dependencies:
pip install -r requirements.txt

# Configure environment variables:
cp .env.example .env
# Update .env with your local PostgreSQL credentials

# Start development server:
uvicorn app.main:app --reload --host 127.0.0.1 --port 5000
\\\

Interactive API documentation is accessible at \http://127.0.0.1:5000/docs\.

### 2. Frontend Setup

\\\ash
cd frontend
npm install
npm run dev
\\\

The frontend application runs at \http://localhost:5173\.

---

## 📌 Project Milestones

- [x] **Phase 1:** Monorepo skeleton, virtual environments, Git setup.
- [x] **Phase 2:** PostgreSQL schema, SQLAlchemy models, Pydantic schemas, CRUD API endpoints.
- [ ] **Phase 3:** React frontend integration with live API consumption.
- [ ] **Phase 4:** JWT-based user authentication and route protection.
- [ ] **Phase 5:** Media storage pipeline for academic document uploads.
