import React from 'react';
import { Platform, StatusBar, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Pantalla1 = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.boxContainer}>
          <View style={styles.redBox} />
        </View>
      </View>
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

export default Pantalla1;
