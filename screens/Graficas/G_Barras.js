import React from 'react';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions, StyleSheet } from 'react-native';

const G_Barras = () => {
  // Obtener el ancho de la pantalla
  const screenWidth = Dimensions.get('window').width;

  return (
    <BarChart
      data={{
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
          {
            data: [
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ],
          },
        ],
      }}
      width={screenWidth - 20}
      height={220}
      yAxisLabel="$"
      yAxisSuffix="k"
      yAxisInterval={1}
      chartConfig={{
        backgroundColor: '#1cc910',
        backgroundGradientFrom: '#43a047',
        backgroundGradientTo: '#66bb6a',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#ffa726',
        },
      }}
      style={styles.chart}
    />
  );
};

const styles = StyleSheet.create({
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default G_Barras;
