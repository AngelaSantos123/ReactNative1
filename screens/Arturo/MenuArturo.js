import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Text, View, Modal, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa el hook useNavigation

const MenuArturo = () => {
  const [modalVisible, setModalVisible] = useState(false); // Estado para manejar la visibilidad del modal
  const navigation = useNavigation(); // Obtiene el objeto de navegación

  // Ejemplo de datos para los botones
  const buttonsData = [
    { text: 'Pantalla 1', screen: 'Ejemplo2' },
    { text: 'Pantalla 2', screen: 'P1_Arturo' },
    { text: 'Pantalla 3', screen: 'P2_Arturo' },
    { text: 'Pantalla 4', screen: 'P3_Arturo' },
    { text: 'Efectos', screen: 'Efectos' },
    // { text: 'Pantalla 4', screen: 'P3_Arturo' },
    // { text: 'Pantalla 4', screen: 'P3_Arturo' },
  ];

  // Función para manejar la visibilidad del modal
  const handleTestButtonPress = () => {
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalVisible(false);
  };

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
          {/* Botón "¡Pruébame!" */}
          <TouchableOpacity style={styles.testButton} onPress={handleTestButtonPress}>
            <Text style={styles.testButtonText}>¡Pruébame!</Text>
          </TouchableOpacity>

          {renderButtons()}

          {/* Modal con la imagen y el mensaje */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Image source={require('../../assets/imagenes/laura.jpg')} style={styles.modalImage} />
                <Text style={styles.modalText}>¡Puta loca!</Text>
                <Button title="Cabrona" onPress={closeModal} color="#e74c3c" />
              </View>
            </View>
          </Modal>
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
    flexDirection: 'column', // Cambiado a 'column' para que el botón esté encima de los demás
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  testButton: {
    width: '60%',
    padding: 15,
    backgroundColor: '#e74c3c',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 20,
    elevation: 8,
  },
  testButtonText: {
    fontSize: 18,
    color: '#fff',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10,
  },
  modalImage: {
    width: 150,  // Ajusta el tamaño según sea necesario
    height: 150, // Ajusta el tamaño según sea necesario
    marginBottom: 20, // Espacio entre la imagen y el texto
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default MenuArturo;
