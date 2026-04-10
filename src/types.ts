import { ColorValue, ViewStyle } from 'react-native';
import { Linecap } from 'react-native-svg';

export interface DonutChartData {
    color: ColorValue;
    percent: number;
    angle: number;
}

export const enum DonutChartSort {
    ASC = 'asc',
    DESC = 'desc'
}

export interface DonutChartSlice {
    percentage: number;
    color?: ColorValue;
    gap?: boolean;
}

export interface DonutChartProps {
    style?: ViewStyle | ViewStyle[];
    size?: number;
    width?: number;
    gap?: number;
    border?: Linecap;
    sort?: DonutChartSort | boolean;
    slices?: DonutChartSlice[];
    emptyColor?: ColorValue;
}
