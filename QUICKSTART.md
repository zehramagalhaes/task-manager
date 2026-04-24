# Quick Start

Get up and running with the Task Manager application in minutes.

## 1. Prerequisites
- Node.js 22.x
- npm 10.x
- Git

## 2. Installation
```bash
git clone <repository-url>
cd task-manager
npm install # Installs dependencies for root, client, and server
```

## 3. Environment Setup
```bash
cp server/.env.example server/.env
# Edit server/.env as needed (PORT, DB_*, CORS_ORIGIN)
```

## 4. Run Locally
```bash
npm run dev
```

This starts:
- 🚀 Angular dev server: `http://localhost:4200`
- ⚙️ Express API: `http://localhost:3000`
- 💚 API Health check: `http://localhost:3000/api/health`

## Troubleshooting

| Problem | Solution |
|---|---|
| Port 3000 in use | Kill process (`npx kill-port 3000`) or change `PORT` in `.env` |
| Node modules issues | `rm -rf node_modules package-lock.json && npm install` |
| Pre-commit hooks failing | Wait or fix formatter errors, or run `npm run lint:fix && npm run format` |
