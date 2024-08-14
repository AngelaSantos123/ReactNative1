import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const EditCategory = ({ route, navigation }) => {
  const { categoriaId } = route.params;
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    // Cargar la categoría existente
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://192.168.144.33:8000/api/categorias/${categoriaId}/`);
        setNombre(response.data.data.nombre);
      } catch (error) {
        console.error('Error al cargar la categoría:', error);
      }
    };
    

    fetchCategory();
  }, [categoriaId]);

  const handleEditCategory = async () => {
    try {
      await axios.put(`http://192.168.144.33:8000/api/categorias/${categoriaId}/editar/`, {
        nombre,
      });
      Alert.alert('Éxito', 'Categoría editada correctamente.');
      navigation.goBack();
    } catch (error) {
      console.error('Error al editar la categoría:', error);
      Alert.alert('Error', 'No se pudo editar la categoría.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la categoría"
        value={nombre}
        onChangeText={setNombre}
      />
      <Button title="Editar Categoría" onPress={handleEditCategory} />
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

export default EditCategory;
