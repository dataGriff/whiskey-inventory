/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Whiskey = {
    id: string;
    name: string;
    distillery?: string;
    region?: string;
    age?: number | null;
    abv?: number | null;
    /**
     * Bottle size in milliliters
     */
    size_ml?: number;
    quantity?: number;
    purchaseDate?: string | null;
    /**
     * Price stored in cents to avoid floating point
     */
    priceCents?: number;
    notes?: string | null;
    imageUrl?: string | null;
    tags?: Array<string>;
    rating?: number | null;
    createdAt: string;
    updatedAt: string;
};

