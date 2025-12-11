import { rest } from 'msw';

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
  rest.get('http://localhost:3000/api/whiskeys', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(exampleList));
  }),

  rest.get('http://localhost:3000/api/whiskeys/:id', (req, res, ctx) => {
    const { id } = req.params;
    const item = exampleList.items.find((i) => i.id === id);
    if (!item) return res(ctx.status(404), ctx.json({ code: 'NOT_FOUND', message: 'Not found' }));
    return res(ctx.status(200), ctx.json(item));
  }),
];
