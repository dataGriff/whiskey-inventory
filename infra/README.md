# Local Development Infrastructure

This directory contains the Docker Compose setup for local development of the Whiskey Inventory application.

## Prerequisites

- Docker and Docker Compose installed on your system
- Node.js and npm (for running migrations and seeding)

## Quick Start

### 1. Start PostgreSQL Database

From the `infra/` directory:

```bash
docker compose up -d
```

This will start a PostgreSQL container with the following default settings:
- **Host**: localhost
- **Port**: 5432
- **Database**: whiskey_inventory
- **User**: whiskey_user
- **Password**: whiskey_dev_password

### 2. Set Environment Variables

Create a `.env` file in the root of the repository (or export the variable):

```bash
DATABASE_URL="postgresql://whiskey_user:whiskey_dev_password@localhost:5432/whiskey_inventory?schema=public"
```

**Note**: This DATABASE_URL is for **local development only**. Never commit real credentials to the repository.

### 3. Run Migrations

From the root of the repository:

```bash
# Using the helper script
./scripts/run-migrations.sh

# Or directly with npm/npx
npx prisma migrate dev
```

### 4. Seed the Database

From the root of the repository:

```bash
# Using the helper script
./scripts/run-seed.sh

# Or directly with npm/npx
npx prisma db seed
```

## Environment Variables

You can customize the PostgreSQL configuration by setting environment variables before starting the services:

| Variable | Default | Description |
|----------|---------|-------------|
| `POSTGRES_USER` | whiskey_user | PostgreSQL username |
| `POSTGRES_PASSWORD` | whiskey_dev_password | PostgreSQL password |
| `POSTGRES_DB` | whiskey_inventory | Database name |

Example with custom values:

```bash
POSTGRES_USER=myuser POSTGRES_PASSWORD=mypass POSTGRES_DB=mydb docker compose up -d
```

Then update your `DATABASE_URL` accordingly:

```bash
DATABASE_URL="postgresql://myuser:mypass@localhost:5432/mydb?schema=public"
```

## Useful Commands

### Check Container Status

```bash
docker compose ps
```

### View Logs

```bash
docker compose logs -f postgres
```

### Stop Services

```bash
docker compose down
```

### Stop Services and Remove Data

⚠️ **Warning**: This will delete all data in the database!

```bash
docker compose down -v
```

### Connect to PostgreSQL CLI

```bash
docker compose exec postgres psql -U whiskey_user -d whiskey_inventory
```

### Check Database Health

```bash
docker compose exec postgres pg_isready -U whiskey_user -d whiskey_inventory
```

## Troubleshooting

### Port Already in Use

If port 5432 is already in use on your system, you can change the port mapping in `docker-compose.yml`:

```yaml
ports:
  - "5433:5432"  # Use port 5433 on host instead
```

Then update your `DATABASE_URL` to use the new port:

```bash
DATABASE_URL="postgresql://whiskey_user:whiskey_dev_password@localhost:5433/whiskey_inventory?schema=public"
```

### Connection Refused

Make sure the container is running and healthy:

```bash
docker compose ps
docker compose logs postgres
```

Wait for the health check to pass before running migrations.

### Reset Everything

To start fresh with a clean database:

```bash
docker compose down -v
docker compose up -d
# Wait for container to be healthy
./scripts/run-migrations.sh
./scripts/run-seed.sh
```

## Security Notes

- The default credentials are for **local development only**
- Never commit the `.env` file with real credentials
- Never use these credentials in production
- The `.env` file should be in `.gitignore`
