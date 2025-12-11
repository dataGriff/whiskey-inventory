import { Router } from 'express';
import {
  listWhiskeys,
  createWhiskey,
  getWhiskey,
  replaceWhiskey,
  updateWhiskey,
  deleteWhiskey,
} from '../controllers/whiskey.controller';

const router = Router();

/**
 * Whiskey routes mapped from OpenAPI contract
 * Base path: /api/whiskeys
 */

// GET /api/whiskeys - List whiskeys
router.get('/', listWhiskeys);

// POST /api/whiskeys - Create a new whiskey
router.post('/', createWhiskey);

// GET /api/whiskeys/:id - Get a single whiskey
router.get('/:id', getWhiskey);

// PUT /api/whiskeys/:id - Replace a whiskey (full update)
router.put('/:id', replaceWhiskey);

// PATCH /api/whiskeys/:id - Partially update a whiskey
router.patch('/:id', updateWhiskey);

// DELETE /api/whiskeys/:id - Delete a whiskey
router.delete('/:id', deleteWhiskey);

export default router;
