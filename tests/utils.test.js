// tests/utils.test.js
const { isValidUrl, errorResponse, successResponse, calcStats } = require('../src/utils');

// ── isValidUrl ───────────────────────────────────────
describe('isValidUrl()', () => {
  test('returns true for valid http URL', () => {
    expect(isValidUrl('http://example.com')).toBe(true);
  });

  test('returns true for valid https URL', () => {
    expect(isValidUrl('https://github.com')).toBe(true);
  });

  test('returns false for string without protocol', () => {
    expect(isValidUrl('example.com')).toBe(false);
  });

  test('returns false for empty string', () => {
    expect(isValidUrl('')).toBe(false);
  });

  test('returns false for random string', () => {
    expect(isValidUrl('not-a-url')).toBe(false);
  });
});

// ── errorResponse ────────────────────────────────────
describe('errorResponse()', () => {
  test('returns correct shape with default code', () => {
    const result = errorResponse('Something went wrong');
    expect(result).toEqual({ success: false, error: 'Something went wrong', code: 400 });
  });

  test('accepts custom error code', () => {
    const result = errorResponse('Not found', 404);
    expect(result.code).toBe(404);
  });
});

// ── successResponse ──────────────────────────────────
describe('successResponse()', () => {
  test('wraps data correctly', () => {
    const result = successResponse({ id: 1 });
    expect(result).toEqual({ success: true, data: { id: 1 } });
  });
});

// ── calcStats ────────────────────────────────────────
describe('calcStats()', () => {
  test('calculates correct stats for array', () => {
    const result = calcStats([1, 2, 3, 4, 5]);
    expect(result).toEqual({ count: 5, sum: 15, average: 3, min: 1, max: 5 });
  });

  test('returns null for empty array', () => {
    expect(calcStats([])).toBeNull();
  });

  test('returns null for non-array', () => {
    expect(calcStats('not-array')).toBeNull();
  });

  test('handles single element', () => {
    const result = calcStats([42]);
    expect(result.count).toBe(1);
    expect(result.average).toBe(42);
  });

  test('handles decimal average correctly', () => {
    const result = calcStats([1, 2]);
    expect(result.average).toBe(1.5);
  });
});
