# ⚙️ Prison Management System — Backend (`prison-server`)

The RESTful API backend for the **Prison Management System**, built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)**.

> ⬅️ **[Back to Main Project README](../README.md)** | 📖 **[Frontend Documentation (`prison-client`)](../prison-client%20(Frontend)/README.md)**

---

## ✨ Features

- **Authentication & Authorization**:
  - Password hashing with `bcryptjs` and 8-hour session tokens via `jsonwebtoken` (JWT).
  - Middleware protection (`requireAuth`, `requireAdmin`) restricting system access to authorized `admin` and `officer` roles.
- **One-Time Officer Invite System**:
  - SHA-256 hashed invite codes with a 48-hour expiration window (`Invite` model) to prevent unauthorized officer registrations.
- **Unified People Management API**:
  - Categorized CRUD endpoints (`/api/people/:type`) supporting `prisoner`, `doctor`, `visitor`, `officer`, and `staff` records with search filtering by name or NIC.
- **Translation Proxy Endpoint**:
  - `/api/translate` endpoint to translate prisoner offence descriptions into Sinhala (`si`) and Tamil (`ta`).

---

## 📂 Directory Structure

```text
prison-server (Backend)/
├── config/
│   └── db.js               # MongoDB connection setup
├── middleware/
│   └── auth.js             # JWT verification & admin role guards
├── models/
│   ├── invite.js           # Officer invite code schema
│   ├── person.js           # Unified schema for Prisoners, Doctors, Visitors, Officers, Staff
│   └── staff.js            # Authenticated system users (Admin / IT Officers)
├── routes/
│   ├── auth.js             # Login, Register, & Admin Invite routes
│   ├── people.js           # CRUD routes for people categories
│   └── translate.js        # Text translation route
├── Dockerfile              # Node 20 Alpine container definition
├── package.json
├── seed.js                 # Database seeder for default admin account
└── server.js               # Express app entry point (Port 5000)
```

---

## 🔧 Environment Variables

Create a `.env` file in `prison-server (Backend)/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/prison_db
JWT_SECRET=your_super_secret_jwt_key
```

---

## 🚀 Setup & Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Seed default admin user:**
   ```bash
   npm run seed
   ```
   > Creates default admin: **Username:** `admin` | **Password:** `admin123`

3. **Run in development mode (with Nodemon):**
   ```bash
   npm run dev
   ```

4. **Run in production mode:**
   ```bash
   npm start
   ```

---

## 📡 API Endpoints Overview

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/login` | Public | Authenticate staff/admin & return JWT |
| `POST` | `/api/register` | Public (Invite) | Register a new officer using a valid invite code |
| `POST` | `/api/admin/invites` | Admin (`Bearer`) | Generate a 48-hour one-time invite code |
| `GET` | `/api/people/:type` | Auth (`Bearer`) | List/search records by category (`?q=search`) |
| `POST` | `/api/people/:type` | Auth (`Bearer`) | Create a new record in `:type` |
| `PUT` | `/api/people/:type/:id` | Auth (`Bearer`) | Update an existing record by ID |
| `DELETE` | `/api/people/:type/:id` | Auth (`Bearer`) | Delete a record by ID |
| `POST` | `/api/translate` | Auth (`Bearer`) | Translate text to Sinhala (`si`) or Tamil (`ta`) |

---

## 🐳 Docker Build & Run

```bash
docker build -t prison-server .
docker run -p 5000:5000 --env-file .env prison-server
```

