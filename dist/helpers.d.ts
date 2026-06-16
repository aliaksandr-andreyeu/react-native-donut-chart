import { DonutChartSlice, InternalDonutSlice, DonutChartData, DonutChartSort } from './types';
/** Validates slice data */
export declare const validateSlices: (slices: DonutChartSlice[]) => void;
/** Modifies slices by adding gaps and sorting */
export declare const modifySlices: (data: DonutChartSlice[], gap: number, sort?: DonutChartSort | boolean) => InternalDonutSlice[];
/**
 * Normalizes slices so that real slices + gap segments sum to 100%.
 *
 * Gap segments keep their fixed size; the remaining room is shared between the
 * real slices proportionally to their values. Fractional precision is preserved
 * (no integer rounding and no forced minimum per slice).
 */
export declare const normalizeSlices: (slices: InternalDonutSlice[]) => InternalDonutSlice[];
/** Creates final donut slice data with angles */
export declare const createDonutSlices: (data: InternalDonutSlice[]) => DonutChartData[];
