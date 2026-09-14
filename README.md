# Digi Book 📚

A modern, modular academic resource-sharing platform built with FastAPI, PostgreSQL, and React (Vite).

## 🛠️ Tech Stack

* **Backend**: FastAPI, SQLAlchemy 2.0, Pydantic v2, PostgreSQL (psycopg2), Uvicorn
* **Security & Auth**: JWT (python-jose), Password hashing (passlib, bcrypt), OAuth2 Bearer flow
* **Frontend**: React 18, Vite, Axios, Lucide React
* **Architecture**: Layered repository pattern, RESTful API, OpenAPI 3.1 (Swagger UI)

## 📌 Development Progress

* **Phases 1–4**: Scaffolding, database schema modeling, user registration/login, and baseline CRUD endpoints.
* **Phase 5 (Completed)**: Resource Ownership & Role-Based Access Control (RBAC):
  * Secured resource mutation routes (`POST`, `PUT`, `DELETE`) via `deps.get_current_user`.
  * Automated owner assignment from JWT claims on resource upload (`owner_id`).
  * Enforced ownership verification (`owner_id == current_user.id` or `is_superuser`) before permitting update or deletion actions.

## 🚀 Key API Endpoints

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Public | Register new user account |
| `POST` | `/api/v1/auth/login` | Public | OAuth2 login, returns JWT token |
| `GET` | `/api/v1/auth/me` | Protected | Fetch current authenticated user |
| `GET` | `/api/v1/users/` | Public | List platform users |
| `GET` | `/api/v1/resources/` | Public | Browse and filter academic resources |
| `GET` | `/api/v1/resources/{id}` | Public | Get specific resource by ID |
| `POST` | `/api/v1/resources/` | Protected | Upload academic resource (auto-assigns owner) |
| `PUT` | `/api/v1/resources/{id}` | Protected | Update resource (owner/superuser only) |
| `DELETE` | `/api/v1/resources/{id}` | Protected | Remove resource (owner/superuser only) |

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
