# Whiskey Inventory Frontend

A React + TypeScript + Vite frontend application for managing a whiskey inventory, with generated TypeScript API client and MSW (Mock Service Worker) integration for development.

## Features

- **React 19** with TypeScript for type-safe UI development
- **Vite** for fast development and optimized builds
- **React Router** for client-side routing
- **Generated API Client** from OpenAPI specification for type-safe API calls
- **MSW (Mock Service Worker)** for API mocking in development mode
- **Pages**: List whiskeys, view details, create new entries

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
cd frontend
npm install
```

### Generate API Client

Generate the TypeScript API client from the OpenAPI specification:

```bash
npm run codegen
```

This will generate the API client in `src/generated/` based on the OpenAPI spec at `../contracts/openapi.yaml`.

**Note:** Run this command whenever the OpenAPI specification is updated to keep the client in sync.

### Development

Start the development server with MSW enabled:

```bash
npm run dev
```

The app will be available at http://localhost:5173

**MSW Integration:** In development mode, MSW automatically intercepts API calls and returns mock data. Check the browser console to see MSW logs showing intercepted requests.

### Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production (compiles TypeScript and bundles assets)
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint on the codebase
- `npm run test` - Run tests (placeholder for now)
- `npm run codegen` - Generate TypeScript API client from OpenAPI spec

## Project Structure

```
frontend/
├── src/
│   ├── pages/           # Page components (List, Detail, Create)
│   ├── generated/       # Generated API client (do not edit manually)
│   ├── App.tsx          # Main app with routing
│   └── main.tsx         # Entry point with MSW initialization
├── mocks/
│   └── msw/
│       ├── browser.ts   # MSW worker setup
│       └── handlers.ts  # API mock handlers
├── public/
│   └── mockServiceWorker.js  # MSW service worker
└── package.json
```

## Pages

- `/whiskeys` - List all whiskeys with mock data
- `/whiskeys/new` - Create a new whiskey entry
- `/whiskeys/:id` - View whiskey details

## API Client Usage

The generated API client provides type-safe methods for all API endpoints:

```typescript
import { WhiskeysService } from './generated';
import type { Whiskey, WhiskeyCreate } from './generated';

// List whiskeys
const response = await WhiskeysService.listWhiskeys();
const whiskeys: Whiskey[] = response.items || [];

// Get a single whiskey
const whiskey: Whiskey = await WhiskeysService.getWhiskey(id);

// Create a whiskey
const newWhiskey: Whiskey = await WhiskeysService.createWhiskey(data);
```

## MSW Mock Handlers

Mock handlers are defined in `mocks/msw/handlers.ts`. They intercept API calls in development and return predefined mock data. Add or modify handlers as needed for your development workflow.

## Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory. MSW is only active in development mode and won't be included in production builds.

## TypeScript Configuration

- `tsconfig.json` - Base TypeScript configuration
- `tsconfig.app.json` - Configuration for app source code
- `tsconfig.node.json` - Configuration for Node.js scripts (Vite config, etc.)
