import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const EditArticulo = ({ route, navigation }) => {
  const { articuloId, categoriaId } = route.params;
  const [titulo, setTitulo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [texto, setTexto] = useState('');

  useEffect(() => {
    // Cargar el artículo existente
    const fetchArticulo = async () => {
      try {
        const response = await axios.get(`http://192.168.144.33:8000/api/categorias/${categoriaId}/articulos/${articuloId}/editar/`);
        setTitulo(response.data.data.titulo);
        setCodigo(response.data.data.codigo);
        setTexto(response.data.data.texto);
      } catch (error) {
        console.error('Error al cargar la categoría:', error);
      }
    };


    fetchArticulo(articuloId);
  }, [articuloId]);

  const handleEditArticulo = async () => {
    try {
      await axios.put(`http://192.168.144.33:8000/api/categorias/${categoriaId}/articulos/${articuloId}/editar/`, {
        titulo, codigo, texto,
      });
      Alert.alert('Éxito', 'Artículo editado correctamente.');
      navigation.goBack();
    } catch (error) {
      console.error('Error al editar el artículo:', error);
      Alert.alert('Error', 'No se pudo editar el artículo.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}/>
      <TextInput
        style={styles.input}
        placeholder="Código"
        value={codigo}
        onChangeText={setCodigo}/>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Texto"
        multiline
        value={texto}
        onChangeText={setTexto}/>
      <Button title="Editar Articulo" onPress={handleEditArticulo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#2c3e50',
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

export default EditArticulo;
