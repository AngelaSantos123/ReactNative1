import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { format, differenceInDays, parse, addDays, isBefore } from 'date-fns';

const Calendario = () => {
  // Para guardar la fecha de inicio y fin y la diferencia de días
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [diasDiferencia, setDiasDiferencia] = useState(null);

  // Botón de aceptar
  const handleAceptar = () => {
    if (fechaInicio && fechaFin) {
      const inicio = parse(fechaInicio.dateString, 'yyyy-MM-dd', new Date());
      const fin = parse(fechaFin.dateString, 'yyyy-MM-dd', new Date());
      const diferencia = differenceInDays(fin, inicio);
      setDiasDiferencia(diferencia);
    }
  };

  // Objeto para marcar las fechas seleccionadas en el calendario
  const markedDatesInicio = {};
  const markedDatesFin = {};
  const fechaHoy = format(new Date(), 'yyyy-MM-dd'); // Día actual

  if (fechaInicio) {
    markedDatesInicio[fechaInicio.dateString] = { selected: true, selectedColor: 'blue' };
    // Deshabilitar días anteriores al día actual en el calendario de inicio
    markedDatesInicio[fechaHoy] = { disabled: true, disableTouchEvent: true, disabledTextColor: '#ccc' };
  }

  if (fechaInicio && fechaFin) {
    const inicio = parse(fechaInicio.dateString, 'yyyy-MM-dd', new Date());
    const fin = parse(fechaFin.dateString, 'yyyy-MM-dd', new Date());

    // Marcar todos los días entre fechaInicio y fechaFin en azul claro
    let currentDate = inicio;
    while (isBefore(currentDate, fin) || currentDate.getTime() === fin.getTime()) {
      const currentDateStr = format(currentDate, 'yyyy-MM-dd');
      markedDatesFin[currentDateStr] = { selected: true, selectedColor: '#57A3DE' };
      currentDate = addDays(currentDate, 1);
    }
    markedDatesFin[fechaFin.dateString] = { selected: true, selectedColor: 'blue' };
  }

  return (
    <View style={styles.container}>
      <View style={styles.calendars}>
        <View style={styles.calendarContainer}>
          <Text style={styles.label}>Seleccionar fecha de inicio:</Text>
          <Calendar
            style={styles.calendar}
            onDayPress={(day) => setFechaInicio(day)}
            markedDates={markedDatesInicio}
            minDate={fechaHoy}
          />
        </View>
        <View style={styles.calendarContainer}>
          <Text style={styles.label}>Seleccionar fecha de fin:</Text>
          <Calendar
            style={styles.calendar}
            onDayPress={(day) => setFechaFin(day)}
            markedDates={markedDatesFin}
            minDate={fechaInicio ? fechaInicio.dateString : fechaHoy}
          />
        </View>
      </View>
      <Button title="Aceptar" onPress={handleAceptar} disabled={!fechaInicio || !fechaFin} />
      {diasDiferencia !== null && (
        <Text style={styles.resultado}>
          Su instancia es de {diasDiferencia} días y va desde {format(parse(fechaInicio.dateString, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy')} hasta {format(parse(fechaFin.dateString, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy')}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  calendars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  calendarContainer: {
    flex: 1,
    marginRight: 10,
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 320, 
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultado: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Calendario;
