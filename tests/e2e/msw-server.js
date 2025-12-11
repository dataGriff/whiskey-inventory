/**
 * Mock API server for E2E testing
 * This starts an Express server that implements the Whiskey API
 */

const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database for testing (reset on each server start)
let inMemoryDb = [
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

// GET /api/whiskeys - List all whiskeys
app.get('/api/whiskeys', (req, res) => {
  const response = {
    items: inMemoryDb,
    meta: { total: inMemoryDb.length, limit: 20, offset: 0 },
  };
  res.status(200).json(response);
});

// GET /api/whiskeys/:id - Get a single whiskey
app.get('/api/whiskeys/:id', (req, res) => {
  const { id } = req.params;
  const item = inMemoryDb.find((i) => i.id === id);
  
  if (!item) {
    return res.status(404).json({ code: 'NOT_FOUND', message: 'Not found' });
  }
  
  res.status(200).json(item);
});

// POST /api/whiskeys - Create a new whiskey
app.post('/api/whiskeys', (req, res) => {
  const body = req.body;
  const newWhiskey = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    ...body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  inMemoryDb.push(newWhiskey);
  res.status(201).json(newWhiskey);
});

// PUT /api/whiskeys/:id - Full replacement update
app.put('/api/whiskeys/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const index = inMemoryDb.findIndex((i) => i.id === id);
  
  if (index === -1) {
    return res.status(404).json({ code: 'NOT_FOUND', message: 'Not found' });
  }
  
  const updatedWhiskey = {
    ...body,
    id,
    createdAt: inMemoryDb[index].createdAt,
    updatedAt: new Date().toISOString(),
  };
  
  inMemoryDb[index] = updatedWhiskey;
  res.status(200).json(updatedWhiskey);
});

// PATCH /api/whiskeys/:id - Partial update
app.patch('/api/whiskeys/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const index = inMemoryDb.findIndex((i) => i.id === id);
  
  if (index === -1) {
    return res.status(404).json({ code: 'NOT_FOUND', message: 'Not found' });
  }
  
  const updatedWhiskey = {
    ...inMemoryDb[index],
    ...body,
    id,
    updatedAt: new Date().toISOString(),
  };
  
  inMemoryDb[index] = updatedWhiskey;
  res.status(200).json(updatedWhiskey);
});

// DELETE /api/whiskeys/:id - Delete a whiskey
app.delete('/api/whiskeys/:id', (req, res) => {
  const { id } = req.params;
  const index = inMemoryDb.findIndex((i) => i.id === id);
  
  if (index === -1) {
    return res.status(404).json({ code: 'NOT_FOUND', message: 'Not found' });
  }
  
  inMemoryDb.splice(index, 1);
  res.status(204).send();
});

const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Mock API server running at http://localhost:${PORT}`);
  console.log('Ready for E2E tests');
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('Shutting down server...');
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    process.exit(0);
  });
});
