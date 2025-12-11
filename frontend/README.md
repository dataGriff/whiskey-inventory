# Whiskey Inventory Frontend Components

A lightweight, framework-agnostic UI components library for the Whiskey Inventory application, with comprehensive Storybook documentation.

## 🚀 Quick Start

```bash
cd frontend
npm install
npm run storybook
```

Visit [http://localhost:6006](http://localhost:6006) to view the component library.

## 📦 Components

### Core UI Components

- **Button** - Accessible button component with variants (primary, secondary, danger) and sizes
- **Input** - Form input component with validation, labels, and error states
- **Table** - Data table component with loading and empty states
- **Modal** - Dialog component with keyboard navigation (ESC to close)
- **Toaster** - Toast notification system with multiple types (success, error, warning, info)

### Whiskey-Specific Components

- **WhiskeyListItem** - Table row component for displaying whiskey data
- **WhiskeyForm** - Form component for creating/editing whiskey entries with validation
- **WhiskeyList** - Complete list view combining Table and WhiskeyListItem

## 🎨 Storybook Stories

All components include comprehensive stories demonstrating:

- ✅ **Empty states** - No data scenarios
- ✅ **Loading states** - Async data loading
- ✅ **Filled states** - Components with data
- ✅ **Error states** - Validation and error handling
- ✅ **Interactive states** - User interactions and events

## 🔧 TypeScript Support

All components are fully typed with TypeScript interfaces exported from:

```typescript
import { Button, Input, Table, Modal, Toaster } from './components';
import type { ButtonProps, InputProps, TableProps } from './components';
```

## ♿ Accessibility

Components follow accessibility best practices:

- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Semantic HTML elements

## 📁 Project Structure

```
frontend/
├── components/          # React components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Table.tsx
│   ├── Modal.tsx
│   ├── Toaster.tsx
│   ├── WhiskeyListItem.tsx
│   ├── WhiskeyForm.tsx
│   └── index.ts
├── stories/            # Storybook stories
│   ├── Button.stories.tsx
│   ├── Input.stories.tsx
│   ├── Table.stories.tsx
│   ├── Modal.stories.tsx
│   ├── Toaster.stories.tsx
│   ├── WhiskeyListItem.stories.tsx
│   ├── WhiskeyForm.stories.tsx
│   └── WhiskeyList.stories.tsx
├── types/              # TypeScript type definitions
│   └── whiskey.ts
├── mocks/              # MSW mock handlers
│   └── msw/
├── .storybook/         # Storybook configuration
│   ├── main.ts
│   └── preview.ts
└── package.json
```

## 🧪 Scripts

```bash
# Start Storybook development server
npm run storybook

# Build Storybook for production
npm run build-storybook

# Type checking
npm run typecheck
```

## 🎯 Design Philosophy

- **Framework-agnostic** - Components use minimal external dependencies
- **Typed** - Full TypeScript support with exported interfaces
- **Accessible** - ARIA attributes and keyboard navigation
- **Documented** - Comprehensive Storybook stories for all states
- **Minimal styling** - Inline styles to avoid CSS conflicts

## 🔗 Integration

These components are designed to be integrated into any React application:

```tsx
import { WhiskeyForm } from '@whiskey-inventory/frontend/components';
import type { WhiskeyCreate } from '@whiskey-inventory/frontend/types/whiskey';

function App() {
  const handleSubmit = (data: WhiskeyCreate) => {
    console.log('Submitted:', data);
  };

  return <WhiskeyForm onSubmit={handleSubmit} />;
}
```

## 📝 Type Definitions

The `types/whiskey.ts` module provides TypeScript interfaces derived from the OpenAPI schema:

- `Whiskey` - Complete whiskey resource
- `WhiskeyCreate` - Create whiskey payload
- `WhiskeyUpdate` - Update whiskey payload
- `WhiskeyListResponse` - Paginated list response
- `ApiError` - Error response structure

## 🤝 Contributing

When adding new components:

1. Create the component in `components/` with TypeScript
2. Export it from `components/index.ts`
3. Add comprehensive stories in `stories/`
4. Include error, empty, loading, and filled state stories
5. Ensure accessibility with ARIA attributes
6. Run `npm run typecheck` to verify types

## 📄 License

Part of the Whiskey Inventory project.
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
