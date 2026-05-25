import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { DonutChart } from '../src/index';

/**
 * Example app demonstrating DonutChart usage
 */
export default function App(): React.ReactElement {
  const [selectedSlice] = useState<number | null>(null);

  const data = [
    { percentage: 45, color: '#FF6384' },
    { percentage: 30, color: '#36A2EB' },
    { percentage: 15, color: '#FFCE56' },
    { percentage: 10, color: '#4BC0C0' }
  ];

  const dataWithoutColors = [{ percentage: 25 }, { percentage: 35 }, { percentage: 15 }, { percentage: 25 }];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Donut Chart Examples</Text>

      {/* Basic Chart */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Chart</Text>
        <View style={styles.chartContainer}>
          <DonutChart slices={data} size={250} width={40} gap={10} border='round' />
        </View>
      </View>

      {/* Auto-colored Chart */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Auto-colored Slices</Text>
        <View style={styles.chartContainer}>
          <DonutChart slices={dataWithoutColors} size={250} width={40} gap={10} sort={true} border='round' />
        </View>
      </View>

      {/* Small Chart */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Small Chart</Text>
        <View style={styles.chartContainer}>
          <DonutChart slices={data} size={150} width={25} gap={5} border='butt' />
        </View>
      </View>

      {/* Sorted Chart */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sorted Descending</Text>
        <View style={styles.chartContainer}>
          <DonutChart slices={data} size={250} width={40} gap={10} sort={false} border='square' />
        </View>
      </View>

      {/* Empty State */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Empty State</Text>
        <View style={styles.chartContainer}>
          <DonutChart slices={[]} size={250} width={40} emptyColor='#E0E0E0' />
        </View>
      </View>

      {selectedSlice !== null && (
        <Text style={styles.selected}>
          Selected: Slice {selectedSlice} ({data[selectedSlice].percentage}%)
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333'
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10
  },
  selected: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: '#666'
  }
});
