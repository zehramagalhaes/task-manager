import { Router, type Request, type Response } from 'express';

/**
 * Health check routes
 * Provides endpoints to verify server status
 */
const router = Router();

/**
 * GET /api/health
 * Returns server health status
 */
router.get('/', (_req: Request, res: Response): void => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

/**
 * GET /api/health/ready
 * Returns readiness status (can be used for orchestration)
 */
router.get('/ready', (_req: Request, res: Response): void => {
  res.status(200).json({
    ready: true,
    timestamp: new Date().toISOString(),
  });
});

export const healthRoutes = router;
