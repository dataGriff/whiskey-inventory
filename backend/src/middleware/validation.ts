import { Request, Response, NextFunction } from 'express';
import { ApiError } from './errorHandler';

/**
 * Sanitizes string input by trimming whitespace
 */
const sanitizeString = (value: string): string => {
  return value.trim();
};

/**
 * Validates and sanitizes input for creating a new whiskey
 */
export const validateWhiskeyCreate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, rating, abv } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new ApiError(400, 'BAD_REQUEST', 'Field "name" is required and must be a non-empty string');
  }

  // Sanitize string fields
  if (typeof name === 'string') {
    req.body.name = sanitizeString(name);
  }
  if (req.body.distillery && typeof req.body.distillery === 'string') {
    req.body.distillery = sanitizeString(req.body.distillery);
  }
  if (req.body.region && typeof req.body.region === 'string') {
    req.body.region = sanitizeString(req.body.region);
  }
  if (req.body.notes && typeof req.body.notes === 'string') {
    req.body.notes = sanitizeString(req.body.notes);
  }

  if (rating !== undefined && rating !== null) {
    if (typeof rating !== 'number' || rating < 0 || rating > 5) {
      throw new ApiError(400, 'BAD_REQUEST', 'Field "rating" must be a number between 0 and 5');
    }
  }

  if (abv !== undefined && abv !== null) {
    if (typeof abv !== 'number' || abv < 0 || abv > 100) {
      throw new ApiError(400, 'BAD_REQUEST', 'Field "abv" must be a number between 0 and 100');
    }
  }

  next();
};

/**
 * Validates and sanitizes input for partial whiskey updates
 */
export const validateWhiskeyUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, rating, abv } = req.body;

  if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
    throw new ApiError(400, 'BAD_REQUEST', 'Field "name" must be a non-empty string');
  }

  // Sanitize string fields if provided
  if (name && typeof name === 'string') {
    req.body.name = sanitizeString(name);
  }
  if (req.body.distillery && typeof req.body.distillery === 'string') {
    req.body.distillery = sanitizeString(req.body.distillery);
  }
  if (req.body.region && typeof req.body.region === 'string') {
    req.body.region = sanitizeString(req.body.region);
  }
  if (req.body.notes && typeof req.body.notes === 'string') {
    req.body.notes = sanitizeString(req.body.notes);
  }

  if (rating !== undefined && rating !== null) {
    if (typeof rating !== 'number' || rating < 0 || rating > 5) {
      throw new ApiError(400, 'BAD_REQUEST', 'Field "rating" must be a number between 0 and 5');
    }
  }

  if (abv !== undefined && abv !== null) {
    if (typeof abv !== 'number' || abv < 0 || abv > 100) {
      throw new ApiError(400, 'BAD_REQUEST', 'Field "abv" must be a number between 0 and 100');
    }
  }

  next();
};

/**
 * Validates that the id parameter is a valid UUID v4
 */
export const validateUUID = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  
  if (!uuidRegex.test(id)) {
    throw new ApiError(400, 'BAD_REQUEST', 'Invalid UUID format for id parameter');
  }

  next();
};
