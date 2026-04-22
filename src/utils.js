export function isValidUrl(str) {
  try {
    const url = new URL(str);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function errorResponse(message, code = 400) {
  return { success: false, error: message, code };
}

export function successResponse(data) {
  return { success: true, data };
}

export function calcStats(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return null;
  }
  const sum = numbers.reduce((a, b) => a + b, 0);
  return {
    count: numbers.length,
    sum,
    average: parseFloat((sum / numbers.length).toFixed(2)),
    min: Math.min(...numbers),
    max: Math.max(...numbers),
  };
}
