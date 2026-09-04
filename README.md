# Digi Book 📚

A modern, modular academic resource-sharing platform built with FastAPI, PostgreSQL, and React (Vite).

---

## 🛠 Tech Stack

- **Backend:** FastAPI, SQLAlchemy 2.0, Pydantic v2, PostgreSQL (`psycopg2`), Uvicorn
- **Frontend:** React 18, Vite, Axios, Lucide React
- **Architecture:** Layered repository pattern, RESTful API, OpenAPI 3.1 (Swagger UI)

---

## 📁 Project Structure

```text
digi-book/
├── backend/
│   ├── app/
│   │   ├── api/v1/endpoints/  # Route handlers (users, resources)
│   │   ├── core/              # Security, settings & configs
│   │   ├── crud/              # Database operations
│   │   ├── database/          # Session lifecycle & Base metadata
│   │   ├── models/            # SQLAlchemy database models
│   │   ├── schemas/           # Pydantic validation schemas
│   │   └── main.py            # FastAPI entry point & CORS
│   ├── uploads/               # Stored file assets
│   ├── .env.example           # Template for environment variables
│   └── requirements.txt       # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── services/api.js    # Axios API client
│   │   ├── App.jsx            # Dynamic resource dashboard
│   │   └── main.jsx           # React root
│   └── package.json           # Frontend scripts & dependencies
└── README.md
