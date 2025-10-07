export interface Point {
  values: number[];
  originalIndex?: number;
}

export interface Cluster {
  centroid: number[];
  points: Point[];
  clusterIndex: number;
}

export interface KMeansResult {
  clusters: Cluster[];
  iterations: number;
}

function euclideanDistance(point1: number[], point2: number[]): number {
  let sum = 0;
  for (let i = 0; i < point1.length; i++) {
    sum += Math.pow(point1[i] - point2[i], 2);
  }
  return Math.sqrt(sum);
}

// Basic K-Means implementation - to be completed
export function kMeans(
  data: Point[],
  k: number,
  maxIterations = 100,
): KMeansResult {
  // TODO: Implement clustering algorithm
  return { clusters: [], iterations: 0 };
}

export function recordsToPoints(
  records: Record<string, any>[],
): { points: Point[]; fields: string[] } {
  if (records.length === 0) return { points: [], fields: [] };
  
  const fields = Object.keys(records[0]).filter(
    key => typeof records[0][key] === 'number',
  );
  
  const points: Point[] = records.map((record, index) => ({
    values: fields.map(field => record[field]),
    originalIndex: index,
  }));
  
  return { points, fields };
}
