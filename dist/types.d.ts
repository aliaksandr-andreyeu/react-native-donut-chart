import { ColorValue, ViewStyle } from 'react-native';
import { Linecap } from 'react-native-svg';
/** Represents processed donut chart data with calculated angle */
export interface DonutChartData {
    /** Color of the slice (hex, rgb, hsl) */
    color: ColorValue;
    /** Normalized percentage (0-1) */
    percent: number;
    /** Rotation angle in degrees */
    angle: number;
}
export declare enum DonutChartSort {
    ASC = "asc",
    DESC = "desc"
}
/** Single slice configuration (public API) */
export interface DonutChartSlice {
    /** Percentage value (0-100+); slices are normalized proportionally */
    percentage: number;
    /** Optional hex/rgb/hsl color. Auto-generated if omitted */
    color?: ColorValue;
}
/**
 * Slice shape used internally while building the chart — adds the gap marker.
 *
 * @internal Not part of the public API; consumers should use {@link DonutChartSlice}.
 */
export interface InternalDonutSlice extends DonutChartSlice {
    /** Internal flag marking a transparent gap segment */
    gap?: boolean;
}
/** Main component props */
export interface DonutChartProps {
    /** Container styles */
    style?: ViewStyle | ViewStyle[];
    /** Chart diameter in pixels (default: 350) */
    size?: number;
    /** Ring thickness in pixels (default: 25) */
    width?: number;
    /** Gap between slices, in percentage points of the ring (auto-calculated if omitted) */
    gap?: number;
    /** Stroke line cap style (default: 'butt') */
    border?: Linecap;
    /** Sort slices order (default: false) */
    sort?: DonutChartSort | boolean;
    /** Array of slice data (required for rendering) */
    slices?: DonutChartSlice[];
    /** Empty state color (default: '#57595D') */
    emptyColor?: ColorValue;
}
