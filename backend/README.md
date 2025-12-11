# Whiskey Inventory Backend

Backend API for the Whiskey Inventory application, built with Express.js, TypeScript, and Prisma ORM.

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (local or remote)
- Docker (optional, for easy database setup)

## Quick Start with Docker

The fastest way to get started:

```bash
# 1. Start PostgreSQL with Docker
docker-compose up -d postgres

# 2. Install dependencies
npm install

# 3. Copy and configure environment
cp .env.example .env
# Edit .env if needed (default works with docker-compose)

# 4. Generate Prisma Client
npm run prisma:generate

# 5. Run migrations
npm run prisma:migrate

# 6. (Optional) Seed database
npm run prisma:seed

# 7. Start development server
npm run dev
```

The API will be available at http://localhost:3000

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy the example environment file and update with your database credentials:

```bash
cp .env.example .env
```

Edit `.env` and set your `DATABASE_URL`:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

Example for local development:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/whiskey_inventory?schema=public"
```

### 3. Generate Prisma Client

Generate the Prisma Client from the schema:

```bash
npm run prisma:generate
```

### 4. Run Database Migrations

Apply the database migrations to create tables:

```bash
npm run prisma:migrate
```

This will create the `Whiskey` table in your database.

### 5. (Optional) Seed the Database

To populate the database with sample data:

```bash
npm run prisma:seed
```

## Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

Server will start at `http://localhost:3000`

### Production Mode

Build the TypeScript code:

```bash
npm run build
```

Start the server:

```bash
npm start
```

## API Endpoints

All endpoints follow the OpenAPI specification defined in `contracts/openapi.yaml`.

### Base URL: `/api/whiskeys`

- **GET** `/api/whiskeys` - List all whiskeys with pagination and filters
  - Query params: `limit`, `offset`, `q`, `tag`, `region`, `min_abv`, `max_abv`, `sort`
- **POST** `/api/whiskeys` - Create a new whiskey
- **GET** `/api/whiskeys/:id` - Get a single whiskey by ID
- **PUT** `/api/whiskeys/:id` - Replace a whiskey (full update)
- **PATCH** `/api/whiskeys/:id` - Partially update a whiskey
- **DELETE** `/api/whiskeys/:id` - Delete a whiskey

### Health Check

- **GET** `/health` - Check API health

## Testing

### Prerequisites

Tests require a PostgreSQL database. The easiest way is to use Docker:

```bash
# Start test database
docker-compose up -d postgres-test

# Wait for database to be ready
sleep 5

# Run migrations on test database
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/whiskey_inventory_test?schema=public" npx prisma migrate deploy --schema=../prisma/schema.prisma
```

Alternatively, copy `.env.test` to `.env` and update with your test database URL.

### Running Tests

Run all tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run tests with coverage:

```bash
npm run test:coverage
```

### Clean Up

```bash
# Stop test database
docker-compose down
```

## Prisma Commands

- **Generate Client**: `npm run prisma:generate`
- **Run Migrations**: `npm run prisma:migrate`
- **Open Prisma Studio**: `npm run prisma:studio`
- **Seed Database**: `npm run prisma:seed`

## Project Structure

```
backend/
├── src/
│   ├── api/              # API routes and controllers
│   │   ├── whiskey.controller.ts
│   │   ├── whiskey.routes.ts
│   │   └── whiskey.test.ts
│   ├── db/               # Database configuration
│   │   └── prisma.ts
│   ├── middleware/       # Express middleware
│   │   ├── errorHandler.ts
│   │   └── validation.ts
│   ├── index.ts          # Express app entry point
│   └── test-setup.ts     # Test utilities
├── dist/                 # Compiled JavaScript (generated)
├── node_modules/         # Dependencies
├── .env                  # Environment variables (not committed)
├── .env.example          # Environment variables template
├── package.json          # Project metadata and scripts
├── tsconfig.json         # TypeScript configuration
└── jest.config.js        # Jest test configuration
```

## Error Handling

The API returns consistent error responses:

```json
{
  "code": "ERROR_CODE",
  "message": "Human-readable error message",
  "details": {}
}
```

Common error codes:
- `BAD_REQUEST` (400) - Invalid request parameters or body
- `NOT_FOUND` (404) - Resource not found
- `CONFLICT` (409) - Duplicate resource
- `INTERNAL_SERVER_ERROR` (500) - Unexpected server error

## Development Notes

- The API follows the contract defined in `contracts/openapi.yaml`
- Prisma schema is located at `../prisma/schema.prisma`
- All dates are returned in ISO 8601 format
- Purchase dates are stored as `YYYY-MM-DD` format
- Price is stored in cents to avoid floating-point precision issues
- Tags are stored as string arrays in PostgreSQL
