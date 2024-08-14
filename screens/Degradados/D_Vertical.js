import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const D_Vertical = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#C666FA', '#FFFFFF']} // Se pueden añadir más de 2 colores para hacer degradados. , '#3BFAEE'
        style={styles.gradient}
        start={{ x: 0, y: 0 }} // Inicia en la esquina superior izquierda
        end={{ x: 0, y: 1 }} // Termina en la esquina inferior izquierda
      >
        <Text style={styles.text}>Degradado Vertical</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 24,
    color: '#fff',
  },
});

export default D_Vertical;
