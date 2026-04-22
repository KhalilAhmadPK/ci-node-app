import express from 'express';
import { isValidUrl, errorResponse, successResponse, calcStats } from './utils.js';

const router = express.Router();

// GET /api/health
router.get('/health', (req, res) => {
  res.status(200).json(successResponse({
    status: 'healthy',
    version: process.env.npm_package_version || '1.0.0',
    uptime: `${Math.floor(process.uptime())}s`,
  }));
});

// POST /api/validate-url
router.post('/validate-url', (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json(errorResponse('url field is required'));
  }

  const valid = isValidUrl(url);
  res.status(200).json(successResponse({ url, valid }));
});

// POST /api/stats
router.post('/stats', (req, res) => {
  const { numbers } = req.body;

  if (!Array.isArray(numbers)) {
    return res.status(400).json(errorResponse('numbers must be an array'));
  }
  if (numbers.length === 0) {
    return res.status(400).json(errorResponse('numbers array cannot be empty'));
  }
  if (!numbers.every(n => typeof n === 'number')) {
    return res.status(400).json(errorResponse('all elements must be numbers'));
  }

  res.status(200).json(successResponse(calcStats(numbers)));
});

// 404 handler
router.use((req, res) => {
  res.status(404).json(errorResponse('Route not found', 404));
});

export default router;
