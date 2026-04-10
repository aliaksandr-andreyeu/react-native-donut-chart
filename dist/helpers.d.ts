import { DonutChartSlice, DonutChartData, DonutChartSort } from './types';
export declare const modifySlices: (data: DonutChartSlice[], gap: number, sort?: DonutChartSort | boolean) => DonutChartSlice[];
export declare const normalizeSlices: (slices: DonutChartSlice[]) => DonutChartSlice[];
export declare const createDonutSlices: (data: DonutChartSlice[]) => DonutChartData[];
