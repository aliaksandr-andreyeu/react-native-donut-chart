import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { modifySlices, normalizeSlices, createDonutSlices } from './helpers';
export const DonutChart = ({ style, slices = [], width = 25, size = 350, gap, sort, border = 'butt', emptyColor = '#57595D' }) => {
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
            return (_jsx(Circle, { cx: center, cy: center, r: radius, strokeWidth: width, stroke: emptyColor, originX: center, originY: center, strokeDasharray: circumference }));
        }
        return data.map(({ percent, color, angle }, index) => {
            let strokeDashoffset = circumference * (1 - percent);
            return (_jsx(Circle, { cx: center, cy: center, r: radius, strokeWidth: width, stroke: color, strokeLinecap: border, originX: center, originY: center, strokeDashoffset: strokeDashoffset, strokeDasharray: circumference, transform: `rotate(${angle}, ${size / 2}, ${size / 2})`, fill: 'none' }, index));
        });
    }, [isEmptySlices, size, width, border, data]);
    return (_jsx(View, { style: [
            styles.container,
            {
                width: size,
                height: size,
                borderRadius: size
            },
            style
        ], children: _jsx(Svg, { width: size, height: size, x: 0, y: 0, viewBox: `0 0 ${size} ${size}`, fill: 'none', children: _jsx(G, { rotation: -90, originX: size / 2, originY: size / 2, children: circle }) }) }));
};
const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        alignItems: 'center'
    }
});
//# sourceMappingURL=index.js.map