import React from 'react';
import { StyleSheet, View } from 'react-native';

const SeparacionFB = () => (
  <View style={styles.layout}>
    <View style={[styles.box, { backgroundColor: 'red' }]} />
    <View style={[styles.box, { backgroundColor: 'green' }]} />
    <View style={[styles.box, { backgroundColor: 'blue' }]} />
  </View>
);

export default SeparacionFB;

export const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: '#e5e5e5',
  },
  box: {
    backgroundColor: 'black',
    height: 100
  },
});