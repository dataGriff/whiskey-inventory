# Whiskey Inventory API - Backend Stub

Express + TypeScript server stub generated from the OpenAPI contract (`contracts/openapi.yaml`).

## Overview

This is a **stub implementation** providing:
- ✅ Express routes matching all operations in the OpenAPI contract
- ✅ TypeScript types for request/response bodies
- ✅ Controller methods with TODO comments for business logic
- ❌ **No database integration** (stub returns example data)
- ❌ **No validation logic** (to be implemented)
- ❌ **No authentication** (per contract)

## Prerequisites

- Node.js v18+ and npm
- Familiarity with Express and TypeScript

## Quick Start

### Installation

```bash
npm install
```

### Development Mode (with hot reload)

```bash
npm run dev
```

Server will start at `http://localhost:3000` with automatic reloading on file changes.

### Production Build

```bash
npm run build
npm start
```

## API Endpoints

Base URL: `http://localhost:3000/api`

### Whiskey Operations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/whiskeys` | List whiskeys (with pagination & filters) |
| POST | `/api/whiskeys` | Create a new whiskey |
| GET | `/api/whiskeys/:id` | Get a single whiskey by ID |
| PUT | `/api/whiskeys/:id` | Replace a whiskey (full update) |
| PATCH | `/api/whiskeys/:id` | Partially update a whiskey |
| DELETE | `/api/whiskeys/:id` | Delete a whiskey |

### Additional Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| GET | `/health` | Health check |

## Testing the Stub

### List Whiskeys

```bash
curl http://localhost:3000/api/whiskeys
```

Expected response:
```json
{
  "items": [
    {
      "id": "b3e1a6a6-1c6b-4c3f-90d1-3f1a6b0a1111",
      "name": "Glen Example 12",
      "distillery": "Glen Example Distillery",
      "region": "Speyside",
      "age": 12,
      "abv": 43,
      "size_ml": 700,
      "quantity": 3,
      "purchaseDate": "2024-08-01",
      "priceCents": 4999,
      "notes": "Light, fruity, honeyed",
      "imageUrl": "https://example.com/images/glen-example-12.jpg",
      "tags": ["speyside", "single-malt"],
      "rating": 4.2,
      "createdAt": "2024-08-01T12:00:00Z",
      "updatedAt": "2024-08-02T09:00:00Z"
    }
  ],
  "meta": {
    "total": 1,
    "limit": 20,
    "offset": 0
  }
}
```

### Get Single Whiskey

```bash
curl http://localhost:3000/api/whiskeys/b3e1a6a6-1c6b-4c3f-90d1-3f1a6b0a1111
```

### Create Whiskey

```bash
curl -X POST http://localhost:3000/api/whiskeys \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Highland Park 12",
    "distillery": "Highland Park",
    "region": "Highland",
    "age": 12,
    "abv": 40,
    "quantity": 1
  }'
```

### Update Whiskey (Partial)

```bash
curl -X PATCH http://localhost:3000/api/whiskeys/b3e1a6a6-1c6b-4c3f-90d1-3f1a6b0a1111 \
  -H "Content-Type: application/json" \
  -d '{"quantity": 5}'
```

### Delete Whiskey

```bash
curl -X DELETE http://localhost:3000/api/whiskeys/b3e1a6a6-1c6b-4c3f-90d1-3f1a6b0a1111
```

## Project Structure

```
backend/stub/
├── src/
│   ├── controllers/
│   │   └── whiskey.controller.ts   # Request handlers with TODOs
│   ├── routes/
│   │   └── whiskey.routes.ts       # Route definitions
│   ├── types/
│   │   └── whiskey.types.ts        # Generated TypeScript types
│   └── index.ts                     # App entry point
├── dist/                            # Compiled JavaScript (after build)
├── node_modules/
├── package.json
├── tsconfig.json
└── README.md
```

## Implementation Guide

### Next Steps for Backend Engineers

1. **Database Integration**
   - Choose and configure a database (PostgreSQL recommended, per `prisma/` in repo)
   - Update controllers to use database queries instead of stub data
   - See TODOs in `src/controllers/whiskey.controller.ts`

2. **Validation**
   - Add request validation middleware (e.g., `express-validator`, `joi`, `zod`)
   - Validate UUIDs, required fields, data types per OpenAPI schema
   - Return appropriate 400 Bad Request errors

3. **Error Handling**
   - Add centralized error handling middleware
   - Standardize error responses per OpenAPI `Error` schema
   - Handle database errors, validation errors, etc.

4. **Business Logic**
   - Implement pagination, filtering, sorting for `listWhiskeys`
   - Add search functionality (`q` parameter)
   - Implement tag and region filtering
   - Add ABV range filtering

5. **Testing**
   - Add unit tests for controllers
   - Add integration tests for routes
   - Consider using Supertest for API testing

## Regenerating the Stub

This stub was manually created based on `contracts/openapi.yaml`. To regenerate or update:

### Option 1: Manual Update (Current Approach)

1. Review changes in `contracts/openapi.yaml`
2. Update TypeScript types in `src/types/whiskey.types.ts`
3. Update controllers in `src/controllers/whiskey.controller.ts`
4. Update routes if new endpoints added

### Option 2: OpenAPI Generator (Automated)

You can use [OpenAPI Generator](https://openapi-generator.tech/) to auto-generate the stub:

```bash
# Install OpenAPI Generator globally
npm install -g @openapitools/openapi-generator-cli

# Generate Express server stub
openapi-generator-cli generate \
  -i ../../contracts/openapi.yaml \
  -g nodejs-express-server \
  -o ./generated

# Review and integrate generated code
```

**Note:** Auto-generated code may require customization to match this project structure.

## Environment Variables

Currently, the stub uses minimal configuration:

- `PORT` (default: 3000) - Server port

Add a `.env` file for additional configuration as needed.

## Known Limitations

- **No persistence**: Data is not saved between restarts
- **No validation**: Invalid requests may not be properly rejected
- **No authentication**: All endpoints are public (per OpenAPI contract)
- **Simple error handling**: Error responses may not fully match contract
- **No rate limiting**: Consider adding for production

## Dependencies

### Runtime
- `express` - Web framework
- `cors` - CORS middleware

### Development
- `typescript` - TypeScript compiler
- `ts-node` - TypeScript execution
- `nodemon` - Auto-reload in development
- `@types/*` - TypeScript type definitions

## Support

For issues or questions:
- Check the OpenAPI contract: `contracts/openapi.yaml`
- Review controller TODOs: `src/controllers/whiskey.controller.ts`
- See main repository README: `../../README.md`

---

**Generated from**: `contracts/openapi.yaml`  
**Contract version**: 1.0.0  
**Last updated**: 2025-12-11
