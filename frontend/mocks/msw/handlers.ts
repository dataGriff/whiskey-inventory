import { rest } from 'msw';

const inMemoryDb = [
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
];

export const handlers = [
  rest.get('http://localhost:3000/api/whiskeys', (req, res, ctx) => {
    const exampleList = {
      items: inMemoryDb,
      meta: { total: inMemoryDb.length, limit: 20, offset: 0 },
    };
  rest.get('http://localhost:3000/api/whiskeys', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(exampleList));
  }),

  rest.get('http://localhost:3000/api/whiskeys/:id', (req, res, ctx) => {
    const { id } = req.params;
    const item = inMemoryDb.find((i) => i.id === id);
    if (!item) return res(ctx.status(404), ctx.json({ code: 'NOT_FOUND', message: 'Not found' }));
    return res(ctx.status(200), ctx.json(item));
  }),

  rest.post('http://localhost:3000/api/whiskeys', async (req, res, ctx) => {
    const body = await req.json();
    const newWhiskey = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
    const item = exampleList.items.find((i) => i.id === id);
    if (!item) {
      return res(
        ctx.status(404),
        ctx.json({ code: 'NOT_FOUND', message: 'Not found' })
      );
    }
    return res(ctx.status(200), ctx.json(item));
  }),

  rest.post('http://localhost:3000/api/whiskeys', (req, res, ctx) => {
    const body = req.body as any;
    const newWhiskey = {
      id: 'generated-id-' + Date.now(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    inMemoryDb.push(newWhiskey);
    return res(ctx.status(201), ctx.json(newWhiskey));
  }),

  rest.put('http://localhost:3000/api/whiskeys/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const body = await req.json();
    const index = inMemoryDb.findIndex((i) => i.id === id);
    if (index === -1) return res(ctx.status(404), ctx.json({ code: 'NOT_FOUND', message: 'Not found' }));
    
    const updatedWhiskey = {
      ...body,
      id,
      createdAt: inMemoryDb[index].createdAt,
      updatedAt: new Date().toISOString(),
    };
    inMemoryDb[index] = updatedWhiskey;
    return res(ctx.status(200), ctx.json(updatedWhiskey));
  }),

  rest.patch('http://localhost:3000/api/whiskeys/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const body = await req.json();
    const index = inMemoryDb.findIndex((i) => i.id === id);
    if (index === -1) return res(ctx.status(404), ctx.json({ code: 'NOT_FOUND', message: 'Not found' }));
    
    const updatedWhiskey = {
      ...inMemoryDb[index],
      ...body,
      id,
      updatedAt: new Date().toISOString(),
    };
    inMemoryDb[index] = updatedWhiskey;
    return res(ctx.status(200), ctx.json(updatedWhiskey));
  }),

  rest.delete('http://localhost:3000/api/whiskeys/:id', (req, res, ctx) => {
    const { id } = req.params;
    const index = inMemoryDb.findIndex((i) => i.id === id);
    if (index === -1) return res(ctx.status(404), ctx.json({ code: 'NOT_FOUND', message: 'Not found' }));
    
    inMemoryDb.splice(index, 1);
    return res(ctx.status(201), ctx.json(newWhiskey));
  }),

  rest.delete('http://localhost:3000/api/whiskeys/:id', (_req, res, ctx) => {
    return res(ctx.status(204));
  }),
];
