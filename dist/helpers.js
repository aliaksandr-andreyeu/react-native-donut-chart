import { DonutChartSort } from './types';
/** Validates slice data */
export const validateSlices = (slices) => {
    if (!Array.isArray(slices)) {
        throw new TypeError('Slices must be an array');
    }
    slices.forEach((slice, index) => {
        if (typeof slice.percentage !== 'number' || isNaN(slice.percentage)) {
            throw new Error(`Slice ${index}: percentage must be a valid number`);
        }
        if (slice.percentage < 0) {
            throw new Error(`Slice ${index}: percentage cannot be negative`);
        }
    });
};
/** Generates HSL color palette for auto-coloring */
const generatePalette = (count) => {
    if (!count)
        return [];
    const palette = [];
    for (let i = 0; i < count; i++) {
        const hue = (i * (360 / count)) % 360;
        palette.push(`hsl(${hue}, 100%, 60%)`);
    }
    return palette;
};
/** Modifies slices by adding gaps and sorting */
export const modifySlices = (data, gap, sort) => {
    validateSlices(data);
    const sortFunc = (a, b) => {
        switch (sort) {
            case true:
            case DonutChartSort.DESC:
                return b.percentage - a.percentage;
            case DonutChartSort.ASC:
                return a.percentage - b.percentage;
            default:
                return 0;
        }
    };
    const palette = generatePalette(data.length);
    const slicesWithGap = [...data]
        .sort(sortFunc)
        .map((slice, index) => ({
        ...slice,
        gap: false,
        color: slice.color || palette[index]
    }))
        .reduce((acc, item) => {
        acc.push(item);
        if (data.length > 1) {
            acc.push({
                gap: true,
                color: 'transparent',
                percentage: gap
            });
        }
        return acc;
    }, []);
    return slicesWithGap;
};
/**
 * Normalizes slices so that real slices + gap segments sum to 100%.
 *
 * Gap segments keep their fixed size; the remaining room is shared between the
 * real slices proportionally to their values. Fractional precision is preserved
 * (no integer rounding and no forced minimum per slice).
 */
export const normalizeSlices = (slices) => {
    const sliceItems = slices.filter((item) => !item.gap);
    const nSlices = sliceItems.length;
    if (nSlices === 0)
        return slices;
    const totalGapSum = slices.filter((item) => item.gap === true).reduce((sum, item) => sum + item.percentage, 0);
    const availablePercentage = 100 - totalGapSum;
    // Gaps leave no room for slices — drop the gaps and render slices edge-to-edge
    // instead of throwing inside the render path.
    if (availablePercentage <= 0) {
        return sliceItems;
    }
    const slicesPercentageTotal = sliceItems.reduce((sum, item) => sum + item.percentage, 0);
    return slices.map((item) => {
        if (item.gap) {
            return item;
        }
        const ratio = slicesPercentageTotal === 0 ? 1 / nSlices : item.percentage / slicesPercentageTotal;
        return { ...item, percentage: ratio * availablePercentage };
    });
};
/** Creates final donut slice data with angles */
export const createDonutSlices = (data) => {
    const donutSlices = [];
    const total = data.reduce((previous, { percentage }) => previous + percentage, 0);
    let angle = 0;
    data.forEach(({ percentage, color }) => {
        const percent = percentage / (total || 1);
        donutSlices.push({
            percent,
            color: color,
            angle
        });
        angle += percent * 360;
    });
    return donutSlices;
};
//# sourceMappingURL=helpers.js.map