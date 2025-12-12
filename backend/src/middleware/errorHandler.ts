import { Request, Response, NextFunction } from 'express';

/**
 * Custom API Error class for consistent error responses
 */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global error handler middleware
 * Converts various error types into consistent API error responses
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Handle custom API errors
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
      ...(err.details && { details: err.details })
    });
  }

  // Handle Prisma-specific errors
  if (err.name === 'PrismaClientKnownRequestError') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const prismaError = err as any;
    if (prismaError.code === 'P2002') {
      return res.status(409).json({
        code: 'CONFLICT',
        message: 'A whiskey with this data already exists'
      });
    }
    if (prismaError.code === 'P2025') {
      return res.status(404).json({
        code: 'NOT_FOUND',
        message: 'Whiskey not found'
      });
    }
  }

  // Log unexpected errors for debugging
  if (process.env.NODE_ENV !== 'test') {
    console.error('Unhandled error:', err);
  }
  
  // Generic error response
  return res.status(500).json({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred'
  });
};
