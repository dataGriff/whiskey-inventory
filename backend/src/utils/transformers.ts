import { Whiskey } from '@prisma/client';

/**
 * Transforms a Prisma Whiskey object to match the OpenAPI schema format
 * Converts Date objects to ISO strings as required by the API contract
 */
export const transformWhiskeyForResponse = (whiskey: Whiskey) => {
  return {
    ...whiskey,
    purchaseDate: whiskey.purchaseDate 
      ? whiskey.purchaseDate.toISOString().split('T')[0] 
      : null,
    createdAt: whiskey.createdAt.toISOString(),
    updatedAt: whiskey.updatedAt.toISOString()
  };
};

/**
 * Transforms an array of Prisma Whiskey objects for API responses
 */
export const transformWhiskeysForResponse = (whiskeys: Whiskey[]) => {
  return whiskeys.map(transformWhiskeyForResponse);
};
