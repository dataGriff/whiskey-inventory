import request from 'supertest';
import path from 'path';
import app from '../index';
import { cleanupDatabase, disconnectDatabase, prisma } from '../test-setup';
// @ts-expect-error - jest-openapi types might not be perfect
import jestOpenAPI from 'jest-openapi';

// Load OpenAPI spec for validation
const openApiPath = path.join(__dirname, '../../../contracts/openapi.yaml');
jestOpenAPI(openApiPath);

describe('Whiskey API - OpenAPI Contract Tests', () => {
  beforeEach(async () => {
    await cleanupDatabase();
  });

  afterAll(async () => {
    await cleanupDatabase();
    await disconnectDatabase();
  });

  describe('POST /api/whiskeys', () => {
    it('should satisfy OpenAPI spec when creating a whiskey', async () => {
      const newWhiskey = {
        name: 'Contract Test Whiskey',
        distillery: 'Test Distillery',
        region: 'Speyside',
        age: 12,
        abv: 43.0,
        size_ml: 700,
        quantity: 1,
        purchaseDate: '2024-08-01',
        priceCents: 4999,
        notes: 'Test notes',
        tags: ['test', 'contract'],
        rating: 4.5
      };

      const response = await request(app)
        .post('/api/whiskeys')
        .send(newWhiskey)
        .expect(201);

      // Validate response satisfies OpenAPI spec
      expect(response).toSatisfyApiSpec();
    });

    it('should return 400 error matching OpenAPI spec for invalid input', async () => {
      const response = await request(app)
        .post('/api/whiskeys')
        .send({ distillery: 'Missing Name' })
        .expect(400);

      // Validate error response satisfies OpenAPI spec
      expect(response).toSatisfyApiSpec();
    });
  });

  describe('GET /api/whiskeys', () => {
    beforeEach(async () => {
      await prisma.whiskey.create({
        data: {
          name: 'Glen Example 12',
          distillery: 'Glen Example',
          region: 'Speyside',
          age: 12,
          abv: 43,
          tags: ['speyside', 'single-malt'],
          rating: 4.2
        }
      });
    });

    it('should satisfy OpenAPI spec when listing whiskeys', async () => {
      const response = await request(app)
        .get('/api/whiskeys')
        .expect(200);

      expect(response).toSatisfyApiSpec();
      expect(response.body).toHaveProperty('items');
      expect(response.body).toHaveProperty('meta');
      expect(response.body.meta).toHaveProperty('total');
      expect(response.body.meta).toHaveProperty('limit');
      expect(response.body.meta).toHaveProperty('offset');
    });

    it('should satisfy OpenAPI spec with query parameters', async () => {
      const response = await request(app)
        .get('/api/whiskeys?limit=10&offset=0&q=glen&sort=name:asc')
        .expect(200);

      expect(response).toSatisfyApiSpec();
    });
  });

  describe('GET /api/whiskeys/:id', () => {
    let whiskeyId: string;

    beforeEach(async () => {
      const whiskey = await prisma.whiskey.create({
        data: {
          name: 'Test Whiskey',
          distillery: 'Test Distillery',
          region: 'Islay',
          abv: 46
        }
      });
      whiskeyId = whiskey.id;
    });

    it('should satisfy OpenAPI spec when getting a whiskey', async () => {
      const response = await request(app)
        .get(`/api/whiskeys/${whiskeyId}`)
        .expect(200);

      expect(response).toSatisfyApiSpec();
    });

    it('should return 404 matching OpenAPI spec for non-existent whiskey', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';
      const response = await request(app)
        .get(`/api/whiskeys/${fakeId}`)
        .expect(404);

      expect(response).toSatisfyApiSpec();
    });
  });

  describe('PUT /api/whiskeys/:id', () => {
    let whiskeyId: string;

    beforeEach(async () => {
      const whiskey = await prisma.whiskey.create({
        data: {
          name: 'Original Whiskey',
          distillery: 'Original Distillery',
          region: 'Speyside'
        }
      });
      whiskeyId = whiskey.id;
    });

    it('should satisfy OpenAPI spec when replacing a whiskey', async () => {
      const updatedWhiskey = {
        name: 'Updated Whiskey',
        distillery: 'Updated Distillery',
        region: 'Highland',
        abv: 48,
        tags: ['updated']
      };

      const response = await request(app)
        .put(`/api/whiskeys/${whiskeyId}`)
        .send(updatedWhiskey)
        .expect(200);

      expect(response).toSatisfyApiSpec();
    });
  });

  describe('PATCH /api/whiskeys/:id', () => {
    let whiskeyId: string;

    beforeEach(async () => {
      const whiskey = await prisma.whiskey.create({
        data: {
          name: 'Original Whiskey',
          distillery: 'Original Distillery',
          region: 'Speyside'
        }
      });
      whiskeyId = whiskey.id;
    });

    it('should satisfy OpenAPI spec when partially updating a whiskey', async () => {
      const updates = {
        rating: 4.7,
        notes: 'Updated notes'
      };

      const response = await request(app)
        .patch(`/api/whiskeys/${whiskeyId}`)
        .send(updates)
        .expect(200);

      expect(response).toSatisfyApiSpec();
    });
  });

  describe('DELETE /api/whiskeys/:id', () => {
    let whiskeyId: string;

    beforeEach(async () => {
      const whiskey = await prisma.whiskey.create({
        data: {
          name: 'To Be Deleted',
          distillery: 'Test Distillery',
          region: 'Islay'
        }
      });
      whiskeyId = whiskey.id;
    });

    it('should satisfy OpenAPI spec when deleting a whiskey', async () => {
      const response = await request(app)
        .delete(`/api/whiskeys/${whiskeyId}`)
        .expect(204);

      expect(response).toSatisfyApiSpec();
    });

    it('should return 404 matching OpenAPI spec when deleting non-existent whiskey', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';
      const response = await request(app)
        .delete(`/api/whiskeys/${fakeId}`)
        .expect(404);

      expect(response).toSatisfyApiSpec();
    });
  });
});
