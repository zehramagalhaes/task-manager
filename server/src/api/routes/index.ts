import { Router } from 'express';
import { healthRoutes } from './healthRoutes.js';

/**
 * Main API router
 * Combines all API route modules
 */
const router = Router();

// Health routes
router.use('/health', healthRoutes);

// TODO: Add more route modules here as features are developed
// router.use('/tasks', tasksRoutes);
// router.use('/users', usersRoutes);

export const apiRoutes = router;
