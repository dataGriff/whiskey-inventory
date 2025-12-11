import { test, expect } from '@playwright/test';

/**
 * E2E tests for Whiskey CRUD operations
 * Tests the full Create → Read → Update → Delete flow
 * 
 * Can run against:
 * - Local MSW: npm run test:e2e
 * - Preview/staging: PREVIEW_URL=https://your-preview.com npm run test:e2e
 */

test.describe('Whiskey CRUD Flow', () => {
  let createdWhiskeyId: string;

  test('should complete full CRUD flow: Create → Read → Update → Delete', async ({ request }) => {
    // CREATE: Create a new whiskey
    const createPayload = {
      name: 'Test Whiskey E2E',
      distillery: 'Test Distillery',
      region: 'Highland',
      age: 15,
      abv: 45.5,
      size_ml: 750,
      quantity: 2,
      purchaseDate: '2024-12-01',
      priceCents: 5999,
      notes: 'Rich, complex, smoky',
      tags: ['highland', 'single-malt', 'test'],
      rating: 4.5,
    };

    const createResponse = await request.post('/api/whiskeys', {
      data: createPayload,
    });

    expect(createResponse.status()).toBe(201);
    const createdWhiskey = await createResponse.json();
    
    expect(createdWhiskey).toMatchObject({
      name: createPayload.name,
      distillery: createPayload.distillery,
      region: createPayload.region,
      age: createPayload.age,
      abv: createPayload.abv,
    });
    expect(createdWhiskey.id).toBeDefined();
    expect(createdWhiskey.createdAt).toBeDefined();
    expect(createdWhiskey.updatedAt).toBeDefined();
    
    createdWhiskeyId = createdWhiskey.id;
    console.log(`✓ Created whiskey with ID: ${createdWhiskeyId}`);

    // READ: Get the created whiskey by ID
    const getResponse = await request.get(`/api/whiskeys/${createdWhiskeyId}`);
    
    expect(getResponse.status()).toBe(200);
    const fetchedWhiskey = await getResponse.json();
    
    expect(fetchedWhiskey).toMatchObject({
      id: createdWhiskeyId,
      name: createPayload.name,
      distillery: createPayload.distillery,
      region: createPayload.region,
    });
    console.log(`✓ Retrieved whiskey: ${fetchedWhiskey.name}`);

    // READ: Verify whiskey appears in list
    const listResponse = await request.get('/api/whiskeys');
    
    expect(listResponse.status()).toBe(200);
    const list = await listResponse.json();
    
    expect(list.items).toBeInstanceOf(Array);
    expect(list.meta).toBeDefined();
    expect(list.meta.total).toBeGreaterThan(0);
    
    const foundInList = list.items.find((item: any) => item.id === createdWhiskeyId);
    expect(foundInList).toBeDefined();
    console.log(`✓ Found whiskey in list (total: ${list.meta.total})`);

    // UPDATE (PATCH): Partially update the whiskey
    const patchPayload = {
      quantity: 1,
      notes: 'Updated notes after tasting',
      rating: 4.7,
    };

    const patchResponse = await request.patch(`/api/whiskeys/${createdWhiskeyId}`, {
      data: patchPayload,
    });

    expect(patchResponse.status()).toBe(200);
    const patchedWhiskey = await patchResponse.json();
    
    expect(patchedWhiskey.id).toBe(createdWhiskeyId);
    expect(patchedWhiskey.quantity).toBe(patchPayload.quantity);
    expect(patchedWhiskey.notes).toBe(patchPayload.notes);
    expect(patchedWhiskey.rating).toBe(patchPayload.rating);
    expect(patchedWhiskey.name).toBe(createPayload.name); // Should remain unchanged
    console.log(`✓ Partially updated whiskey (quantity: ${patchedWhiskey.quantity})`);

    // UPDATE (PUT): Full replacement update
    const putPayload = {
      name: 'Test Whiskey E2E - Updated',
      distillery: 'Test Distillery Updated',
      region: 'Islay',
      age: 18,
      abv: 46.0,
      size_ml: 750,
      quantity: 1,
      purchaseDate: '2024-12-10',
      priceCents: 7999,
      notes: 'Completely replaced',
      tags: ['islay', 'peated'],
      rating: 5.0,
    };

    const putResponse = await request.put(`/api/whiskeys/${createdWhiskeyId}`, {
      data: putPayload,
    });

    expect(putResponse.status()).toBe(200);
    const replacedWhiskey = await putResponse.json();
    
    expect(replacedWhiskey.id).toBe(createdWhiskeyId);
    expect(replacedWhiskey.name).toBe(putPayload.name);
    expect(replacedWhiskey.distillery).toBe(putPayload.distillery);
    expect(replacedWhiskey.region).toBe(putPayload.region);
    expect(replacedWhiskey.age).toBe(putPayload.age);
    console.log(`✓ Fully replaced whiskey: ${replacedWhiskey.name}`);

    // DELETE: Remove the whiskey
    const deleteResponse = await request.delete(`/api/whiskeys/${createdWhiskeyId}`);
    
    expect(deleteResponse.status()).toBe(204);
    console.log(`✓ Deleted whiskey with ID: ${createdWhiskeyId}`);

    // Verify deletion: Should get 404
    const verifyDeleteResponse = await request.get(`/api/whiskeys/${createdWhiskeyId}`);
    
    expect(verifyDeleteResponse.status()).toBe(404);
    const errorResponse = await verifyDeleteResponse.json();
    expect(errorResponse.code).toBe('NOT_FOUND');
    console.log(`✓ Confirmed whiskey no longer exists`);
  });

  test('should handle 404 for non-existent whiskey', async ({ request }) => {
    const nonExistentId = '00000000-0000-0000-0000-000000000000';
    
    const getResponse = await request.get(`/api/whiskeys/${nonExistentId}`);
    expect(getResponse.status()).toBe(404);
    
    const errorData = await getResponse.json();
    expect(errorData.code).toBe('NOT_FOUND');
    console.log(`✓ Correctly returns 404 for non-existent whiskey`);
  });

  test('should create whiskey with minimal required fields', async ({ request }) => {
    const minimalPayload = {
      name: 'Minimal Test Whiskey',
    };

    const createResponse = await request.post('/api/whiskeys', {
      data: minimalPayload,
    });

    expect(createResponse.status()).toBe(201);
    const createdWhiskey = await createResponse.json();
    
    expect(createdWhiskey.name).toBe(minimalPayload.name);
    expect(createdWhiskey.id).toBeDefined();
    console.log(`✓ Created minimal whiskey: ${createdWhiskey.name}`);

    // Cleanup
    await request.delete(`/api/whiskeys/${createdWhiskey.id}`);
  });

  test('should list whiskeys with pagination metadata', async ({ request }) => {
    const listResponse = await request.get('/api/whiskeys');
    
    expect(listResponse.status()).toBe(200);
    const list = await listResponse.json();
    
    expect(list).toHaveProperty('items');
    expect(list).toHaveProperty('meta');
    expect(list.meta).toHaveProperty('total');
    expect(list.meta).toHaveProperty('limit');
    expect(list.meta).toHaveProperty('offset');
    
    expect(typeof list.meta.total).toBe('number');
    expect(typeof list.meta.limit).toBe('number');
    expect(typeof list.meta.offset).toBe('number');
    
    console.log(`✓ List endpoint returns proper structure (${list.meta.total} items)`);
  });
});
