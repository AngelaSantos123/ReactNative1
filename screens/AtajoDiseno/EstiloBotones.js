import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const EstiloBotones = () => (
    <View style={styles.container}>
        <Button icon="camera" mode="text" onPress={() => console.log('Botón tipo texto')}>
            Botón tipo texto
        </Button>
        <Button icon="camera" mode="outlined" onPress={() => console.log('Botón tipo outlined')}>
            Botón tipo outlined
        </Button>
        <Button icon="camera" mode="contained" onPress={() => console.log('Botón tipo contained')}>
            Botón tipo contained
        </Button>
        <Button icon="camera" mode="elevated" onPress={() => console.log('Botón tipo elevated')}>
            Botón tipo elevated
        </Button>
        <Button icon="camera" mode="contained-tonal" onPress={() => console.log('Botón tipo contained-tonal')}>
            Botón tipo contained-tonal
        </Button>
    </View>
    // Cambiar el mode
    // text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal'
  
  
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

export default EstiloBotones;