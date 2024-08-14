import React from 'react';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions, StyleSheet } from 'react-native';

const G_Circular = () => {
  // Obtener el ancho de la pantalla
  const screenWidth = Dimensions.get('window').width;

  const pieChartData = [
    {
      name: 'January',
      population: Math.random() * 100,
      color: '#f44336',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'February',
      population: Math.random() * 100,
      color: '#2196F3',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'March',
      population: Math.random() * 100,
      color: '#FFEB3B',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'April',
      population: Math.random() * 100,
      color: '#4CAF50',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'May',
      population: Math.random() * 100,
      color: '#FF9800',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'June',
      population: Math.random() * 100,
      color: '#9C27B0',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <PieChart
      data={pieChartData}
      width={screenWidth - 20}
      height={220}
      chartConfig={{
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="15"
      absolute
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

export default G_Circular;
