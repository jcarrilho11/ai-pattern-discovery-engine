export interface FieldStatistics {
  field: string;
  mean: number;
  min: number;
  max: number;
  stdDev: number;
}

export function calculateMean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((acc, val) => acc + val, 0) / values.length;
}

export function calculateMin(values: number[]): number {
  return values.length === 0 ? 0 : Math.min(...values);
}

export function calculateMax(values: number[]): number {
  return values.length === 0 ? 0 : Math.max(...values);
}

export function calculateStdDev(values: number[]): number {
  if (values.length === 0) return 0;
  
  const mean = calculateMean(values);
  const squaredDiffs = values.map(val => Math.pow(val - mean, 2));
  const variance = calculateMean(squaredDiffs);
  
  return Math.sqrt(variance);
}

function extractNumericValues(
  data: Record<string, any>[],
  field: string,
): number[] {
  return data
    .map(record => record[field])
    .filter(val => typeof val === 'number' && !isNaN(val));
}

export function calculateDatasetStatistics(
  data: Record<string, any>[],
): FieldStatistics[] {
  if (data.length === 0) return [];
  
  const numericFields = Object.keys(data[0]).filter(
    key => typeof data[0][key] === 'number',
  );
  
  return numericFields.map(field => {
    const values = extractNumericValues(data, field);
    
    return {
      field,
      mean: calculateMean(values),
      min: calculateMin(values),
      max: calculateMax(values),
      stdDev: calculateStdDev(values),
    };
  });
}
