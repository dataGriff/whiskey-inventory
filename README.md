# whiskey-inventory

Whiskey inventory API with contract-first design and E2E testing.

## Repository Structure

- **`/contracts`** - OpenAPI specification for the Whiskey API
- **`/frontend/mocks`** - MSW (Mock Service Worker) handlers for browser and testing
- **`/tests/e2e`** - Playwright E2E tests for CRUD operations
- **`/prisma`** - Database schema

## E2E Testing

End-to-end tests validate the full CRUD flow for whiskey resources.

### Run E2E Tests Locally

```bash
cd tests/e2e
npm install
npm run test:e2e
```

Tests run against a local MSW mock server (no backend required).

### Run Against Preview/Staging

```bash
PREVIEW_URL=https://your-preview-url.com npm run test:e2e
```

For more details, see [tests/e2e/README.md](tests/e2e/README.md)
