# Whiskey Inventory E2E Tests

End-to-end tests for the Whiskey Inventory API using Playwright. Tests validate the complete CRUD (Create, Read, Update, Delete) flow for whiskey resources.

## Features

- ✅ Full CRUD operation coverage
- ✅ Runs against local MSW mock server (fast, no backend required)
- ✅ Can run against preview/staging deployments
- ✅ Stable, maintainable test patterns
- ✅ Automatic server startup for local testing

## Prerequisites

- Node.js 18+ 
- npm

## Setup

1. Install dependencies:
   ```bash
   cd tests/e2e
   npm install
   ```

2. (Optional) Install Playwright browsers:
   ```bash
   npx playwright install chromium
   ```

## Running Tests

### Local Testing (MSW)

Run tests against a local MSW mock server (default):

```bash
npm run test:e2e
```

The MSW server will start automatically and mock all API endpoints.

### Preview/Staging Testing

Run tests against a deployed environment:

```bash
PREVIEW_URL=https://your-preview-url.com npm run test:e2e
```

### Additional Commands

```bash
# Run with UI mode (interactive)
npm run test:e2e:ui

# Run with headed browser (visible)
npm run test:e2e:headed

# Run with debugger
npm run test:e2e:debug
```

## Test Coverage

### CRUD Flow Test (`whiskey-crud.spec.ts`)

The main test suite validates:

1. **CREATE**: Create a new whiskey with full payload
2. **READ**: 
   - Retrieve the created whiskey by ID
   - Verify whiskey appears in list endpoint
3. **UPDATE**: 
   - PATCH: Partial update (modify specific fields)
   - PUT: Full replacement update
4. **DELETE**: Remove the whiskey and verify deletion

Additional tests:
- 404 handling for non-existent resources
- Minimal payload creation (required fields only)
- List endpoint pagination metadata

## Architecture

### Local Testing (MSW)

```
Playwright Tests → MSW Server (Node.js) → MSW Handlers (In-Memory DB)
```

When running locally:
1. Playwright config starts `msw-server.js`
2. MSW server creates an HTTP server on port 3000
3. All API requests are intercepted and handled by MSW handlers
4. Data is stored in memory during test execution

### Preview/Staging Testing

```
Playwright Tests → Real API Deployment
```

When `PREVIEW_URL` is set:
1. Playwright skips starting the local server
2. All requests go to the real deployment
3. Tests validate against actual backend behavior

## Configuration

### `playwright.config.ts`

Key configuration options:

- `baseURL`: Defaults to `http://localhost:3000`, or use `PREVIEW_URL` env var
- `webServer`: Auto-starts MSW server for local testing (disabled when `PREVIEW_URL` is set)
- `workers`: Single worker in CI, parallel in local dev
- `retries`: 2 retries in CI for stability

### `msw-server.js`

Standalone Node.js server that:
- Implements MSW handlers for all CRUD operations
- Maintains in-memory database during test runs
- Handles CORS for API requests
- Gracefully shuts down on SIGTERM

## CI Integration (Optional)

To run E2E tests in CI:

```yaml
- name: Run E2E Tests
  run: |
    cd tests/e2e
    npm install
    npx playwright install chromium
    npm run test:e2e

# Or against preview deployment:
- name: Run E2E Tests (Preview)
  env:
    PREVIEW_URL: ${{ steps.deploy.outputs.preview_url }}
  run: |
    cd tests/e2e
    npm install
    npx playwright install chromium
    npm run test:e2e
```

## Troubleshooting

### Server won't start

Ensure port 3000 is available:
```bash
lsof -i :3000
# Kill any process using the port
kill -9 <PID>
```

### MSW server issues

The server script requires MSW v1.x. If you see module errors:
```bash
npm install msw@1.3.2
```

### Browser not installed

Install Chromium browser:
```bash
npx playwright install chromium
```

## Development

### Adding New Tests

1. Add test files to `specs/` directory
2. Use `{ request }` fixture for API calls
3. Follow existing patterns for consistency

Example:
```typescript
test('my new test', async ({ request }) => {
  const response = await request.get('/api/whiskeys');
  expect(response.status()).toBe(200);
});
```

### Debugging Tests

Use debug mode to step through tests:
```bash
npm run test:e2e:debug
```

Or use Playwright Inspector:
```bash
PWDEBUG=1 npm run test:e2e
```

## Related Files

- `/frontend/mocks/msw/handlers.ts`: Original MSW handlers (browser-based)
- `/contracts/openapi.yaml`: API contract specification
- `/.github/workflows/`: CI workflow files (if configured)

## Notes

- Tests are designed to be idempotent (can run multiple times)
- Each test cleans up after itself
- MSW server uses in-memory data (reset between runs)
- Tests use realistic data matching OpenAPI schema

## Future Enhancements

- [ ] Add UI tests (if frontend is built)
- [ ] Add performance tests
- [ ] Add accessibility tests
- [ ] Expand to test error scenarios
- [ ] Add authentication tests (when implemented)
