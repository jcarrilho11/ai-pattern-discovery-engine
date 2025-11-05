import { kMeans, recordsToPoints } from './kmeans.util';

describe('K-Means Utilities', () => {
  describe('recordsToPoints', () => {
    it('should convert records to points', () => {
      const records = [
        { x: 1, y: 2, name: 'test' },
        { x: 3, y: 4, name: 'test2' },
      ];

      const { points, fields } = recordsToPoints(records);

      expect(fields).toEqual(['x', 'y']);
      expect(points).toHaveLength(2);
      expect(points[0].values).toEqual([1, 2]);
      expect(points[1].values).toEqual([3, 4]);
    });

    it('should return empty for empty records', () => {
      const { points, fields } = recordsToPoints([]);
      expect(points).toEqual([]);
      expect(fields).toEqual([]);
    });
  });

  describe('kMeans', () => {
    it('should cluster points correctly', () => {
      const points = [
        { values: [1, 1] },
        { values: [1.5, 2] },
        { values: [3, 4] },
        { values: [5, 7] },
        { values: [3.5, 5] },
        { values: [4.5, 5] },
      ];

      const result = kMeans(points, 2);

      expect(result.clusters).toHaveLength(2);
      expect(result.iterations).toBeGreaterThan(0);
      
      const totalPoints = result.clusters.reduce(
        (sum, cluster) => sum + cluster.points.length,
        0,
      );
      expect(totalPoints).toBe(6);
    });

    it('should handle empty dataset', () => {
      const result = kMeans([], 3);
      expect(result.clusters).toEqual([]);
      expect(result.iterations).toBe(0);
    });

    it('should limit k to dataset size', () => {
      const points = [{ values: [1, 2] }, { values: [3, 4] }];
      const result = kMeans(points, 5);
      
      expect(result.clusters.length).toBeLessThanOrEqual(2);
    });
  });
});
