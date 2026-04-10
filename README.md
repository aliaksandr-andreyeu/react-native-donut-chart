# React Native Donut Chart

A lightweight, customizable, and animated donut chart component for React Native. Built with TypeScript and `react-native-svg`, it offers smooth rendering, configurable gaps between slices, and automatic color palette generation.

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
    ```

2.  If you're on iOS, run:
    ```bash
    cd ios && pod install
    ```

## 🚀 Usage

Here is a simple example to get you started:

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

## ⚙️ Props

<table><thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td><code>slices</code></td><td><code>DonutChartSlice[]</code></td><td><code>[]</code></td><td><strong>Required</strong>. An array of data objects for each slice. See <code>DonutChartSlice</code> definition below.</td></tr><tr><td><code>size</code></td><td><code>number</code></td><td><code>350</code></td><td>The width and height of the chart in pixels.</td></tr><tr><td><code>width</code></td><td><code>number</code></td><td><code>25</code></td><td>The thickness of the donut ring in pixels.</td></tr><tr><td><code>gap</code></td><td><code>number</code></td><td><em>auto</em></td><td>The size of the gap between slices in pixels. If not provided, it's calculated based on <code>width</code> and <code>border</code>.</td></tr><tr><td><code>border</code></td><td><code>'butt' | 'round' | 'square'</code></td><td><code>'butt'</code></td><td>The shape of the stroke endings (linecap) for each slice. Affects default gap calculation.</td></tr><tr><td><code>sort</code></td><td><code>'asc' | 'desc' | boolean</code></td><td><code>false</code></td><td>Sorts the slices. <code>true</code> or <code>'desc'</code> for descending order, <code>'asc'</code> for ascending.</td></tr><tr><td><code>emptyColor</code></td><td><code>ColorValue</code></td><td><code>'#57595D'</code></td><td>The color used for the chart when the <code>slices</code> array is empty.</td></tr><tr><td><code>style</code></td><td><code>ViewStyle | ViewStyle[]</code></td><td><code>{}</code></td><td>Additional styles for the container <code>View</code>.</td></tr></tbody></table>

### `DonutChartSlice` Object

<table><thead><tr><th>Property</th><th>Type</th><th>Required</th><th>Description</th></tr></thead><tbody><tr><td><code>percentage</code></td><td><code>number</code></td><td>Yes</td><td>The percentage value this slice represents (e.g., <code>45</code> for 45%).</td></tr><tr><td><code>color</code></td><td><code>ColorValue</code></td><td>No</td><td>The color of the slice. If omitted, a color from the auto-generated HSL palette will be used.</td></tr></tbody></table>

## 🛠️ Development

To run the project locally and contribute:

1. Clone the repository:

    ```bash
    git clone https://github.com/aliaksandr-andreyeu/react-native-donut-chart.git
    cd react-native-donut-chart
    git checkout development
    ```

2. Install dependencies:

    ```bash
    yarn install
    # or
    npm install
    ```

3. Make your changes in the src/ directory.

4. Build the project:

    ```bash
    yarn build
    # or
    npm run build
    ```

## 📄 License
This project is licensed under the MIT License. See the LICENSE file for details.


## 👤 Author

#### Aliaksandr Andreyeu

- GitHub: <a href="https://github.com/aliaksandr-andreyeu" target="_blank" rel="noreferrer">@aliaksandr-andreyeu</a>
