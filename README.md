# Digi Book 📚

> A modern, modular academic resource sharing platform built with a high-performance FastAPI backend, PostgreSQL database, and a React (Vite) frontend.

---

## 🛠️ Tech Stack

- **Backend:** FastAPI, SQLAlchemy 2.0, Pydantic v2, PostgreSQL (psycopg2)
- **Frontend:** React 18, Vite, Lucide React
- **Architecture:** Modular CRUD repository pattern, RESTful API, OpenAPI 3.1 (Swagger UI)

---

## 📂 Project Structure

```text
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
