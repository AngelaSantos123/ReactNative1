import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';

const FechaActual = () => {
  const [fechaActual, setFechaActual] = useState(null);

  useEffect(() => {
    obtenerFechaActual();
    const intervalo = setInterval(() => {
      obtenerFechaActual();
    }, 1000); // Actualiza cada segundo

    return () => clearInterval(intervalo); // Limpia el intervalo al desmontar el componente
  }, []);

  const obtenerFechaActual = () => {
    const fecha = new Date();
    const fechaFormateada = format(fecha, 'dd/MM/yyyy');
    const horaFormateada = format(fecha, 'HH:mm:ss'); // Formatea la hora como HH:mm:ss
    setFechaActual({ fecha: fechaFormateada, hora: horaFormateada });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textoFecha}>Hoy es: {fechaActual?.fecha}</Text>
      <Text style={styles.textoHora}>Son las: {fechaActual?.hora}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoFecha: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textoHora: {
    fontSize: 16,
  },
});

export default FechaActual;