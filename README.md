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
