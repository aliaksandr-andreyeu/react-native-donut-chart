import { DonutChartSlice, DonutChartData, DonutChartSort } from './types';
/** Validates slice data */
export declare const validateSlices: (slices: DonutChartSlice[]) => void;
/** Modifies slices by adding gaps and sorting */
export declare const modifySlices: (data: DonutChartSlice[], gap: number, sort?: DonutChartSort | boolean) => DonutChartSlice[];
/** Normalizes slices to ensure proper percentage distribution */
export declare const normalizeSlices: (slices: DonutChartSlice[]) => DonutChartSlice[];
/** Creates final donut slice data with angles */
export declare const createDonutSlices: (data: DonutChartSlice[]) => DonutChartData[];
