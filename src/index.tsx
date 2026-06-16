import { FC, useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { DonutChartProps } from './types';
import { modifySlices, normalizeSlices, createDonutSlices } from './helpers';

declare const __DEV__: boolean;

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
export const DonutChart: FC<DonutChartProps> = ({
  style,
  slices = [],
  width = 25,
  size = 350,
  gap,
  sort,
  border = 'butt',
  emptyColor = '#57595D'
}) => {
  const slicesGap = useMemo(() => {
    if (gap !== undefined) {
      return gap;
    }
    switch (border) {
      case 'butt':
        return Math.floor(width / 24);
      case 'round':
        return Math.floor(width / 6);
      case 'square':
        return Math.floor(width / 4);
    }
  }, [gap, width, border]);

  const isEmptySlices = useMemo(() => !(slices && Array.isArray(slices) && slices.length > 0), [slices]);

  const data = useMemo(() => {
    if (isEmptySlices) {
      return [];
    }

    try {
      const modifiedData = modifySlices(slices, slicesGap, sort);
      const normalizedData = normalizeSlices(modifiedData);
      return createDonutSlices(normalizedData);
    } catch (error) {
      // Degrade to the empty state rather than crashing the render tree.
      if (typeof __DEV__ !== 'undefined' && __DEV__) {
        // eslint-disable-next-line no-console
        console.warn('[DonutChart] Ignoring invalid slices:', error);
      }
      return [];
    }
  }, [isEmptySlices, slices, sort, slicesGap]);

  const circle = useMemo(() => {
    const center = size / 2;
    const radius = (size - width) / 2;

    const circumference = 2 * Math.PI * radius;

    if (data.length === 0) {
      return (
        <Circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={width}
          stroke={emptyColor}
          originX={center}
          originY={center}
          strokeDasharray={circumference}
          fill={'none'}
        />
      );
    }

    return data.map(({ percent, color, angle }, index) => {
      const strokeDashoffset = circumference * (1 - percent);
      return (
        <Circle
          key={index}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={width}
          stroke={color}
          strokeLinecap={border}
          originX={center}
          originY={center}
          strokeDashoffset={strokeDashoffset}
          strokeDasharray={circumference}
          transform={`rotate(${angle}, ${size / 2}, ${size / 2})`}
          fill={'none'}
        />
      );
    });
  }, [size, width, border, data, emptyColor]);

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size
        },
        style
      ]}
    >
      <Svg width={size} height={size} x={0} y={0} viewBox={`0 0 ${size} ${size}`} fill={'none'}>
        <G rotation={-90} originX={size / 2} originY={size / 2}>
          {circle}
        </G>
      </Svg>
    </View>
  );
};

interface Styles {
  container: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    overflow: 'hidden',
    alignItems: 'center'
  }
});

export { DonutChartSort } from './types';
export type { DonutChartProps, DonutChartSlice, DonutChartData } from './types';
