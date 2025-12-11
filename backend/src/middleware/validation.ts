import { Request, Response, NextFunction } from 'express';
import { ApiError } from './errorHandler';

export const validateWhiskeyCreate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, rating, abv } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new ApiError(400, 'BAD_REQUEST', 'Field "name" is required and must be a non-empty string');
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

export const validateWhiskeyUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, rating, abv } = req.body;

  if (name !== undefined && (typeof name !== 'string' || name.trim().length === 0)) {
    throw new ApiError(400, 'BAD_REQUEST', 'Field "name" must be a non-empty string');
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
