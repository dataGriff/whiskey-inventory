import { Request, Response } from 'express';
import {
  Whiskey,
  WhiskeyCreate,
  WhiskeyUpdate,
  WhiskeyListResponse,
  ListWhiskeysQuery,
  Error as ApiError,
} from '../types/whiskey.types';

/**
 * Stub whiskey controller
 * TODO: Replace stub implementations with actual database operations
 */

// Example stub data from OpenAPI contract
const exampleWhiskey: Whiskey = {
  id: 'b3e1a6a6-1c6b-4c3f-90d1-3f1a6b0a1111',
  name: 'Glen Example 12',
  distillery: 'Glen Example Distillery',
  region: 'Speyside',
  age: 12,
  abv: 43,
  size_ml: 700,
  quantity: 3,
  purchaseDate: '2024-08-01',
  priceCents: 4999,
  notes: 'Light, fruity, honeyed',
  imageUrl: 'https://example.com/images/glen-example-12.jpg',
  tags: ['speyside', 'single-malt'],
  rating: 4.2,
  createdAt: '2024-08-01T12:00:00Z',
  updatedAt: '2024-08-02T09:00:00Z',
};

/**
 * GET /api/whiskeys - List whiskeys
 * TODO: Implement pagination, filtering, and sorting with database
 */
export const listWhiskeys = (req: Request<{}, {}, {}, ListWhiskeysQuery>, res: Response<WhiskeyListResponse>) => {
  // TODO: Parse query parameters (limit, offset, q, tag, region, min_abv, max_abv, sort)
  // TODO: Query database with filters and pagination
  // TODO: Return paginated results

  const response: WhiskeyListResponse = {
    items: [exampleWhiskey],
    meta: {
      total: 1,
      limit: req.query.limit || 20,
      offset: req.query.offset || 0,
    },
  };

  res.status(200).json(response);
};

/**
 * POST /api/whiskeys - Create a new whiskey
 * TODO: Implement database insert with validation
 */
export const createWhiskey = (req: Request<{}, {}, WhiskeyCreate>, res: Response<Whiskey | ApiError>) => {
  // TODO: Validate request body
  // TODO: Insert into database
  // TODO: Return created resource with generated id and timestamps

  const body = req.body;
  const newWhiskey: Whiskey = {
    id: 'generated-uuid-here',
    name: body.name,
    distillery: body.distillery,
    region: body.region,
    age: body.age,
    abv: body.abv,
    size_ml: body.size_ml ?? undefined,
    quantity: body.quantity ?? undefined,
    purchaseDate: body.purchaseDate,
    priceCents: body.priceCents ?? undefined,
    notes: body.notes,
    imageUrl: body.imageUrl,
    tags: body.tags,
    rating: body.rating,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  res.status(201).json(newWhiskey);
};

/**
 * GET /api/whiskeys/:id - Get a single whiskey
 * TODO: Implement database lookup by ID
 */
export const getWhiskey = (req: Request<{ id: string }>, res: Response<Whiskey | ApiError>) => {
  // TODO: Validate UUID format
  // TODO: Query database by ID
  // TODO: Return 404 if not found

  const { id } = req.params;

  // Stub: Return example if ID matches, otherwise 404
  if (id === exampleWhiskey.id) {
    res.status(200).json(exampleWhiskey);
  } else {
    const error: ApiError = {
      code: 'NOT_FOUND',
      message: `Whiskey with id '${id}' not found`,
    };
    res.status(404).json(error);
  }
};

/**
 * PUT /api/whiskeys/:id - Replace a whiskey (full update)
 * TODO: Implement database update with validation
 */
export const replaceWhiskey = (req: Request<{ id: string }, {}, WhiskeyCreate>, res: Response<Whiskey | ApiError>) => {
  // TODO: Validate UUID format and request body
  // TODO: Check if resource exists
  // TODO: Replace entire resource in database
  // TODO: Return updated resource

  const { id } = req.params;
  const body = req.body;

  const updatedWhiskey: Whiskey = {
    id,
    name: body.name,
    distillery: body.distillery,
    region: body.region,
    age: body.age,
    abv: body.abv,
    size_ml: body.size_ml ?? undefined,
    quantity: body.quantity ?? undefined,
    purchaseDate: body.purchaseDate,
    priceCents: body.priceCents ?? undefined,
    notes: body.notes,
    imageUrl: body.imageUrl,
    tags: body.tags,
    rating: body.rating,
    createdAt: exampleWhiskey.createdAt, // Preserve original creation time
    updatedAt: new Date().toISOString(),
  };

  res.status(200).json(updatedWhiskey);
};

/**
 * PATCH /api/whiskeys/:id - Partially update a whiskey
 * TODO: Implement partial database update
 */
export const updateWhiskey = (req: Request<{ id: string }, {}, WhiskeyUpdate>, res: Response<Whiskey | ApiError>) => {
  // TODO: Validate UUID format
  // TODO: Check if resource exists
  // TODO: Merge partial updates with existing data
  // TODO: Update database
  // TODO: Return updated resource

  const { id } = req.params;

  const updatedWhiskey: Whiskey = {
    ...exampleWhiskey,
    ...req.body,
    id,
    updatedAt: new Date().toISOString(),
  };

  res.status(200).json(updatedWhiskey);
};

/**
 * DELETE /api/whiskeys/:id - Delete a whiskey
 * TODO: Implement database deletion
 */
export const deleteWhiskey = (req: Request<{ id: string }>, res: Response<void | ApiError>) => {
  // TODO: Validate UUID format
  // TODO: Check if resource exists
  // TODO: Delete from database
  // TODO: Return 204 No Content on success

  const { id } = req.params;

  // Stub: Always return 204
  res.status(204).send();
};
