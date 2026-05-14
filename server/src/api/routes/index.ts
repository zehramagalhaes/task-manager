import { Router } from 'express';
import { healthRoutes } from './healthRoutes.js';
import { authRoutes } from './authRoutes.js';

/**
 * Main API router
 * Combines all API route modules
 */
const router = Router();

// Auth routes
router.use('/auth', authRoutes);

// Health routes
router.use('/health', healthRoutes);

// TODO: Add more route modules here as features are developed
// router.use('/tasks', tasksRoutes);
// router.use('/users', usersRoutes);

export const apiRoutes = router;
