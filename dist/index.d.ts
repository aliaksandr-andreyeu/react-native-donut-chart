import { FC } from 'react';
import { DonutChartProps } from './types';
/**
 * DonutChart Component
 *
 * A lightweight, customizable donut chart component for React Native.
 * Built with TypeScript and react-native-svg for smooth rendering.
 *
 * @example
 * ```tsx
 * <DonutChart
 *   slices={[
 *     { percentage: 45, color: '#FF6384' },
 *     { percentage: 55, color: '#36A2EB' }
 *   ]}
 *   size={250}
 *   width={40}
 *   gap={10}
 * />
 * ```
 */
export declare const DonutChart: FC<DonutChartProps>;
export { DonutChartSort } from './types';
export type { DonutChartProps, DonutChartSlice, DonutChartData } from './types';
