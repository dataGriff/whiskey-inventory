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
