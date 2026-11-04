# 🏛️ Prison Management System

A full-stack, multilingual **Prison Management System** designed for prison IT administration. The platform centralizes records management for prisoners, medical personnel (doctors), visitors, prison officers, and general staff, with role-based access control and trilingual support (**English**, **Sinhala**, and **Tamil**).

---

## 📁 Project Structure & Documentation

```text
Prison-Management-System/
├── README.md                          # Main project overview (this file)
├── prison-client (Frontend)/          # React 19 + Vite + Tailwind CSS v4 frontend
│   └── README.md                      # Frontend documentation
└── prison-server (Backend)/           # Node.js + Express + MongoDB REST API
    └── README.md                      # Backend API & setup documentation
```

- 📖 **[Frontend Documentation (`prison-client`)](./prison-client%20(Frontend)/README.md)**
- ⚙️ **[Backend Documentation (`prison-server`)](./prison-server%20(Backend)/README.md)**

---

## ✨ Key Features

- **Centralized Record Management**: Full CRUD operations for Prisoners, Doctors, Visitors, Officers, and Other Staff, including photo uploads and emergency/guardian contacts.
- **Trilingual Interface & Auto-Translation**: Complete UI localization in **English**, **සිංහල (Sinhala)**, and **தமிழ் (Tamil)**, plus automatic translation of prisoner offence descriptions into Sinhala and Tamil.
- **Role-Based Authentication & Invite System**:
  - JWT-based authentication (`admin` and `officer` roles).
  - Administrators can generate 48-hour one-time invite codes tied to an officer's badge number for secure officer registration.
- **Appearance & Accessibility**: Light/Dark mode toggle, customizable font sizes (`Small`, `Medium`, `Large`), and user profile photo management.
- **Containerized Architecture**: Dedicated `Dockerfile`s for both the frontend (multi-stage Node + Nginx) and backend (Node 20 Alpine).

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite 8, React Router v7, Tailwind CSS v4, Axios |
| **Backend** | Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens (JWT), bcryptjs |
| **DevOps** | Docker, Nginx |

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- **Node.js** (v20+ recommended)
- **MongoDB** (Local instance or MongoDB Atlas URI)

### 1. Start the Backend (`prison-server (Backend)`)
```bash
cd "prison-server (Backend)"
npm install
```
Create a `.env` file in `prison-server (Backend)/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
*(Optional)* Seed the default administrator account (`username: admin`, `password: admin123`):
```bash
npm run seed
```
Start the backend server:
```bash
npm run dev
```

### 2. Start the Frontend (`prison-client (Frontend)`)
Open a second terminal:
```bash
cd "prison-client (Frontend)"
npm install
npm run dev
```
Open **http://localhost:5173** in your browser.

---

## 🐳 Running with Docker

### Build & Run Backend
```bash
cd "prison-server (Backend)"
docker build -t prison-server .
docker run -d -p 5000:5000 --env-file .env --name prison-backend prison-server
```

### Build & Run Frontend
```bash
cd "prison-client (Frontend)"
docker build -t prison-client .
docker run -d -p 8080:80 --name prison-frontend prison-client
```
Access the web application at **http://localhost:8080**.

