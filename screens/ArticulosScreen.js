import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, FlatList, SafeAreaView, TouchableOpacity, Image, View, Alert } from 'react-native';
import axios from 'axios';

const ArticulosScreen = ({ route, navigation }) => {
  const { categoriaId } = route.params;
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    fetchArticulos(categoriaId);
  }, [categoriaId]);

  const fetchArticulos = (id) => {
    axios.get(`http://192.168.144.33:8000/api/categorias/${id}/articulos/`)
      .then(response => {
        setArticulos(response.data.data); // Asumiendo que response.data.data contiene los datos de los artículos
      })
      .catch(error => {
        console.error('Error al obtener artículos:', error);
      });
  };

  const handleEditArticulo = async (articuloId, newData) => {
    try {
      const response = await axios.put(`http://192.168.144.33:8000/api/articulos/${articuloId}/editar/`, newData);
      Alert.alert('Éxito', 'Artículo editado correctamente.');
      // Refrescar la lista de artículos
      fetchArticulos(categoriaId);
    } catch (error) {
      console.error('Error al editar el artículo:', error);
      Alert.alert('Error', 'No se pudo editar el artículo.');
    }
  };

  const handleDeleteArticulo = async (articuloId) => {
    try {
      await axios.delete(`http://192.168.144.33:8000/api/categorias/${categoriaId}/articulos/${articuloId}/eliminar/`);
      Alert.alert('Éxito', 'Artículo eliminado correctamente.');
      // Refrescar la lista de artículos
      fetchArticulos(categoriaId);
    } catch (error) {
      console.error('Error al eliminar el artículo:', error);
      Alert.alert('Error', 'No se pudo eliminar el artículo.');
    }
  };

  const renderArticuloItem = ({ item }) => (
    <TouchableOpacity style={styles.articleCard}>
      <Text style={styles.articleTitle}>{item.titulo}</Text>
      <Text style={styles.articleCode}>{item.codigo}</Text>
      <Text style={styles.articleText}>{item.texto}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.iconButton, styles.editButton]} onPress={() => navigation.navigate('EditArticulo', { articuloId: item.id, categoriaId })}>
          <Image source={require('../assets/editar.png')} style={styles.icon}/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconButton, styles.deleteButton]} onPress={() => handleDeleteArticulo(item.id)}>
          <Image source={require('../assets/eliminar.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articulos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderArticuloItem}
        style={styles.list}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddArticulo', { categoriaId })}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  list: {
    width: '100%',
    marginTop: 20,
  },
  listContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  articleCard: {
    backgroundColor: '#34495e',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  articleTitle: {
    fontSize: 20,
    color: '#ecf0f1',
    marginBottom: 10,
  },
  articleCode: {
    fontSize: 16,
    color: '#2ecc71',
    marginBottom: 10,
    fontFamily: 'monospace',
  },
  articleText: {
    fontSize: 16,
    color: '#ecf0f1',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  buttonColumn: {
    alignItems: 'flex-end',
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: '#3498db',
    borderRadius: 30,
    elevation: 8,
  },
  fabText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default ArticulosScreen;