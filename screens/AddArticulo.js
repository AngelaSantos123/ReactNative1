import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const AddArticulo = ({ route, navigation }) => {
  const { categoriaId } = route.params;
  const [inputTitulo, setInputTitulo] = useState('');
  const [inputCodigo, setInputCodigo] = useState('');
  const [inputTexto, setInputTexto] = useState('');

  const handleArticleSubmit = () => {
    console.log('Creando artículo:', { titulo: inputTitulo, codigo: inputCodigo, texto: inputTexto });
    axios.post(`http://192.168.144.33:8000/api/categorias/${categoriaId}/articulos/crear/`, { titulo: inputTitulo, codigo: inputCodigo, texto: inputTexto })
      .then(response => {
        console.log('Respuesta del servidor:', response.data);
        Alert.alert('Éxito', `Artículo creado: ${response.data.titulo}`);
        setInputTitulo('');
        setInputCodigo('');
        setInputTexto('');
        navigation.goBack(); // Volver a la pantalla anterior (ArticulosScreen)
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
        placeholder="Código del artículo"
        placeholderTextColor="#ecf0f1"
        value={inputCodigo}
        onChangeText={setInputCodigo}
      />
      <TextInput
        style={styles.input}
        placeholder="Texto del artículo"
        placeholderTextColor="#ecf0f1"
        value={inputTexto}
        onChangeText={setInputTexto}
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

export default AddArticulo;
