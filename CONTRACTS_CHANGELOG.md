# Contracts Changelog

This document tracks changes to the API contract defined in `contracts/openapi.yaml`.

All notable changes to the Whiskey Inventory API contract will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-08-01

### Added
- Initial OpenAPI 3.0.3 specification for Whiskey Inventory API
- **GET /whiskeys** - List whiskeys with pagination, filtering, and search
  - Query parameters: limit, offset, q (search), tag, region, min_abv, max_abv, sort
  - Returns paginated list with metadata
- **POST /whiskeys** - Create a new whiskey
  - Required field: name
  - Optional fields: distillery, region, age, abv, size_ml, quantity, purchaseDate, priceCents, notes, imageUrl, tags, rating
- **GET /whiskeys/{id}** - Get a single whiskey by UUID
- **PUT /whiskeys/{id}** - Replace a whiskey (full update)
- **PATCH /whiskeys/{id}** - Partially update a whiskey
- **DELETE /whiskeys/{id}** - Delete a whiskey
- Standard error responses (400, 404, 409)
- Whiskey schema with comprehensive fields:
  - Core: id, name, createdAt, updatedAt
  - Details: distillery, region, age, abv, size_ml, quantity
  - Purchase: purchaseDate, priceCents
  - User data: notes, imageUrl, tags, rating (0-5)

### Notes
- No authentication required for MVP
- Server URL: http://localhost:3000/api
- Price stored in cents to avoid floating-point precision issues
- Rating scale: 0-5 with decimal precision
