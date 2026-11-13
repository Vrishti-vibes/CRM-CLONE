# CRM Clone – Customer Relationship Management System

A full-stack Customer Relationship Management (CRM) application inspired by modern CRM platforms like Bigin by Zoho. It provides a centralized interface to manage customer relationships, sales activities, business records, and team workflows.

## 🚀 Project Overview

CRM Clone is designed to simplify customer and sales management through an integrated web application. It combines a React-based frontend with a FastAPI backend and database-driven APIs to manage business information efficiently.

The application supports role-based access for different users and provides a structured environment for managing contacts, companies, deals, products, tasks, and activities.

## ✨ Key Features

- **Dashboard:** Centralized overview of CRM information and business activities.
- **Contact Management:** Organize and manage customer contact records.
- **Company Management:** Maintain company information and associated records.
- **Deal Management:** Track sales opportunities and deal information.
- **Product Management:** Maintain product-related information.
- **Task Management:** Organize and track assigned tasks.
- **Activity Management:** Maintain records of business activities.
- **Notes:** Store additional information related to CRM records.
- **Authentication:** Secure login using JWT-based authentication.
- **Role-Based Access Control:** Supports Admin, Manager, and Sales Representative roles.
- **Reports:** Access CRM reporting and business information.
- **API Integration:** Frontend communicates with backend services through REST APIs.

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- Tailwind CSS
- Axios

### Backend
- Python
- FastAPI
- SQLAlchemy
- Pydantic
- JWT Authentication
- Passlib / Bcrypt

### Database
- SQLite (Local Development)
- PostgreSQL (Production Configuration)

### Development Tools
- Git & GitHub
- VS Code
- Postman
- Swagger UI

## 🏗️ Project Architecture

```text
CRM-CLONE/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── assets/
│   │
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## ⚙️ Installation & Setup

### Prerequisites

Make sure you have the following installed:

- Python 3.10+
- Node.js and npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Vrishti-vibes/CRM-CLONE.git
cd CRM-CLONE
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure your backend environment variables using `.env.example`.

Start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

Backend runs at:

`http://localhost:8000`

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Configure the frontend environment variable:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

Start the development server:

```bash
npm run dev
```

Frontend runs at:

`http://localhost:5173`

## 📚 API Documentation

The backend provides interactive API documentation through Swagger UI.

Once the backend is running, visit:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

API endpoints are organized under the `/api/v1` prefix.

## 🔐 Authentication & User Roles

The application uses JWT-based authentication to manage authenticated API requests.

Supported roles:

| Role | Description |
|---|---|
| Admin | Administrative access |
| Manager | Management-level access |
| Rep | Sales representative access |

Access permissions depend on the configured role-based authorization rules.

## 🗄️ Database

The application uses SQLAlchemy ORM for database operations.

- SQLite is supported for local development.
- PostgreSQL is intended for production database configuration.

Database tables are initialized through the backend database initialization module.

## 🔒 Security Notes

- Configure a strong, unique `SECRET_KEY` through environment variables.
- Never commit `.env` files or database credentials.
- Use secure production database credentials.
- Do not use development demo credentials in production.
- Configure production CORS origins before deployment.

## 📸 Screenshots

Add application screenshots here:

- Login Page
- Dashboard
- Contacts Management
- Companies Management
- Deals Management
- Tasks & Activities
- Reports

## 🎯 Project Objectives

- Build a full-stack CRM application.
- Implement RESTful APIs using FastAPI.
- Integrate frontend and backend services.
- Implement JWT authentication and role-based access.
- Understand database management using SQLAlchemy.
- Develop practical experience in full-stack web development.

## 👩‍💻 Developer

**Kumari Vrishti**

B.Tech – Computer Science and Engineering

Vishveshwarya Group of Institutions, Greater Noida

GitHub: [@Vrishti-vibes](https://github.com/Vrishti-vibes)

---

⭐ If you find this project interesting, consider giving the repository a star!
