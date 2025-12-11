# whiskey-inventory
Whiskey inventory

## API Documentation

The API contract is defined using OpenAPI 3.0.3 specification in `contracts/openapi.yaml`.

### Viewing API Docs Locally

You can view the interactive API documentation locally using Redoc:

```bash
npx redoc-cli serve contracts/openapi.yaml
```

This will start a local server (typically at http://localhost:8080) with a beautifully rendered API documentation interface.

Alternatively, you can use Swagger UI:

```bash
npx swagger-ui-watcher contracts/openapi.yaml
```

### Publishing API Docs

#### Option 1: GitHub Pages (Recommended)

To publish the API docs to GitHub Pages:

1. Generate static HTML documentation:
   ```bash
   npx redoc-cli build contracts/openapi.yaml -o docs/index.html
   ```

2. Commit the generated `docs/index.html` file

3. Enable GitHub Pages in your repository settings:
   - Go to Settings → Pages
   - Set Source to "Deploy from a branch"
   - Select the branch (e.g., `main`) and `/docs` folder
   - Save

4. Your API docs will be available at: `https://<username>.github.io/<repository>/`

#### Option 2: Direct Link to Contract

You can also link directly to the OpenAPI YAML file and view it through external renderers:
- Swagger Editor: `https://editor.swagger.io/?url=https://raw.githubusercontent.com/<username>/<repository>/main/contracts/openapi.yaml`
- Redocly: `https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/<username>/<repository>/main/contracts/openapi.yaml`

### Contract Changes

All changes to the API contract are tracked in [CONTRACTS_CHANGELOG.md](./CONTRACTS_CHANGELOG.md).

When making changes to `contracts/openapi.yaml`, please:
1. Update the `version` field in the OpenAPI spec
2. Document the changes in `CONTRACTS_CHANGELOG.md` following the existing format
3. Regenerate published documentation if using GitHub Pages
