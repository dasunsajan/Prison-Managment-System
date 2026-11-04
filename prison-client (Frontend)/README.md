# 🏛️ Prison Management System — Frontend (`prison-client`)

The client-side web application for the **Prison Management System**, built with **React 19**, **Vite**, **Tailwind CSS v4**, and **React Router v7**.

> ⬅️ **[Back to Main Project README](../README.md)** | ⚙️ **[Backend Documentation (`prison-server`)](../prison-server%20(Backend)/README.md)**

---

## ✨ Features

- **Role-Based Dashboard**:
  - **Admin View**: Generate one-time 48-hour invite codes for IT section officers and view category statistics.
  - **Category Management**: Search, create, edit, and delete records for **Prisoners**, **Doctors**, **Visitors**, **Officers**, and **Other Staff**.
- **Image Optimization**: Client-side canvas resizing (max 300px) for prisoner, staff, and profile photos prior to upload.
- **Multilingual Support (i18n)**: Switch seamlessly between **English (`en`)**, **Sinhala (`si`)**, and **Tamil (`ta`)**, with one-click offence translation on prisoner forms.
- **User Personalization**: Profile page with avatar upload and Settings page with **Light/Dark Mode** and **Font Size** (`Small`, `Medium`, `Large`) persistence.

---

## 📂 Directory Structure

```text
prison-client (Frontend)/
├── public/                 # Static assets (images, icons, favicon)
├── src/
│   ├── api/
│   │   └── axios.js        # Axios instance configured for backend API
│   ├── components/
│   │   ├── DashboardHome.jsx
│   │   └── Sidebar.jsx     # Navigation sidebar & user profile summary
│   ├── context/
│   │   ├── LanguageContext.jsx
│   │   └── ThemeContext.jsx
│   ├── i18n/
│   │   └── translations.js # English, Sinhala, and Tamil dictionaries
│   ├── pages/
│   │   ├── Dashboard.jsx   # Main CRUD dashboard & admin invite generator
│   │   ├── Login.jsx       # Staff login portal
│   │   ├── Profile.jsx     # Officer/Admin profile view & avatar manager
│   │   ├── Register.jsx    # Invite-code-based officer registration
│   │   └── Settings.jsx    # Theme, language, font size, & password settings
│   ├── utils/
│   │   └── profile.js      # Local photo storage & image resizing helpers
│   ├── App.jsx             # Application routing
│   ├── index.css           # Tailwind CSS v4 imports & dark mode styles
│   └── main.jsx            # React root entry point
├── Dockerfile              # Multi-stage Node 20 build + Nginx Alpine server
├── package.json
└── vite.config.js
```

---

## 🚀 Available Scripts

Inside `prison-client (Frontend)`:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server (http://localhost:5173):**
   ```bash
   npm run dev
   ```

3. **Build for production (`dist/`):**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

5. **Run ESLint:**
   ```bash
   npm run lint
   ```

---

## 🐳 Docker Build & Run

```bash
docker build -t prison-client .
docker run -p 8080:80 prison-client
```
Then visit **http://localhost:8080**.
