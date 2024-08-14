import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const SimboloCargar = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Esto es un símbolo para cargar la página</Text>
    <ActivityIndicator animating={true} color={MD2Colors.red800} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 10,
    fontSize: 16,
    color: 'black',
  },
});

export default SimboloCargar;


/*
Props
animating
Type: boolean

Default value: true

Whether to show the indicator or hide it.

color
Type: string

The color of the spinner.

size
Type: 'small' | 'large' | number

Default value: 'small'

Size of the indicator.

hidesWhenStopped
Type: boolean

Default value: true

Whether the indicator should hide when not animating.

style
Type: StyleProp<ViewStyle>

theme
Type: ThemeProp
*/