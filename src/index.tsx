import React, { FC, useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { DonutChartProps } from './types';
import { modifySlices, normalizeSlices, createDonutSlices } from './helpers';

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

        const modifiedData = modifySlices(slices, slicesGap, sort);
        const normalizedData = normalizeSlices(modifiedData);
        const donutData = createDonutSlices(normalizedData);

        return donutData;
    }, [isEmptySlices, slices, sort, slicesGap]);

    const circle = useMemo(() => {
        const center = size / 2;
        const radius = (size - width) / 2;

        const circumference = 2 * Math.PI * radius;

        if (isEmptySlices) {
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
                />
            );
        }

        return data.map(({ percent, color, angle }, index) => {
            let strokeDashoffset = circumference * (1 - percent);
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
    }, [isEmptySlices, size, width, border, data]);

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
