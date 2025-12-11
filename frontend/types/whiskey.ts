/**
 * Type definitions derived from OpenAPI schema
 */

export interface Whiskey {
  id: string;
  name: string;
  distillery?: string;
  region?: string;
  age?: number | null;
  abv?: number | null;
  size_ml?: number;
  quantity?: number;
  purchaseDate?: string | null;
  priceCents?: number;
  notes?: string | null;
  imageUrl?: string | null;
  tags?: string[];
  rating?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface WhiskeyCreate {
  name: string;
  distillery?: string;
  region?: string;
  age?: number | null;
  abv?: number | null;
  size_ml?: number | null;
  quantity?: number | null;
  purchaseDate?: string | null;
  priceCents?: number | null;
  notes?: string | null;
  imageUrl?: string | null;
  tags?: string[];
  rating?: number | null;
}

export interface WhiskeyUpdate {
  name?: string;
  distillery?: string;
  region?: string;
  age?: number;
  abv?: number;
  size_ml?: number;
  quantity?: number;
  purchaseDate?: string;
  priceCents?: number;
  notes?: string;
  imageUrl?: string;
  tags?: string[];
  rating?: number;
}

export interface WhiskeyListResponse {
  items: Whiskey[];
  meta: Pagination;
}

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
