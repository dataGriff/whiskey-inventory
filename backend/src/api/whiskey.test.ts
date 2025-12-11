import request from 'supertest';
import app from '../index';
import { cleanupDatabase, disconnectDatabase, prisma } from '../test-setup';

describe('Whiskey API', () => {
  beforeEach(async () => {
    await cleanupDatabase();
  });

  afterAll(async () => {
    await cleanupDatabase();
    await disconnectDatabase();
  });

  describe('POST /api/whiskeys', () => {
    it('should create a new whiskey', async () => {
      const newWhiskey = {
        name: 'Test Whiskey',
        distillery: 'Test Distillery',
        region: 'Speyside',
        age: 12,
        abv: 43.0,
        size_ml: 700,
        quantity: 1,
        purchaseDate: '2024-08-01',
        priceCents: 4999,
        notes: 'Test notes',
        tags: ['test', 'single-malt'],
        rating: 4.5
      };

      const response = await request(app)
        .post('/api/whiskeys')
        .send(newWhiskey)
        .expect(201);

      expect(response.body).toMatchObject({
        name: newWhiskey.name,
        distillery: newWhiskey.distillery,
        region: newWhiskey.region,
        age: newWhiskey.age,
        abv: newWhiskey.abv,
        size_ml: newWhiskey.size_ml,
        quantity: newWhiskey.quantity,
        purchaseDate: newWhiskey.purchaseDate,
        priceCents: newWhiskey.priceCents,
        notes: newWhiskey.notes,
        tags: newWhiskey.tags,
        rating: newWhiskey.rating
      });
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('should return 400 if name is missing', async () => {
      const response = await request(app)
        .post('/api/whiskeys')
        .send({ distillery: 'Test Distillery' })
        .expect(400);

      expect(response.body).toHaveProperty('code', 'BAD_REQUEST');
      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 if rating is out of range', async () => {
      const response = await request(app)
        .post('/api/whiskeys')
        .send({ name: 'Test', rating: 6 })
        .expect(400);

      expect(response.body).toHaveProperty('code', 'BAD_REQUEST');
    });
  });

  describe('GET /api/whiskeys', () => {
    beforeEach(async () => {
      await prisma.whiskey.createMany({
        data: [
          {
            name: 'Glen Example 12',
            distillery: 'Glen Example',
            region: 'Speyside',
            age: 12,
            abv: 43,
            tags: ['speyside', 'single-malt'],
            rating: 4.2
          },
          {
            name: 'Lag 16',
            distillery: 'Lag Example',
            region: 'Islay',
            age: 16,
            abv: 46,
            tags: ['islay', 'peat'],
            rating: 4.5
          },
          {
            name: 'Highland Park 18',
            distillery: 'Highland Park',
            region: 'Highland',
            age: 18,
            abv: 43,
            tags: ['highland'],
            rating: 4.7
          }
        ]
      });
    });

    it('should list all whiskeys', async () => {
      const response = await request(app)
        .get('/api/whiskeys')
        .expect(200);

      expect(response.body).toHaveProperty('items');
      expect(response.body).toHaveProperty('meta');
      expect(response.body.items).toHaveLength(3);
      expect(response.body.meta).toMatchObject({
        total: 3,
        limit: 20,
        offset: 0
      });
    });

    it('should support pagination', async () => {
      const response = await request(app)
        .get('/api/whiskeys?limit=2&offset=1')
        .expect(200);

      expect(response.body.items).toHaveLength(2);
      expect(response.body.meta).toMatchObject({
        total: 3,
        limit: 2,
        offset: 1
      });
    });

    it('should support search', async () => {
      const response = await request(app)
        .get('/api/whiskeys?q=Glen')
        .expect(200);

      expect(response.body.items).toHaveLength(1);
      expect(response.body.items[0].name).toBe('Glen Example 12');
    });

    it('should filter by region', async () => {
      const response = await request(app)
        .get('/api/whiskeys?region=Islay')
        .expect(200);

      expect(response.body.items).toHaveLength(1);
      expect(response.body.items[0].region).toBe('Islay');
    });

    it('should filter by tag', async () => {
      const response = await request(app)
        .get('/api/whiskeys?tag=peat')
        .expect(200);

      expect(response.body.items).toHaveLength(1);
      expect(response.body.items[0].name).toBe('Lag 16');
    });

    it('should filter by ABV range', async () => {
      const response = await request(app)
        .get('/api/whiskeys?min_abv=44&max_abv=50')
        .expect(200);

      expect(response.body.items).toHaveLength(1);
      expect(response.body.items[0].abv).toBe(46);
    });

    it('should support sorting', async () => {
      const response = await request(app)
        .get('/api/whiskeys?sort=age:desc')
        .expect(200);

      expect(response.body.items[0].age).toBe(18);
      expect(response.body.items[2].age).toBe(12);
    });
  });

  describe('GET /api/whiskeys/:id', () => {
    let whiskeyId: string;

    beforeEach(async () => {
      const whiskey = await prisma.whiskey.create({
        data: {
          name: 'Test Whiskey',
          distillery: 'Test Distillery'
        }
      });
      whiskeyId = whiskey.id;
    });

    it('should get a single whiskey', async () => {
      const response = await request(app)
        .get(`/api/whiskeys/${whiskeyId}`)
        .expect(200);

      expect(response.body).toMatchObject({
        id: whiskeyId,
        name: 'Test Whiskey',
        distillery: 'Test Distillery'
      });
    });

    it('should return 404 for non-existent whiskey', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';
      const response = await request(app)
        .get(`/api/whiskeys/${fakeId}`)
        .expect(404);

      expect(response.body).toHaveProperty('code', 'NOT_FOUND');
    });

    it('should return 400 for invalid UUID', async () => {
      const response = await request(app)
        .get('/api/whiskeys/invalid-id')
        .expect(400);

      expect(response.body).toHaveProperty('code', 'BAD_REQUEST');
    });
  });

  describe('PUT /api/whiskeys/:id', () => {
    let whiskeyId: string;

    beforeEach(async () => {
      const whiskey = await prisma.whiskey.create({
        data: {
          name: 'Old Name',
          distillery: 'Old Distillery',
          quantity: 1
        }
      });
      whiskeyId = whiskey.id;
    });

    it('should replace a whiskey', async () => {
      const updatedData = {
        name: 'New Name',
        distillery: 'New Distillery',
        region: 'Speyside',
        age: 15,
        quantity: 2
      };

      const response = await request(app)
        .put(`/api/whiskeys/${whiskeyId}`)
        .send(updatedData)
        .expect(200);

      expect(response.body).toMatchObject(updatedData);
    });

    it('should return 404 for non-existent whiskey', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';
      const response = await request(app)
        .put(`/api/whiskeys/${fakeId}`)
        .send({ name: 'Test' })
        .expect(404);

      expect(response.body).toHaveProperty('code', 'NOT_FOUND');
    });
  });

  describe('PATCH /api/whiskeys/:id', () => {
    let whiskeyId: string;

    beforeEach(async () => {
      const whiskey = await prisma.whiskey.create({
        data: {
          name: 'Original Name',
          distillery: 'Original Distillery',
          quantity: 1
        }
      });
      whiskeyId = whiskey.id;
    });

    it('should partially update a whiskey', async () => {
      const partialUpdate = { quantity: 5 };

      const response = await request(app)
        .patch(`/api/whiskeys/${whiskeyId}`)
        .send(partialUpdate)
        .expect(200);

      expect(response.body).toMatchObject({
        name: 'Original Name',
        distillery: 'Original Distillery',
        quantity: 5
      });
    });

    it('should return 404 for non-existent whiskey', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';
      const response = await request(app)
        .patch(`/api/whiskeys/${fakeId}`)
        .send({ quantity: 5 })
        .expect(404);

      expect(response.body).toHaveProperty('code', 'NOT_FOUND');
    });
  });

  describe('DELETE /api/whiskeys/:id', () => {
    let whiskeyId: string;

    beforeEach(async () => {
      const whiskey = await prisma.whiskey.create({
        data: {
          name: 'To Delete',
          distillery: 'Test'
        }
      });
      whiskeyId = whiskey.id;
    });

    it('should delete a whiskey', async () => {
      await request(app)
        .delete(`/api/whiskeys/${whiskeyId}`)
        .expect(204);

      const deleted = await prisma.whiskey.findUnique({
        where: { id: whiskeyId }
      });
      expect(deleted).toBeNull();
    });

    it('should return 404 for non-existent whiskey', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';
      const response = await request(app)
        .delete(`/api/whiskeys/${fakeId}`)
        .expect(404);

      expect(response.body).toHaveProperty('code', 'NOT_FOUND');
    });
  });
});
