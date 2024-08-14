/*import * as React from 'react';
import { Badge } from 'react-native-paper';

const Cantidad = () => (
  <Badge>3</Badge>
);

export default Cantidad;*/


import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Cantidad = () => (
  <View style={styles.container}>
    <Icon name="shopping-cart" size={30} />
    <Badge style={styles.badge}>3</Badge>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 30,
    height: 30,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
  },
});

export default Cantidad;
