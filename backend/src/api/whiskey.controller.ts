import { Request, Response, NextFunction } from 'express';
import prisma from '../db/prisma';
import { ApiError } from '../middleware/errorHandler';
import { Prisma } from '@prisma/client';

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

    // Execute queries
    const [items, total] = await Promise.all([
      prisma.whiskey.findMany({
        where,
        orderBy,
        skip: offset,
        take: limit
      }),
      prisma.whiskey.count({ where })
    ]);

    // Transform dates to ISO strings for consistency with OpenAPI
    const transformedItems = items.map(item => ({
      ...item,
      purchaseDate: item.purchaseDate ? item.purchaseDate.toISOString().split('T')[0] : null,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString()
    }));

    res.json({
      items: transformedItems,
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

    const transformed = {
      ...whiskey,
      purchaseDate: whiskey.purchaseDate ? whiskey.purchaseDate.toISOString().split('T')[0] : null,
      createdAt: whiskey.createdAt.toISOString(),
      updatedAt: whiskey.updatedAt.toISOString()
    };

    res.json(transformed);
  } catch (error) {
    next(error);
  }
};

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

    const transformed = {
      ...whiskey,
      purchaseDate: whiskey.purchaseDate ? whiskey.purchaseDate.toISOString().split('T')[0] : null,
      createdAt: whiskey.createdAt.toISOString(),
      updatedAt: whiskey.updatedAt.toISOString()
    };

    res.status(201).json(transformed);
  } catch (error) {
    next(error);
  }
};

export const replaceWhiskey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Check if whiskey exists
    const existing = await prisma.whiskey.findUnique({ where: { id } });
    if (!existing) {
      throw new ApiError(404, 'NOT_FOUND', 'Whiskey not found');
    }

    // Parse purchaseDate if provided
    if (data.purchaseDate) {
      data.purchaseDate = new Date(data.purchaseDate);
    }

    const whiskey = await prisma.whiskey.update({
      where: { id },
      data
    });

    const transformed = {
      ...whiskey,
      purchaseDate: whiskey.purchaseDate ? whiskey.purchaseDate.toISOString().split('T')[0] : null,
      createdAt: whiskey.createdAt.toISOString(),
      updatedAt: whiskey.updatedAt.toISOString()
    };

    res.json(transformed);
  } catch (error) {
    next(error);
  }
};

export const updateWhiskey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Check if whiskey exists
    const existing = await prisma.whiskey.findUnique({ where: { id } });
    if (!existing) {
      throw new ApiError(404, 'NOT_FOUND', 'Whiskey not found');
    }

    // Parse purchaseDate if provided
    if (data.purchaseDate) {
      data.purchaseDate = new Date(data.purchaseDate);
    }

    const whiskey = await prisma.whiskey.update({
      where: { id },
      data
    });

    const transformed = {
      ...whiskey,
      purchaseDate: whiskey.purchaseDate ? whiskey.purchaseDate.toISOString().split('T')[0] : null,
      createdAt: whiskey.createdAt.toISOString(),
      updatedAt: whiskey.updatedAt.toISOString()
    };

    res.json(transformed);
  } catch (error) {
    next(error);
  }
};

export const deleteWhiskey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // Check if whiskey exists
    const existing = await prisma.whiskey.findUnique({ where: { id } });
    if (!existing) {
      throw new ApiError(404, 'NOT_FOUND', 'Whiskey not found');
    }

    await prisma.whiskey.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
