# Digi Book 📚

A modern, modular academic resource-sharing platform built with FastAPI, PostgreSQL, and React (Vite).

## 🛠️ Tech Stack

* **Backend:** FastAPI, SQLAlchemy 2.0, Pydantic v2, PostgreSQL (`psycopg2`), Uvicorn
* **Security & Auth:** JWT (`python-jose`), Password hashing (`passlib`, `bcrypt`), OAuth2 Bearer flow
* **Frontend:** React 18, Vite, Axios, Lucide React
* **Architecture:** Layered repository pattern, RESTful API, OpenAPI 3.1 (Swagger UI)

## 📁 Project Structure

```text
digi-book/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── deps.py                 # Common dependencies (get_db, get_current_user)
│   │   │   └── v1/
│   │   │       ├── endpoints/          # Route handlers (auth, users, resources)
│   │   │       └── api.py              # Consolidated v1 router
│   │   ├── core/                       # Security, settings & configs
│   │   ├── crud/                       # Database operations (user, resource)
│   │   ├── database/                   # Session lifecycle & Base metadata
│   │   ├── models/                     # SQLAlchemy database models
│   │   ├── schemas/                    # Pydantic validation schemas (user, token, resource)
│   │   └── main.py                     # FastAPI entry point & CORS configuration
│   ├── uploads/                        # Stored file assets
│   ├── .env.example                    # Template for environment variables
│   └── requirements.txt                # Python dependencies
├── frontend/
│   └── src/
│       ├── services/api.js             # Axios API client
│       ├── App.jsx                     # Dynamic resource dashboard
│       └── main.jsx                    # React root
└── README.md
