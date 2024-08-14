import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CursoCodecademy = () => {
  const navigation = useNavigation(); // Obtiene el objeto de navegación

  const buttonsData = [
    { text: 'Barras', screen: 'G_Barras' },
    { text: 'Circular', screen: 'G_Circular' },
    { text: 'Puntos', screen: 'G_Puntos' },
    { text: 'Gráficas', screen: 'MyChart' },

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

export default CursoCodecademy;
