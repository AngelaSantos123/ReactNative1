import * as React from 'react';
import { Chip } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';

const ChipEjemplo = () => (
    // flat' | 'outlined
    <View>
       <Chip icon="information" mode="flat" onPress={() => console.log('Pressed')}>Example Chip</Chip>
       <Chip icon="information" mode="outlined" onPress={() => console.log('Pressed')}>Example Chip</Chip>
    </View>
  
);

export default ChipEjemplo;

