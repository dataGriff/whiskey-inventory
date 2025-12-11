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
