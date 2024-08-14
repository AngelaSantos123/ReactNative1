import React from 'react';
import { Platform, StatusBar, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Pantalla2 = () => {
    const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 16, alignItems:'center' }}>The <Text style={{ fontWeight: 'bold' }}>quick brown fox</Text> jumps over the lazy dog</Text>
        <TouchableOpacity style={styles.volverButton} onPress={() => navigation.navigate('CursoCodecademy')}>
            <Text style={styles.volverText}>Volver</Text>
        </TouchableOpacity>
    </View>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  innerContainer: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  boxContainer: {
    height: 100,
    width: 100,
    backgroundColor: 'red',
  },
  redBox: {
    flex: 1,
  },
  volverButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  volverText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Pantalla2;
