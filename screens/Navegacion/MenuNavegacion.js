import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa el hook useNavigation

const MenuNavegacion = () => {
  const navigation = useNavigation(); // Obtiene el objeto de navegación

  // Ejemplo de datos para los botones
  const buttonsData = [
    { text: 'Navegación Hamburguesa', screen: 'DrawerNavigator' },
    { text: 'Navegación Tabulada Abajo', screen: 'BottomTabNavigator' },
    { text: 'Navegación Tabulada Arriba', screen: 'TopTabNavigator' },
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
    width: '30%', // Ancho del botón según la cantidad de columnas deseada
    aspectRatio: 1, // Relación de aspecto 1:1 para cuadrados
    margin: '2%', // Margen entre botones
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

export default MenuNavegacion;
