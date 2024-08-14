import React from 'react';
import { View, Text } from 'react-native';

const ComponentesVarios = () => (
  <View style={{ flex: 1, justifyContent: 'center' }}>
    <Box color="red" />
    <Box color="green" />
    <Box color="blue" />
  </View>
);

export default ComponentesVarios;

export const Box = (props) => (
  <View style={{ width: 100, height: 100, backgroundColor: props.color }} />
);