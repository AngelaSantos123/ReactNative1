import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa el hook useNavigation

const MenuDiseno = () => {
  const navigation = useNavigation(); // Obtiene el objeto de navegación

  // Ejemplo de datos para los botones
  const buttonsData = [
    { text: 'Símbolo de cargar', screen: 'SimboloCargar' },
    { text: 'Appbar', screen: 'MenuAppBar' },
    { text: 'Menú Avatar', screen: 'MenuAvatar' },
    { text: 'Cantidad', screen: 'Cantidad' },
    { text: 'Mostrar Ocultar', screen: 'MostrarOcultar' },
    { text: 'Botones', screen: 'EstiloBotones' },
    { text: 'Componente Tarjeta', screen: 'ComponenteTarjeta' },
    { text: 'Chip', screen: 'ChipEjemplo' },
    { text: 'CheckBox', screen: 'CheckBox' },
    { text: 'Navegacion Tablas', screen: 'NavegacionTablas' },
    { text: 'Dialog', screen: 'Dialog_Scroll' },
    { text: 'Divider', screen: 'LineaSeparatoria' },
    { text: 'Ayudas', screen: 'Ayudas' },
    { text: 'IconoDiseno', screen: 'IconoDiseno' },
    { text: 'Listas', screen: 'MenuListas' },
    { text: 'Click Derecho Opciones', screen: 'ClickDcho' },
    { text: 'Click Derecho Clásico', screen: 'ClickDcho2' },
    { text: 'Modales', screen: 'Modales' },
    { text: 'BarraCarga', screen: 'BarraCarga' },
    { text: 'Proceso', screen: 'Proceso' },
    { text: 'Proceso', screen: 'Proceso' },
    { text: 'Proceso', screen: 'Proceso' },
    { text: 'Proceso', screen: 'Proceso' },
    { text: 'Proceso', screen: 'Proceso' },
    { text: 'Proceso', screen: 'Proceso' },
  ];

  // Función para manejar la navegación al presionar un botón
  const handleNavigation = (screenName) => {
    navigation.navigate(screenName); // Navega a la pantalla correspondiente
  };

  // Función para renderizar los botones
  const renderButtons = () => {
    return buttonsData.map((button, index) => (
      <TouchableOpacity key={index} style={styles.button} onPress={() => handleNavigation(button.screen)}>
        <Text style={styles.buttonText}>{button.text}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.gridContainer}>
          {renderButtons()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    width: '30%',
    aspectRatio: 1, 
    margin: '2%',
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default MenuDiseno;
