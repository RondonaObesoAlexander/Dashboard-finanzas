# 💰 Finance Dashboard

A full-stack personal finance tracking application built with **Node.js**, **SQLite**, and **vanilla JavaScript**. Features real-time charts, budget tracking, and transaction management with a clean REST API.

## ✨ Features

- 📊 Interactive charts (spending by category, monthly trends, net worth evolution)
- 💳 Transaction CRUD with filtering, sorting, and pagination
- 🎯 Budget goal tracking with progress indicators
- 📈 Net worth timeline and savings rate calculator
- 🔐 JWT authentication with refresh tokens
- 🧪 Unit + integration tests with 80%+ coverage
- 📝 Auto-generated API docs with Swagger UI

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Backend    | Node.js, Express, SQLite (better-sqlite3) |
| Auth       | JWT (access + refresh tokens)     |
| Frontend   | Vanilla JS, Chart.js, CSS Grid    |
| Testing    | Jest, Supertest                   |
| Docs       | Swagger / OpenAPI 3.0             |

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/your-username/finance-dashboard.git
cd finance-dashboard

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Seed the database with sample data
cd ../backend && npm run seed

# Start the backend (port 3000)
npm run dev

# In another terminal, serve the frontend
cd ../frontend && npm run dev
```

Open `http://localhost:5173` in your browser.

## 📁 Project Structure

```
finance-dashboard/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers (thin layer)
│   │   ├── models/          # Business logic + DB queries
│   │   ├── routes/          # Express routers
│   │   ├── middleware/       # Auth, error handling, validation
│   │   └── db/              # Schema, migrations, seed data
│   └── tests/               # Jest test suites
├── frontend/
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── hooks/           # State management hooks
│       ├── pages/           # Page-level views
│       └── utils/           # API client, formatters
└── docs/
    └── openapi.yaml         # API specification
```

## 🔌 API Endpoints

| Method | Path                       | Description              |
|--------|----------------------------|--------------------------|
| POST   | `/auth/register`           | Create account           |
| POST   | `/auth/login`              | Get JWT tokens           |
| GET    | `/transactions`            | List with filters + pagination |
| POST   | `/transactions`            | Create transaction       |
| PUT    | `/transactions/:id`        | Update transaction       |
| DELETE | `/transactions/:id`        | Delete transaction       |
| GET    | `/analytics/summary`       | Monthly summary          |
| GET    | `/analytics/by-category`   | Spending by category     |
| GET    | `/analytics/net-worth`     | Net worth timeline       |
| GET    | `/budgets`                 | Get all budgets          |
| PUT    | `/budgets/:category`       | Update budget goal       |

## 🧪 Running Tests

```bash
cd backend
npm test              # Run all tests
npm run test:coverage # With coverage report
```

## 📸 Screenshots

See `/docs/screenshots/` for UI previews.

## 🤝 Contributing

Pull requests welcome. Please open an issue first to discuss significant changes.

## 📄 License

MIT
