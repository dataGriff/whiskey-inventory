import { Router } from 'express';
import * as whiskeyController from './whiskey.controller';
import { validateWhiskeyCreate, validateWhiskeyUpdate, validateUUID } from '../middleware/validation';

const router = Router();

// List all whiskeys with filters
router.get('/', whiskeyController.listWhiskeys);

// Create a new whiskey
router.post('/', validateWhiskeyCreate, whiskeyController.createWhiskey);

// Get a single whiskey by id
router.get('/:id', validateUUID, whiskeyController.getWhiskey);

// Replace a whiskey (PUT)
router.put('/:id', validateUUID, validateWhiskeyCreate, whiskeyController.replaceWhiskey);

// Partially update a whiskey (PATCH)
router.patch('/:id', validateUUID, validateWhiskeyUpdate, whiskeyController.updateWhiskey);

// Delete a whiskey
router.delete('/:id', validateUUID, whiskeyController.deleteWhiskey);

export default router;
