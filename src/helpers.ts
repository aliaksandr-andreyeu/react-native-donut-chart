import { ColorValue } from 'react-native';
import { DonutChartSlice, DonutChartData, DonutChartSort } from './types';

const generatePalette = (count: number) => {
    if (!count) return [];
    const palette = [];
    for (let i = 0; i < count; i++) {
        const hue = (i * (360 / count)) % 360;
        palette.push(`hsl(${hue}, 100%, 60%)`);
    }
    return palette;
};

export const modifySlices = (
    data: DonutChartSlice[],
    gap: number,
    sort?: DonutChartSort | boolean
): DonutChartSlice[] => {
    const sortFunc = (a: DonutChartSlice, b: DonutChartSlice) => {
        switch (sort) {
            case sort === true:
            case sort === DonutChartSort.DESC:
                return b.percentage - a.percentage;
            case sort === DonutChartSort.ASC:
                return a.percentage - b.percentage;
            default:
                return 0;
        }
    };

    const palette = generatePalette(data.length);

    let slicesWithGap = [...data]
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
        }, [] as DonutChartSlice[]);

    return slicesWithGap;
};

export const normalizeSlices = (slices: DonutChartSlice[]): DonutChartSlice[] => {
    const gaps = slices.filter((item) => item.gap === true);
    const totalGapSum = gaps.reduce((sum, item) => sum + item.percentage, 0);
    const sliceItems = slices.map((item, originalIndex) => ({ ...item, originalIndex })).filter((item) => !item.gap);
    const nSlices = sliceItems.length;
    if (nSlices === 0) return slices;
    const availablePercentage = 100 - totalGapSum;
    if (availablePercentage < nSlices) {
        throw new Error(`Not enough percentages in 100% for slices: needed ${nSlices}%, available ${availablePercentage}%`);
    }
    const availablePool = availablePercentage - nSlices;
    const slicesPercentageTotal = sliceItems.reduce((sum, item) => sum + item.percentage, 0);

    const processed = sliceItems.map((item) => {
        const ratio = slicesPercentageTotal === 0 ? 1 / nSlices : item.percentage / slicesPercentageTotal;
        const precise = ratio * availablePool;

        return {
            ...item,
            floor: Math.floor(precise),
            remainder: precise - Math.floor(precise)
        };
    });

    const flooredSum = processed.reduce((sum, item) => sum + item.floor, 0);
    let difference = availablePool - flooredSum;

    const sorted = [...processed].sort((a, b) => b.remainder - a.remainder);

    for (let i = 0; i < difference; i++) {
        sorted[i].floor++;
    }

    const result = [...slices];

    processed.forEach((item) => {
        result[item.originalIndex] = {
            ...slices[item.originalIndex],
            percentage: 1 + item.floor
        };
    });

    return result;
};

export const createDonutSlices = (data: DonutChartSlice[]): DonutChartData[] => {
    const donutSlices: DonutChartData[] = [];
    const total = data.reduce((previous, { percentage }) => previous + percentage, 0);

    let angle = 0;

    data.forEach(({ percentage, color }, idx) => {
        const percent = percentage / (total || 1);

        donutSlices.push({
            percent,
            color: color as ColorValue,
            angle
        });

        angle += percent * 360;
    });

    return donutSlices;
};
