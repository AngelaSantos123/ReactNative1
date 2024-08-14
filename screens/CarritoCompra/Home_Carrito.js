import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  TextInput,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  Alert,
} from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home_Carrito = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [filteredCategorias, setFilteredCategorias] = useState([]);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('http://192.168.144.33:8000/api/carrito/categorias/');
      console.log('Respuesta del servidor:', response.data);
      const categorias = response.data.data;
      setCategorias(categorias);
      setFilteredCategorias(categorias);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      Alert.alert('Error', 'No se pudieron cargar las categorías.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      console.log('Pantalla enfocada, recargando categorías');
      fetchCategorias();
    }, [])
  );

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = categorias.filter(categoria =>
      categoria.nombre.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCategorias(filtered);
  };

  const renderCategoriaItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Articulos_Carrito', { categoriaId: item.id })}>
      <Text style={styles.cardText}>{item.nombre}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar categoría"
          placeholderTextColor="#ecf0f1"
          value={searchText}
          onChangeText={handleSearch}
        />
        <FlatList
          data={filteredCategorias}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCategoriaItem}
          style={styles.list}
          contentContainerStyle={styles.listContainer}
        />
        <View style={styles.footerContainer}>
          <TouchableOpacity 
            style={styles.fab} 
            onPress={() => navigation.navigate('AddCategory_Carrito')}
          >
            <Text style={styles.fabText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('ListaCarrito')}
          >
            <Icon name="shopping-cart" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    justifyContent: 'flex-end', // Ensures that the footer is pushed to the bottom
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    paddingBottom: 80, // Adjusted to fit footer
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
  card: {
    backgroundColor: '#34495e',
    padding: 20,
    marginVertical: 8,
    width: '100%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    color: '#ecf0f1',
  },
  list: {
    width: '100%',
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#2c3e50',
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  fab: {
    backgroundColor: '#1abc9c',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fabText: {
    fontSize: 24,
    color: '#fff',
  },
  iconButton: {
    backgroundColor: '#e74c3c',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Home_Carrito;
