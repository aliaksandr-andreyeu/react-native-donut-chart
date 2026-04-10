# React Native Donut Chart

A lightweight, customizable, and animated donut chart component for React Native. Built with TypeScript and `react-native-svg`, it offers smooth rendering, configurable gaps between slices, and automatic color palette generation.

[![npm version](https://img.shields.io/npm/v/react-native-donut-chart.svg?style=flat-square)](https://www.npmjs.com/package/react-native-donut-chart)
[![npm downloads](https://img.shields.io/npm/dm/react-native-donut-chart.svg?style=flat-square)](https://www.npmjs.com/package/react-native-donut-chart)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- **Smooth & Animated** — Utilizes `react-native-svg` for crisp, scalable rendering.
- **Configurable Gaps** — Adjust the spacing between donut slices, or let the component handle it automatically.
- **Smart Sorting** — Sort slices in ascending or descending order based on their percentage values.
- **Auto-generated Colors** — Automatically generates a visually appealing HSL palette if no colors are provided.
- **Customizable** — Full control over size, stroke width, border style, and more.
- **Lightweight** — Minimal dependencies, easy to integrate into any React Native project.
- **TypeScript Support** — Fully typed for a better developer experience.

## 📦 Installation

1.  Install the library and its required peer dependency:
    ```bash
    # npm
    npm install react-native-donut-chart react-native-svg

    # yarn
    yarn add react-native-donut-chart react-native-svg

2.  If you're on iOS, run:
    ```bash
    cd ios && pod install

## 🚀 Usage

    Here is a simple example to get you started:
    ```jsx
    import React from 'react';
    import { View, StyleSheet } from 'react-native';
    import { DonutChart } from 'react-native-donut-chart';

    const App = () => {
    const data = [
        { percentage: 45, color: '#FF6384' }, // Custom color
        { percentage: 30, color: '#36A2EB' }, // Custom color
        { percentage: 15 },                   // Auto-generated color
        { percentage: 10 },                   // Auto-generated color
    ];

    return (
        <View style={styles.container}>
        <DonutChart
            slices={data}
            size={250}
            width={40}
            gap={10}
            sort="desc"
            border="round"
            emptyColor="#E0E0E0"
        />
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    });

    export default App;