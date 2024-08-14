import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const AddArticulo_Carrito = ({ route, navigation }) => {
  const { categoriaId } = route.params;
  const [inputTitulo, setInputTitulo] = useState('');
  const [inputPrecio, setInputPrecio] = useState('');
  const [inputDescuentos, setInputDescuentos] = useState('');

  // Función para validar el descuento
  const validateDiscount = (descuento) => {
    const descuentoNumber = parseFloat(descuento);
    return !isNaN(descuentoNumber) && descuentoNumber >= 0 && descuentoNumber <= 100;
  };

  // Función para validar el precio
  const validatePrice = (precio) => {
    const precioNumber = parseFloat(precio);
    return !isNaN(precioNumber) && precioNumber > 0;
  };

  // Función para manejar el envío del artículo
  const handleArticleSubmit = () => {
    // Validar el descuento
    if (!validateDiscount(inputDescuentos)) {
      Alert.alert(
        'Descuento inválido',
        'El descuento debe estar entre 0 y 100.',
        [
          { text: 'OK', onPress: () => setInputDescuentos('') } // Limpiar el campo de descuento
        ]
      );
      return;
    }

    // Validar el precio
    if (!validatePrice(inputPrecio)) {
      Alert.alert(
        'Precio inválido',
        'El precio debe ser un número positivo.',
        [
          { text: 'OK', onPress: () => setInputPrecio('') } // Limpiar el campo de precio
        ]
      );
      return;
    }

    console.log('Creando artículo:', { titulo: inputTitulo, precio: inputPrecio, descuentos: inputDescuentos });

    // Enviar la solicitud al servidor
    axios.post(`http://192.168.144.33:8000/api/carrito/categorias/${categoriaId}/articulos/crear/`, {
      titulo: inputTitulo,
      precio: inputPrecio,
      descuentos: inputDescuentos
    })
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
        Alert.alert('Éxito', `Artículo creado: ${response.data.titulo}`);
        setInputTitulo('');
        setInputPrecio('');
        setInputDescuentos('');
        navigation.goBack(); // Volver a la pantalla anterior
      })
      .catch(error => {
        console.error('Error al crear artículo:', error);
        Alert.alert('Error', 'Hubo un problema al crear el artículo.');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del artículo"
        placeholderTextColor="#ecf0f1"
        value={inputTitulo}
        onChangeText={setInputTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        placeholderTextColor="#ecf0f1"
        value={inputPrecio}
        onChangeText={setInputPrecio}
        keyboardType="numeric" // Asegura que el teclado sea numérico
      />
      <TextInput
        style={styles.input}
        placeholder="Descuento (0-100)"
        placeholderTextColor="#ecf0f1"
        value={inputDescuentos}
        onChangeText={setInputDescuentos}
        keyboardType="numeric" // Asegura que el teclado sea numérico
      />
      <Button title="Agregar artículo" onPress={handleArticleSubmit} color="#3498db" />
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

export default AddArticulo_Carrito;
