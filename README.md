# Whiskey Inventory

A contract-first whiskey inventory management system with OpenAPI specifications, React frontend, Node.js backend, and Docker containerization.

## Quick Start with Docker 🐳

The easiest way to run the entire application:

```bash
# Clone and navigate to the project
git clone <repository-url>
cd whiskey-inventory

# Start all services with Docker
./docker.sh

# Or manually:
docker compose up -d --build
```

After startup, access:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Database**: localhost:5432

For detailed Docker documentation, see [DOCKER.md](DOCKER.md).

## Project Structure

- **`contracts/`** - OpenAPI 3.0 specification (single source of truth)
- **`frontend/`** - React + TypeScript + Vite frontend application  
- **`backend/`** - Node.js + Express + Prisma API server
- **`prisma/`** - Database schema and migrations
- **`tests/e2e/`** - Playwright end-to-end tests
- **`infra/`** - Infrastructure configuration

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
# whiskey-inventory
Whiskey inventory

## TypeScript Client Generation

This repository includes an OpenAPI contract at `contracts/openapi.yaml` that serves as the single source of truth for the Whiskey Inventory API. You can generate a TypeScript client from this contract for use in frontend applications.

### Prerequisites

Install the OpenAPI Generator CLI globally:

```bash
npm install -g @openapitools/openapi-generator-cli
```

### Generating the Client

Run the generation script:

```bash
./scripts/generate-client.sh
```

This will:
- Validate the OpenAPI contract
- Generate a TypeScript client using the `typescript-fetch` generator
- Output the generated client to `generated/ts-client/`

### Using the Generated Client

Import and use the generated client in your TypeScript project:

```typescript
import { WhiskeysApi, Configuration } from './generated/ts-client';

// Configure the API client
const config = new Configuration({
  basePath: 'http://localhost:3000/api'
});

const api = new WhiskeysApi(config);

// Use typed methods
const whiskeys = await api.listWhiskeys({ limit: 10 });
```

The generated client provides:
- **Typed API methods** for all endpoints (listWhiskeys, createWhiskey, etc.)
- **TypeScript interfaces** for all models (Whiskey, WhiskeyCreate, WhiskeyUpdate, etc.)
- **Type-safe request/response handling**

### CI/CD

The GitHub Actions workflow automatically validates the contract and generates the client on every pull request that modifies the contract files.
# Whiskey Inventory

A contract-first whiskey inventory application with OpenAPI-driven development.

## Overview

This project follows a contract-first approach where the OpenAPI specification (`contracts/openapi.yaml`) serves as the single source of truth for:
- Backend API implementation
- Frontend client generation
- Mock service workers for testing
- API documentation

## Development Workflow

### Contract CI Pipeline

The project includes a comprehensive CI pipeline (`.github/workflows/contract-ci.yml`) that runs on every pull request touching contracts or workflows:

#### 1. **OpenAPI Linting** (`lint-contract` job)
- Uses [Spectral](https://stoplight.io/open-source/spectral) to lint the OpenAPI contract
- Validates contract structure, operations, and best practices
- Fails fast on errors (warnings allowed)
- Configuration: `.spectral.yaml`

#### 2. **Client Generation** (`generate-client` job)
- Generates TypeScript client from OpenAPI spec
- Validates YAML structure
- Verifies generated files exist and compile
- Uploads generated client as artifact for downstream jobs
- Uses `@openapitools/openapi-generator-cli` v2.13.4

#### 3. **Frontend Build** (`build-frontend` job)
- **Conditional**: Only runs if `frontend/package.json` exists
- Downloads generated TypeScript client
- Installs dependencies and builds frontend
- Runs unit tests
- Uploads build artifacts

#### 4. **PR Comment** (`preview-comment` job)
- Posts CI results summary to pull request
- Shows status of all validation steps
- Helps reviewers quickly assess contract changes

### Running Locally

#### Lint OpenAPI Contract
```bash
npm install -g @stoplight/spectral-cli@6.11.0
spectral lint contracts/openapi.yaml --fail-severity=error
```

#### Generate TypeScript Client
```bash
npm install -g @openapitools/openapi-generator-cli@2.13.4
openapi-generator-cli generate -i contracts/openapi.yaml -g typescript-fetch -o generated/ts-client
```

#### Build Frontend (when available)
```bash
cd frontend
npm install
npm run build
npm test
```

## Preview Deployments

The project is configured for preview deployments on [Netlify](https://www.netlify.com/):

- Configuration: `netlify.toml`
- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `dist`

Preview URLs are automatically generated for pull requests.

## Project Structure

```
.
├── contracts/          # OpenAPI specifications
│   └── openapi.yaml   # Main API contract
├── frontend/          # Frontend application (when scaffolded)
│   └── mocks/         # MSW mock handlers
├── .github/
│   └── workflows/
│       └── contract-ci.yml  # CI pipeline
├── .spectral.yaml     # OpenAPI linting rules
└── netlify.toml       # Netlify deployment config
```

## Contributing

1. Make changes to `contracts/openapi.yaml`
2. Open a pull request
3. CI will automatically:
   - Lint your contract changes
   - Generate and validate TypeScript client
   - Build and test frontend (if applicable)
   - Comment on PR with results
4. Review the CI feedback and iterate as needed

## CI/CD Features

✅ **Contract Validation**: Spectral linting ensures OpenAPI quality  
✅ **Type Safety**: Generated TypeScript client validated for compilation  
✅ **Fail Fast**: Linting errors block PRs immediately  
✅ **Artifact Upload**: Generated clients and builds preserved  
✅ **Matrix-Ready**: Job structure allows easy parallelization  
✅ **Preview Deployments**: Netlify integration for PR previews
