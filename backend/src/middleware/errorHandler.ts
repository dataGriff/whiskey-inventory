import { Request, Response, NextFunction } from 'express';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
      ...(err.details && { details: err.details })
    });
  }

  // Handle Prisma errors
  if (err.name === 'PrismaClientKnownRequestError') {
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

  // Generic error
  console.error('Unhandled error:', err);
  return res.status(500).json({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred'
  });
};
