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
  Image,
} from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [filteredCategorias, setFilteredCategorias] = useState([]);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('http://192.168.144.33:8000/api/categorias/');
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

  const handleEdit = async (categoriaId, newNombre) => {
    try {
      const response = await axios.put(`http://192.168.144.33:8000/api/categorias/${categoriaId}/editar/`, {
        nombre: newNombre,
      });
      Alert.alert('Éxito', 'Categoría editada correctamente.');
      navigation.goBack();
    } catch (error) {
      console.error('Error al editar la categoría:', error);
      Alert.alert('Error', 'No se pudo editar la categoría.');
    }
  };

  const handleDelete = async (categoriaId) => {
    try {
      await axios.delete(`http://192.168.144.33:8000/api/categorias/${categoriaId}/eliminar/`);
      Alert.alert('Éxito', 'Categoría eliminada correctamente.');
      fetchCategorias(); // Vuelve a cargar las categorías después de eliminar
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
      Alert.alert('Error', 'No se pudo eliminar la categoría.');
    }
  };

  const renderCategoriaItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Articulos', { categoriaId: item.id })}>
      <Text style={styles.cardText}>{item.nombre}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('EditCategory', { categoriaId: item.id })}>
          <Image source={require('../assets/editar.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => handleDelete(item.id)}>
          <Image source={require('../assets/eliminar.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
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
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddCategory')}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('MenuArturo')}>
          <Text style={styles.fabText}>Arturo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('MenuDiseno')}>
          <Text style={styles.menuButtonText}>Menús</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('CursoCodecademy')}>
          <Text style={styles.menuButtonText}>Codecademy</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Home_Carrito')}>
          <Text style={styles.menuButtonText}>Carrito</Text>
        </TouchableOpacity>*/}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    paddingBottom: 80, // Añade suficiente espacio inferior para la visibilidad de botones
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
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
  list: {
    width: '100%',
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  fab: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    borderRadius: 30,
    elevation: 8,
  },
  fabText: {
    fontSize: 24,
    color: '#fff',
  },
  menuButton: {
    width: 80,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    borderRadius: 5,
    elevation: 8,
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;



/*import React, { useState, useCallback } from 'react';
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
  Image,
  ScrollView
} from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [filteredCategorias, setFilteredCategorias] = useState([]);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('http://192.168.144.138:8000/api/categorias/');
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

  const handleEdit = async (categoriaId, newNombre) => {
    try {
      const response = await axios.put(`http://192.168.144.138:8000/api/categorias/${categoriaId}/editar/`, {
        nombre: newNombre,
      });
      Alert.alert('Éxito', 'Categoría editada correctamente.');
      navigation.goBack();
    } catch (error) {
      console.error('Error al editar la categoría:', error);
      Alert.alert('Error', 'No se pudo editar la categoría.');
    }
  };

  const handleDelete = async (categoriaId) => {
    try {
      await axios.delete(`http://192.168.144.138:8000/api/categorias/${categoriaId}/eliminar/`);
      Alert.alert('Éxito', 'Categoría eliminada correctamente.');
      fetchCategorias(); // Vuelve a cargar las categorías después de eliminar
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
      Alert.alert('Error', 'No se pudo eliminar la categoría.');
    }
  };

  const renderCategoriaItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Articulos', { categoriaId: item.id })}>
      <Text style={styles.cardText}>{item.nombre}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('EditCategory', { categoriaId: item.id })}>
          <Image source={require('../assets/editar.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => handleDelete(item.id)}>
          <Image source={require('../assets/eliminar.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text></Text>
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
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddCategory')}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Pruebas')}>
          <Text style={styles.menuButtonText}>Menús</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('CursoCodecademy')}>
          <Text style={styles.menuButtonText}>Codecademy</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  innerContainer: {
    flex: 1,
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
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
  list: {
    width: '100%',
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  fab: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    borderRadius: 30,
    elevation: 8,
  },
  fabText: {
    fontSize: 24,
    color: '#fff',
  },
  menuButton: {
    width: 80,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    borderRadius: 5,
    elevation: 8,
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;*/













/*
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
  Image
} from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [filteredCategorias, setFilteredCategorias] = useState([]);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('http://192.168.144.138:8000/api/categorias/');
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

  const handleEdit = async (categoriaId, newNombre) => {
    try {
      const response = await axios.put(`http://192.168.144.138:8000/api/categorias/${categoriaId}/editar/`, {
        nombre: newNombre,
      });
      Alert.alert('Éxito', 'Categoría editada correctamente.');
      navigation.goBack();
    } catch (error) {
      console.error('Error al editar la categoría:', error);
      Alert.alert('Error', 'No se pudo editar la categoría.');
    }
  };

  const handleDelete = async (categoriaId) => {
    try {
      await axios.delete(`http://192.168.144.138:8000/api/categorias/${categoriaId}/eliminar/`);
      Alert.alert('Éxito', 'Categoría eliminada correctamente.');
      fetchCategorias(); // Vuelve a cargar las categorías después de eliminar
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
      Alert.alert('Error', 'No se pudo eliminar la categoría.');
    }
  };

  const renderCategoriaItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Articulos', { categoriaId: item.id })}>
      <Text style={styles.cardText}>{item.nombre}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('EditCategory', { categoriaId: item.id })}>
          <Image source={require('../assets/editar.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => handleDelete(item.id)}>
          <Image source={require('../assets/eliminar.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text></Text>
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
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddCategory')}>
            <Text style={styles.fabText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Pruebas')}>
            <Text style={styles.menuButtonText}>Menús</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('CursoCodecademy')}>
            <Text style={styles.menuButtonText}>Codecademy</Text>
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
  },
  innerContainer: {
    flex: 1,
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
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
  list: {
    width: '100%',
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  fab: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    borderRadius: 30,
    elevation: 8,
    marginRight: 10,
  },
  fabText: {
    fontSize: 24,
    color: '#fff',
  },
  menuButton: {
    width: 80,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    borderRadius: 5,
    elevation: 8,
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;
*/
