# Welikada Prison Management System (Client)

A modern, multilingual web application for managing prisoner records, doctors, visitors, officers, and general staff at Welikada Prison.

## Features

- **Unified Record Management**: Manage Prisoners, Doctors, Visitors, Officers, and Staff from a centralized dashboard.
- **Multilingual Support (i18n)**: Full user interface and offence translation support in **English**, **Sinhala (සිංහල)**, and **Tamil (தமிழ்)**.
- **Role-Based Access & Invite System**: Administrator-generated one-time invite codes for officer registration and JWT-based authentication.
- **Customizable Appearance**: Light/Dark theme toggle, adjustable font sizes, and user profile photo management.
- **Responsive Design**: Collapsible mobile navigation drawer and responsive data tables.

## Tech Stack

- **Frontend**: React 19, Vite, React Router v7
- **Styling**: Tailwind CSS v4
- **HTTP Client**: Axios (with request/response auth interceptors)
- **Containerization**: Docker (Multi-stage Node 20 Alpine build + Nginx Alpine server)

## Getting Started (Local Development)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables (optional):**
   Create a `.env` file in the root directory if your backend runs on a custom URL (defaults to `http://localhost:5000/api`):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Docker Deployment

Build and run the production container using Docker:

```bash
docker build -t prison-management-client .
docker run -p 8080:80 prison-management-client
```

Then open `http://localhost:8080` in your browser.
