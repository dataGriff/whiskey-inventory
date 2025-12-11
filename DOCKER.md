# Docker Setup for Whiskey Inventory

This document describes how to run the complete Whiskey Inventory application using Docker Compose.

## Quick Start

The easiest way to run the entire application is using the provided helper script:

```bash
# Start the entire application
./docker.sh

# Or explicitly
./docker.sh up
```

This will:
1. Build all necessary Docker images
2. Start PostgreSQL database
3. Run database migrations and seeding
4. Start the backend API server
5. Start the frontend web server

After startup, the application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Database**: localhost:5432

## Prerequisites

- Docker Engine 20.10+
- Docker Compose v2.0+ (or docker-compose v1.29+)

## Manual Docker Compose Commands

If you prefer to use Docker Compose directly:

```bash
# Start all services
docker compose up -d --build

# View logs
docker compose logs -f

# Stop all services
docker compose down

# Clean up everything (including volumes)
docker compose down -v --rmi all
```

## Services

The application consists of the following services:

### 1. PostgreSQL Database (`postgres`)
- **Image**: postgres:15-alpine
- **Port**: 5432
- **Volume**: postgres_data (persistent storage)
- **Health Check**: Checks database readiness

### 2. Database Migrations (`migrations`)
- **Build**: Custom image for running Prisma migrations
- **Purpose**: Initializes database schema and seeds data
- **Dependencies**: Waits for PostgreSQL to be healthy
- **Restart Policy**: No (runs once and exits)

### 3. Backend API (`backend`)
- **Build**: Multi-stage Node.js image
- **Port**: 3001
- **Dependencies**: Waits for migrations to complete
- **Health Check**: HTTP check on `/health` endpoint
- **Environment**: Production-ready with non-root user

### 4. Frontend (`frontend`)
- **Build**: Multi-stage build with Nginx
- **Port**: 3000 (mapped to internal port 80)
- **Dependencies**: Waits for backend to be healthy
- **Features**: 
  - Serves static React build
  - Proxies API calls to backend
  - Client-side routing support
  - Security headers
  - Gzip compression

## Configuration

### Environment Variables

Copy `.env.example` to `.env` and customize as needed:

```bash
cp .env.example .env
```

Key variables:
- `POSTGRES_USER`: Database username (default: whiskey_user)
- `POSTGRES_PASSWORD`: Database password (default: whiskey_dev_password)
- `POSTGRES_DB`: Database name (default: whiskey_inventory)
- `POSTGRES_PORT`: Database port (default: 5432)
- `BACKEND_PORT`: Backend API port (default: 3001)
- `FRONTEND_PORT`: Frontend web port (default: 3000)

### Docker Images

The setup uses multi-stage builds for optimization:

#### Backend Image (`Dockerfile.backend`)
- **Base**: node:18-alpine
- **Stages**: deps → builder → runner
- **Features**:
  - Non-root user for security
  - Production dependencies only
  - Health check endpoint
  - Prisma client generation

#### Frontend Image (`Dockerfile.frontend`)
- **Base**: node:18-alpine → nginx:alpine
- **Stages**: deps → builder → runner (nginx)
- **Features**:
  - Static file serving with Nginx
  - API proxy configuration
  - Client-side routing support
  - Security headers

#### Migrations Image (`Dockerfile.migrations`)
- **Base**: node:18-alpine
- **Purpose**: One-time database setup
- **Features**:
  - Database readiness checking
  - Prisma migrations
  - Database seeding

## Development vs Production

### Development
For development, you might want to use volume mounts for hot reloading:

```yaml
# Add to docker-compose.override.yml
version: '3.8'
services:
  backend:
    volumes:
      - ./backend/src:/app/backend/src
    environment:
      - NODE_ENV=development
    command: npm run dev
```

### Production
The default configuration is production-ready with:
- Multi-stage optimized builds
- Non-root users
- Health checks
- Security headers
- Persistent data volumes

## Helper Script Commands

The `docker.sh` script provides convenient commands:

```bash
# Start services
./docker.sh up
./docker.sh start

# Stop services
./docker.sh down
./docker.sh stop

# View logs
./docker.sh logs           # All services
./docker.sh logs backend   # Specific service

# Restart services
./docker.sh restart

# Build images
./docker.sh build

# Service status
./docker.sh status

# Open shell in container
./docker.sh shell backend
./docker.sh shell frontend

# Clean up everything
./docker.sh clean

# Help
./docker.sh help
```

## Networking

All services communicate through a custom bridge network (`whiskey-network`). The frontend proxies API requests to the backend, providing a seamless single-origin experience.

## Data Persistence

Database data is stored in a Docker volume (`postgres_data`) that persists across container restarts. To completely reset the database, use:

```bash
./docker.sh clean
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: Change ports in `.env` if 3000/3001/5432 are in use
2. **Permission errors**: Ensure Docker daemon is running and user has permissions
3. **Build failures**: Try `docker system prune` to clean up build cache
4. **Database connection**: Check PostgreSQL logs with `./docker.sh logs postgres`

### Debugging

```bash
# View all service logs
./docker.sh logs

# Check service status
./docker.sh status

# Inspect specific service
docker compose ps
docker compose exec backend /bin/sh

# Rebuild everything
./docker.sh clean
./docker.sh up
```

## Security Considerations

- Non-root users in all application containers
- Security headers in Nginx configuration
- Database credentials should be changed for production
- Consider using Docker secrets for sensitive data in production

## Performance Optimization

- Multi-stage builds minimize image size
- Nginx gzip compression for frontend assets
- Production Node.js optimizations
- Health checks ensure service readiness
- Dependency caching in Docker layers