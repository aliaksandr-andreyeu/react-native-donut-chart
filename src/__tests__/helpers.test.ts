import { validateSlices, modifySlices, normalizeSlices, createDonutSlices } from '../helpers';
import { DonutChartSlice, DonutChartSort } from '../types';

describe('DonutChart Helpers', () => {
  describe('validateSlices', () => {
    it('should throw error for non-array input', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => validateSlices(null as any)).toThrow(TypeError);
    });

    it('should throw error for NaN percentage', () => {
      expect(() => validateSlices([{ percentage: NaN }])).toThrow();
    });

    it('should throw error for negative percentage', () => {
      expect(() => validateSlices([{ percentage: -10 }])).toThrow();
    });

    it('should accept valid slices', () => {
      expect(() => validateSlices([{ percentage: 50 }, { percentage: 50 }])).not.toThrow();
    });

    it('should accept zero percentage', () => {
      expect(() => validateSlices([{ percentage: 0 }, { percentage: 100 }])).not.toThrow();
    });
  });

  describe('modifySlices', () => {
    it('should add gaps between slices', () => {
      const slices: DonutChartSlice[] = [{ percentage: 50 }, { percentage: 50 }];
      const result = modifySlices(slices, 5);
      expect(result.length).toBeGreaterThan(slices.length);
      expect(result.some((s) => s.gap === true)).toBe(true);
    });

    it('should sort in descending order', () => {
      const slices: DonutChartSlice[] = [{ percentage: 30 }, { percentage: 70 }];
      const result = modifySlices(slices, 0, DonutChartSort.DESC);
      expect(result[0].percentage).toBe(70);
    });

    it('should sort in ascending order', () => {
      const slices: DonutChartSlice[] = [{ percentage: 70 }, { percentage: 30 }];
      const result = modifySlices(slices, 0, DonutChartSort.ASC);
      expect(result[0].percentage).toBe(30);
    });

    it('should assign colors to slices', () => {
      const slices: DonutChartSlice[] = [{ percentage: 50 }, { percentage: 50 }];
      const result = modifySlices(slices, 0);
      const coloredSlices = result.filter((s) => !s.gap);
      expect(coloredSlices[0].color).toBeDefined();
      expect(coloredSlices[1].color).toBeDefined();
    });

    it('should preserve custom colors', () => {
      const slices: DonutChartSlice[] = [{ percentage: 50, color: '#FF0000' }, { percentage: 50 }];
      const result = modifySlices(slices, 0);
      const coloredSlices = result.filter((s) => !s.gap);
      expect(coloredSlices[0].color).toBe('#FF0000');
    });
  });

  describe('normalizeSlices', () => {
    it('should normalize slices to sum to 100', () => {
      const slices: DonutChartSlice[] = [
        { percentage: 50, color: '#FF0000' },
        { percentage: 50, color: '#00FF00' }
      ];
      const result = normalizeSlices(slices);
      const total = result.reduce((sum, s) => sum + s.percentage, 0);
      expect(total).toBe(100);
    });

    it('should handle empty array', () => {
      expect(() => normalizeSlices([])).not.toThrow();
    });
  });

  describe('createDonutSlices', () => {
    it('should create donut data with correct structure', () => {
      const slices: DonutChartSlice[] = [
        { percentage: 50, color: '#FF0000' },
        { percentage: 50, color: '#00FF00' }
      ];
      const result = createDonutSlices(slices);
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('percent');
      expect(result[0]).toHaveProperty('color');
      expect(result[0]).toHaveProperty('angle');
    });

    it('should calculate correct angles', () => {
      const slices: DonutChartSlice[] = [
        { percentage: 50, color: '#FF0000' },
        { percentage: 50, color: '#00FF00' }
      ];
      const result = createDonutSlices(slices);
      expect(result[0].angle).toBe(0);
      expect(result[1].angle).toBe(180);
    });

    it('should calculate correct percentages', () => {
      const slices: DonutChartSlice[] = [
        { percentage: 25, color: '#FF0000' },
        { percentage: 75, color: '#00FF00' }
      ];
      const result = createDonutSlices(slices);
      expect(result[0].percent).toBe(0.25);
      expect(result[1].percent).toBe(0.75);
    });

    it('should handle empty array', () => {
      const result = createDonutSlices([]);
      expect(result).toHaveLength(0);
    });
  });
});
