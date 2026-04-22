// tests/routes.test.js
const request = require('supertest');
const app     = require('../src/app');

// ── GET /api/health ──────────────────────────────────
describe('GET /api/health', () => {
  test('returns 200 with healthy status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('healthy');
  });
});

// ── POST /api/validate-url ───────────────────────────
describe('POST /api/validate-url', () => {
  test('returns valid: true for https URL', async () => {
    const res = await request(app)
      .post('/api/validate-url')
      .send({ url: 'https://github.com' });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.valid).toBe(true);
  });

  test('returns valid: false for invalid URL', async () => {
    const res = await request(app)
      .post('/api/validate-url')
      .send({ url: 'not-a-url' });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.valid).toBe(false);
  });

  test('returns 400 when url field is missing', async () => {
    const res = await request(app)
      .post('/api/validate-url')
      .send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

// ── POST /api/stats ──────────────────────────────────
describe('POST /api/stats', () => {
  test('returns correct stats for valid array', async () => {
    const res = await request(app)
      .post('/api/stats')
      .send({ numbers: [10, 20, 30] });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.average).toBe(20);
    expect(res.body.data.count).toBe(3);
  });

  test('returns 400 when numbers is not an array', async () => {
    const res = await request(app)
      .post('/api/stats')
      .send({ numbers: 'invalid' });
    expect(res.statusCode).toBe(400);
  });

  test('returns 400 for empty array', async () => {
    const res = await request(app)
      .post('/api/stats')
      .send({ numbers: [] });
    expect(res.statusCode).toBe(400);
  });

  test('returns 400 when array contains non-numbers', async () => {
    const res = await request(app)
      .post('/api/stats')
      .send({ numbers: [1, 'two', 3] });
    expect(res.statusCode).toBe(400);
  });
});

// ── 404 handler ──────────────────────────────────────
describe('Unknown routes', () => {
  test('returns 404 for unknown route', async () => {
    const res = await request(app).get('/api/doesnotexist');
    expect(res.statusCode).toBe(404);
  });
});
