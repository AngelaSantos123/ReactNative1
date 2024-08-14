import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const AlertDialogs = () => {
  const handleAlertWithTitle = () => {
    Alert.alert(
      'Alerta con Título',
      'Este es un mensaje de alerta con título.',
      [{ text: 'OK' }]
    );
  };

  const handleConfirmationAlert = () => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de realizar esta acción?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Aceptar', onPress: () => console.log('Acción confirmada') }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleAlertWithTitle}>
        <Text style={styles.buttonText}>Alerta con Título</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleConfirmationAlert}>
        <Text style={styles.buttonText}>Alerta de Confirmación</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  button: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default AlertDialogs;
