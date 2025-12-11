# Whiskey Inventory

A contract-first whiskey inventory management system with OpenAPI specifications, frontend React application, and MSW mocking.

## Project Structure

- **`contracts/`** - OpenAPI 3.0 specification for the Whiskey Inventory API
- **`frontend/`** - React + TypeScript + Vite frontend application with generated API client
- **`prisma/`** - Database schema (if applicable)

## Quick Start

### Frontend Development

```bash
cd frontend
npm install
npm run codegen  # Generate API client from OpenAPI spec
npm run dev      # Start development server with MSW mocks
```

The frontend will be available at http://localhost:5173 with MSW intercepting API calls and returning mock data.

See [frontend/README.md](frontend/README.md) for detailed documentation.

## OpenAPI Contract

The API contract is defined in `contracts/openapi.yaml` and serves as the single source of truth for:
- Frontend API client generation
- Backend implementation contracts
- API documentation
- MSW mock handlers

## Features

- **Contract-First Development**: OpenAPI spec drives both frontend and backend
- **Type-Safe API Client**: Generated TypeScript client from OpenAPI spec
- **Mock Service Worker**: Development mode with realistic API mocking
- **React Frontend**: Modern React 19 with TypeScript and Vite
- **CRUD Operations**: List, view, create, update, and delete whiskey entries
