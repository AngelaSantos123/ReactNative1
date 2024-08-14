import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

const CambioColor = () => (
  <View style={styles.layout}>
    <Pressable>
      {(state) => <Box pressed={state.pressed} />}
    </Pressable>
  </View>
);

export default CambioColor;

export const Box = (props) => (
  <View style={[styles.box, props.pressed && { backgroundColor: 'blue' }]} />
);

export const styles = StyleSheet.create({
  layout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
});