/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Whiskey } from '../models/Whiskey';
import type { WhiskeyCreate } from '../models/WhiskeyCreate';
import type { WhiskeyListResponse } from '../models/WhiskeyListResponse';
import type { WhiskeyUpdate } from '../models/WhiskeyUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WhiskeysService {
    /**
     * List whiskeys
     * Returns a paginated list of whiskeys. Supports basic filtering, searching and sorting.
     * @param limit Maximum number of items to return
     * @param offset Offset for pagination
     * @param q Fulltext search across name, distillery and notes
     * @param tag Filter by tag (single). Multiple allowed by repeating the parameter.
     * @param region Filter by region
     * @param minAbv Minimum ABV filter (inclusive)
     * @param maxAbv Maximum ABV filter (inclusive)
     * @param sort Sort expression, e.g. "name:asc" or "age:desc"
     * @returns WhiskeyListResponse A paginated list of whiskeys
     * @throws ApiError
     */
    public static listWhiskeys(
        limit: number = 20,
        offset?: number,
        q?: string,
        tag?: string,
        region?: string,
        minAbv?: number,
        maxAbv?: number,
        sort?: string,
    ): CancelablePromise<WhiskeyListResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/whiskeys',
            query: {
                'limit': limit,
                'offset': offset,
                'q': q,
                'tag': tag,
                'region': region,
                'min_abv': minAbv,
                'max_abv': maxAbv,
                'sort': sort,
            },
            errors: {
                400: `Invalid request parameters or body`,
            },
        });
    }
    /**
     * Create a new whiskey
     * @param requestBody
     * @returns Whiskey Created whiskey resource
     * @throws ApiError
     */
    public static createWhiskey(
        requestBody: WhiskeyCreate,
    ): CancelablePromise<Whiskey> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/whiskeys',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request parameters or body`,
                409: `Conflict (e.g., duplicate)`,
            },
        });
    }
    /**
     * Get a single whiskey
     * @param id Whiskey resource id (UUID)
     * @returns Whiskey Whiskey found
     * @throws ApiError
     */
    public static getWhiskey(
        id: string,
    ): CancelablePromise<Whiskey> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/whiskeys/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Resource not found`,
            },
        });
    }
    /**
     * Replace a whiskey (full update)
     * @param id Whiskey resource id (UUID)
     * @param requestBody
     * @returns Whiskey Updated whiskey resource
     * @throws ApiError
     */
    public static replaceWhiskey(
        id: string,
        requestBody: WhiskeyCreate,
    ): CancelablePromise<Whiskey> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/whiskeys/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request parameters or body`,
                404: `Resource not found`,
            },
        });
    }
    /**
     * Partially update a whiskey
     * @param id Whiskey resource id (UUID)
     * @param requestBody
     * @returns Whiskey Updated whiskey resource
     * @throws ApiError
     */
    public static updateWhiskey(
        id: string,
        requestBody: WhiskeyUpdate,
    ): CancelablePromise<Whiskey> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/whiskeys/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid request parameters or body`,
                404: `Resource not found`,
            },
        });
    }
    /**
     * Delete a whiskey
     * @param id Whiskey resource id (UUID)
     * @returns void
     * @throws ApiError
     */
    public static deleteWhiskey(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/whiskeys/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Resource not found`,
            },
        });
    }
}
