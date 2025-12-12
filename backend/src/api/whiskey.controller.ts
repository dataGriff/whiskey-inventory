import { Request, Response, NextFunction } from 'express';
import prisma from '../db/prisma';
import { ApiError } from '../middleware/errorHandler';
import { Prisma } from '@prisma/client';
import { transformWhiskeyForResponse, transformWhiskeysForResponse } from '../utils/transformers';

/**
 * Lists whiskeys with pagination, filtering, and sorting
 * Supports query parameters: limit, offset, q, tag, region, min_abv, max_abv, sort
 */
export const listWhiskeys = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);
    const offset = parseInt(req.query.offset as string) || 0;
    const q = req.query.q as string;
    const tag = req.query.tag as string;
    const region = req.query.region as string;
    const minAbv = req.query.min_abv ? parseFloat(req.query.min_abv as string) : undefined;
    const maxAbv = req.query.max_abv ? parseFloat(req.query.max_abv as string) : undefined;
    const sort = req.query.sort as string;

    // Build where clause
    const where: Prisma.WhiskeyWhereInput = {};

    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { distillery: { contains: q, mode: 'insensitive' } },
        { notes: { contains: q, mode: 'insensitive' } }
      ];
    }

    if (tag) {
      where.tags = { has: tag };
    }

    if (region) {
      where.region = { equals: region, mode: 'insensitive' };
    }

    if (minAbv !== undefined || maxAbv !== undefined) {
      where.abv = {};
      if (minAbv !== undefined) where.abv.gte = minAbv;
      if (maxAbv !== undefined) where.abv.lte = maxAbv;
    }

    // Build orderBy clause
    let orderBy: Prisma.WhiskeyOrderByWithRelationInput = { createdAt: 'desc' };
    if (sort) {
      const [field, direction] = sort.split(':');
      if (field && direction && ['asc', 'desc'].includes(direction.toLowerCase())) {
        orderBy = { [field]: direction.toLowerCase() as 'asc' | 'desc' };
      }
    }

    // Execute queries in parallel for better performance
    const [items, total] = await Promise.all([
      prisma.whiskey.findMany({
        where,
        orderBy,
        skip: offset,
        take: limit
      }),
      prisma.whiskey.count({ where })
    ]);

    res.json({
      items: transformWhiskeysForResponse(items),
      meta: {
        total,
        limit,
        offset
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves a single whiskey by ID
 * Returns 404 if whiskey not found
 */
export const getWhiskey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const whiskey = await prisma.whiskey.findUnique({
      where: { id }
    });

    if (!whiskey) {
      throw new ApiError(404, 'NOT_FOUND', 'Whiskey not found');
    }

    res.json(transformWhiskeyForResponse(whiskey));
  } catch (error) {
    next(error);
  }
};

/**
 * Creates a new whiskey entry
 * Returns 201 with the created resource
 */
export const createWhiskey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;

    // Parse purchaseDate if provided
    if (data.purchaseDate) {
      data.purchaseDate = new Date(data.purchaseDate);
    }

    const whiskey = await prisma.whiskey.create({
      data
    });

    res.status(201).json(transformWhiskeyForResponse(whiskey));
  } catch (error) {
    next(error);
  }
};

/**
 * Replaces an entire whiskey entry (PUT)
 * Returns 404 if whiskey not found
 */
export const replaceWhiskey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Parse purchaseDate if provided
    if (data.purchaseDate) {
      data.purchaseDate = new Date(data.purchaseDate);
    }

    // Prisma's update() will throw PrismaClientKnownRequestError with code P2025
    // if the record doesn't exist. The error handler will convert this to a 404 response.
    const whiskey = await prisma.whiskey.update({
      where: { id },
      data
    });

    res.json(transformWhiskeyForResponse(whiskey));
  } catch (error) {
    next(error);
  }
};

/**
 * Partially updates a whiskey entry (PATCH)
 * Returns 404 if whiskey not found
 */
export const updateWhiskey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Parse purchaseDate if provided
    if (data.purchaseDate) {
      data.purchaseDate = new Date(data.purchaseDate);
    }

    // Prisma's update() will throw PrismaClientKnownRequestError with code P2025
    // if the record doesn't exist. The error handler will convert this to a 404 response.
    const whiskey = await prisma.whiskey.update({
      where: { id },
      data
    });

    res.json(transformWhiskeyForResponse(whiskey));
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes a whiskey entry
 * Returns 204 on success, 404 if not found
 */
export const deleteWhiskey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // Prisma's delete() will throw PrismaClientKnownRequestError with code P2025
    // if the record doesn't exist. The error handler will convert this to a 404 response.
    await prisma.whiskey.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
