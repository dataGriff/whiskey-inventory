import { http, HttpResponse } from 'msw';
import type { WhiskeyCreate } from '../../src/generated';

const exampleList = {
  items: [
    {
      id: 'b3e1a6a6-1c6b-4c3f-90d1-3f1a6b0a1111',
      name: 'Glen Example 12',
      distillery: 'Glen Example Distillery',
      region: 'Speyside',
      age: 12,
      abv: 43,
      size_ml: 700,
      quantity: 3,
      purchaseDate: '2024-08-01',
      priceCents: 4999,
      notes: 'Light, fruity, honeyed',
      imageUrl: 'https://example.com/images/glen-example-12.jpg',
      tags: ['speyside', 'single-malt'],
      rating: 4.2,
      createdAt: '2024-08-01T12:00:00Z',
      updatedAt: '2024-08-02T09:00:00Z',
    },
  ],
  meta: { total: 1, limit: 20, offset: 0 },
};

export const handlers = [
  http.get('http://localhost:3000/api/whiskeys', () => {
    return HttpResponse.json(exampleList);
  }),

  http.get('http://localhost:3000/api/whiskeys/:id', ({ params }) => {
    const { id } = params;
    const item = exampleList.items.find((i) => i.id === id);
    if (!item) {
      return HttpResponse.json(
        { code: 'NOT_FOUND', message: 'Not found' },
        { status: 404 }
      );
    }
    return HttpResponse.json(item);
  }),

  http.post('http://localhost:3000/api/whiskeys', async ({ request }) => {
    const body = await request.json() as WhiskeyCreate;
    const newWhiskey = {
      id: crypto.randomUUID(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return HttpResponse.json(newWhiskey, { status: 201 });
  }),

  http.delete('http://localhost:3000/api/whiskeys/:id', () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
