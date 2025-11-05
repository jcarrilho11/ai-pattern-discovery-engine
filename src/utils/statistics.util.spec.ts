import {
  calculateMean,
  calculateMin,
  calculateMax,
  calculateStdDev,
  calculateDatasetStatistics,
} from './statistics.util';

describe('Statistics Utilities', () => {
  describe('calculateMean', () => {
    it('should calculate mean correctly', () => {
      expect(calculateMean([1, 2, 3, 4, 5])).toBe(3);
      expect(calculateMean([10, 20, 30])).toBe(20);
    });

    it('should return 0 for empty array', () => {
      expect(calculateMean([])).toBe(0);
    });
  });

  describe('calculateMin', () => {
    it('should find minimum value', () => {
      expect(calculateMin([5, 2, 8, 1, 9])).toBe(1);
    });

    it('should return 0 for empty array', () => {
      expect(calculateMin([])).toBe(0);
    });
  });

  describe('calculateMax', () => {
    it('should find maximum value', () => {
      expect(calculateMax([5, 2, 8, 1, 9])).toBe(9);
    });

    it('should return 0 for empty array', () => {
      expect(calculateMax([])).toBe(0);
    });
  });

  describe('calculateStdDev', () => {
    it('should calculate standard deviation', () => {
      const result = calculateStdDev([2, 4, 4, 4, 5, 5, 7, 9]);
      expect(result).toBeCloseTo(2, 0);
    });

    it('should return 0 for empty array', () => {
      expect(calculateStdDev([])).toBe(0);
    });
  });

  describe('calculateDatasetStatistics', () => {
    it('should calculate statistics for all numeric fields', () => {
      const data = [
        { age: 25, income: 50000 },
        { age: 30, income: 60000 },
        { age: 35, income: 70000 },
      ];

      const stats = calculateDatasetStatistics(data);

      expect(stats).toHaveLength(2);
      expect(stats[0].field).toBe('age');
      expect(stats[0].mean).toBe(30);
      expect(stats[1].field).toBe('income');
      expect(stats[1].mean).toBe(60000);
    });

    it('should return empty array for empty dataset', () => {
      expect(calculateDatasetStatistics([])).toEqual([]);
    });
  });
});
