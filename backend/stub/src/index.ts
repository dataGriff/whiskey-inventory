import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import whiskeyRoutes from './routes/whiskey.routes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/whiskeys', whiskeyRoutes);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'Whiskey Inventory API stub is running',
  });
});

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Whiskey Inventory API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      whiskeys: '/api/whiskeys',
    },
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    code: 'NOT_FOUND',
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🥃 Whiskey Inventory API stub listening on port ${PORT}`);
  console.log(`📍 Base URL: http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});

export default app;
