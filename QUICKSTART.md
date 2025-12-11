# Quick Setup Guide

## Docker Setup (Recommended) 🐳

Start the entire application with one command:

```bash
# Using the helper script (recommended)
./docker.sh

# Or manually with docker compose
docker compose up -d --build
```

**What this does:**
1. Builds all Docker images (frontend, backend, migrations)
2. Starts PostgreSQL database
3. Runs database migrations and seeding
4. Starts backend API server (port 3001)
5. Starts frontend web server (port 3000)

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/health
- Database: localhost:5432

**Useful Commands:**
```bash
./docker.sh logs          # View all logs
./docker.sh logs backend  # View backend logs only
./docker.sh status        # Check service status
./docker.sh stop          # Stop all services
./docker.sh clean         # Remove everything
```

## Manual Development Setup

If you prefer to run services individually:

### 1. Database
```bash
cd infra
docker compose up -d  # Start PostgreSQL only
```

### 2. Backend
```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm run codegen  # Generate API client
npm run dev
```

## Environment Configuration

Copy `.env.example` to `.env` and customize:
```bash
cp .env.example .env
```

Key variables:
- `POSTGRES_PASSWORD`: Database password
- `FRONTEND_PORT`: Frontend port (default: 3000)
- `BACKEND_PORT`: Backend port (default: 3001)

## Troubleshooting

- **Port conflicts**: Change ports in `.env`
- **Docker issues**: Run `./docker.sh clean` to reset
- **Database issues**: Check logs with `./docker.sh logs postgres`

For detailed documentation, see [DOCKER.md](DOCKER.md).