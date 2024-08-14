import React from 'react';
import { StyleSheet, View } from 'react-native';

const Vertical = () => (
  <View style={styles.layout}>
    <View style={[styles.box, { backgroundColor: 'red' }]} />
    <View style={[styles.box, { backgroundColor: 'yellow' }]} />
    <View style={[styles.box, { backgroundColor: 'blue' }]} />
  </View>
);

export default Vertical;

export const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#e5e5e5',
  },
  box: {
    flex: 1,
    backgroundColor: 'black',
  },
});