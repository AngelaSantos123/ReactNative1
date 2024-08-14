import * as React from 'react';
import { ProgressBar, MD3Colors } from 'react-native-paper';

const BarraCarga = () => (
  <ProgressBar progress={0.75} color={MD3Colors.error50} />
);

export default BarraCarga;