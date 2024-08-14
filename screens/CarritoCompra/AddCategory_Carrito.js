import React, { useState } from 'react';
import {StyleSheet, View, TextInput, Button, Alert, Text, TouchableOpacity} from 'react-native';
import axios from 'axios';

const AddCategory_Carrito = ({ navigation }) => {
  const [inputCategoria, setInputCategoria] = useState('');

  const handleCategoriaSubmit = () => {
    console.log('Creando categoría:', inputCategoria); // Log para depuración
    axios.post('http://192.168.144.33:8000/api/carrito/categorias/', { nombre: inputCategoria })
      .then(response => {
        console.log('Respuesta del servidor:', response.data); // Log para depuración
        Alert.alert('Éxito', `Categoría creada: ${response.data.nombre}`);
        setInputCategoria('');
        navigation.goBack(); // Volver a la pantalla anterior (HomeScreen)
      })
      .catch(error => {
        console.error('Error al crear categoría:', error);
        Alert.alert('Error', 'Hubo un problema al crear la categoría.');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la categoría"
        placeholderTextColor="#ecf0f1"
        value={inputCategoria}
        onChangeText={setInputCategoria}
      />
      <Button title="Agregar categoría" onPress={handleCategoriaSubmit} color="#3498db" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#2c3e50',
    borderWidth: 1,
    backgroundColor: '#34495e',
    color: '#ecf0f1',
    borderRadius: 5,
    marginBottom: 12,
    width: '100%',
    paddingHorizontal: 8,
  },
});

export default AddCategory_Carrito;