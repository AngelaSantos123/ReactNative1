import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
// import Tarjetas from '../screens/Curso/Tarjetas';
import Tarjetas from './Tarjetas';
const Publicar = ({ navigation }) => {
  const [inputNombre, setInputNombre] = useState('');
  const [inputDescripcion, setInputDescripcion] = useState('');
  const [inputAutor, setInputAutor] = useState('');
  const [categoriasCreadas, setCategoriasCreadas] = useState([]);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('http://192.168.144.33:8000/api/categorias1/');
      setCategoriasCreadas(response.data.data); // Asegúrate de acceder al array dentro de response.data
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      Alert.alert('Error', 'Hubo un problema al obtener las categorías.');
    }
  };

  const handleCategoriaSubmit = () => {
    console.log('Creando categoría:', inputNombre, inputDescripcion, inputAutor); // Log para depuración
    axios.post('http://192.168.144.33:8000/api/categorias1/', {
      nombre: inputNombre,
      descripcion: inputDescripcion,
      autor: inputAutor
    })
      .then(response => {
        console.log('Respuesta del servidor:', response.data); // Log para depuración
        Alert.alert('Éxito', `Categoría creada: ${response.data.data.nombre}`);
        setInputNombre('');
        setInputDescripcion('');
        setInputAutor('');
        fetchCategorias(); // Actualizar la lista de categorías después de crear una nueva
      })
      .catch(error => {
        console.error('Error al crear categoría:', error);
        Alert.alert('Error', 'Hubo un problema al crear la publicación.');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la publicación"
        placeholderTextColor="#ecf0f1"
        value={inputNombre}
        onChangeText={setInputNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        placeholderTextColor="#ecf0f1"
        value={inputDescripcion}
        onChangeText={setInputDescripcion}
      />
      <TextInput
        style={styles.input}
        placeholder="Autor"
        placeholderTextColor="#ecf0f1"
        value={inputAutor}
        onChangeText={setInputAutor}
      />
      <Button title="Agregar publicación" onPress={handleCategoriaSubmit} color="#3498db" />

      <View style={styles.spacing} />

      <Tarjetas categoriasCreadas={categoriasCreadas} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
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
  spacing: {
    height: 20, // Espacio entre el botón y las tarjetas
  },
});

export default Publicar;




/*
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text, FlatList } from 'react-native';
import axios from 'axios';

const Publicar = ({ navigation }) => {
  const [inputNombre, setInputNombre] = useState('');
  const [inputDescripcion, setInputDescripcion] = useState('');
  const [inputAutor, setInputAutor] = useState('');
  const [categoriasCreadas, setCategoriasCreadas] = useState([]);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('http://192.168.144.33:8000/api/categorias1/');
      setCategoriasCreadas(response.data.data); // Asegurarte de acceder al array dentro de response.data
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      Alert.alert('Error', 'Hubo un problema al obtener las categorías.');
    }
  };

  const handleCategoriaSubmit = () => {
    console.log('Creando categoría:', inputNombre, inputDescripcion, inputAutor); // Log para depuración
    axios.post('http://192.168.144.33:8000/api/categorias1/', {
      nombre: inputNombre,
      descripcion: inputDescripcion,
      autor: inputAutor
    })
      .then(response => {
        console.log('Respuesta del servidor:', response.data); // Log para depuración
        Alert.alert('Éxito', `Categoría creada: ${response.data.data.nombre}`);
        setInputNombre('');
        setInputDescripcion('');
        setInputAutor('');
        fetchCategorias(); // Actualizar la lista de categorías después de crear una nueva
        // navigation.goBack(); // Puedes mantener esta línea si deseas volver a la pantalla anterior
      })
      .catch(error => {
        console.error('Error al crear categoría:', error);
        Alert.alert('Error', 'Hubo un problema al crear la publicación.');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la publicación"
        placeholderTextColor="#ecf0f1"
        value={inputNombre}
        onChangeText={setInputNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        placeholderTextColor="#ecf0f1"
        value={inputDescripcion}
        onChangeText={setInputDescripcion}
      />
      <TextInput
        style={styles.input}
        placeholder="Autor"
        placeholderTextColor="#ecf0f1"
        value={inputAutor}
        onChangeText={setInputAutor}
      />
      <Button title="Agregar publicación" onPress={handleCategoriaSubmit} color="#3498db" />

      <FlatList
        style={styles.flatList}
        data={categoriasCreadas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.categoriaContainer}>
            <Text style={styles.categoriaText}>{item.nombre}</Text>
            <Text style={styles.categoriaDescription}>{item.descripcion}</Text>
            <Text style={styles.categoriaAutor}>Autor: {item.autor}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay categorías creadas aún.</Text>
          </View>
        )}
      />
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
  flatList: {
    marginTop: 20,
    width: '100%',
    flex: 1, // Asegura que FlatList ocupe el espacio restante
  },
  categoriaContainer: {
    marginTop: 10,
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  categoriaText: {
    color: '#ecf0f1',
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoriaDescription: {
    color: '#ecf0f1',
    fontSize: 14,
    marginTop: 5,
  },
  categoriaAutor: {
    color: '#ecf0f1',
    fontSize: 14,
    marginTop: 5,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    color: '#ecf0f1',
    fontSize: 16,
  },
});

export default Publicar;






/!*
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text, FlatList } from 'react-native';
import axios from 'axios';

const Publicar = ({ navigation }) => {
  const [inputNombre, setInputNombre] = useState('');
  const [inputDescripcion, setInputDescripcion] = useState('');
  const [inputAutor, setInputAutor] = useState('');
  const [categoriasCreadas, setCategoriasCreadas] = useState([]);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('http://192.168.144.33:8000/api/categorias1/');
      setCategoriasCreadas(response.data.data); // Asegurarte de acceder al array dentro de response.data
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      Alert.alert('Error', 'Hubo un problema al obtener las categorías.');
    }
  };

  const handleCategoriaSubmit = () => {
    console.log('Creando categoría:', inputNombre, inputDescripcion, inputAutor); // Log para depuración
    axios.post('http://192.168.144.33:8000/api/categorias1/', {
      nombre: inputNombre,
      descripcion: inputDescripcion,
      autor: inputAutor
    })
      .then(response => {
        console.log('Respuesta del servidor:', response.data); // Log para depuración
        Alert.alert('Éxito', `Categoría creada: ${response.data.data.nombre}`);
        setInputNombre('');
        setInputDescripcion('');
        setInputAutor('');
        fetchCategorias(); // Actualizar la lista de categorías después de crear una nueva
        // navigation.goBack(); // Puedes mantener esta línea si deseas volver a la pantalla anterior
      })
      .catch(error => {
        console.error('Error al crear categoría:', error);
        Alert.alert('Error', 'Hubo un problema al crear la publicación.');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la publicación"
        placeholderTextColor="#ecf0f1"
        value={inputNombre}
        onChangeText={setInputNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        placeholderTextColor="#ecf0f1"
        value={inputDescripcion}
        onChangeText={setInputDescripcion}
      />
      <TextInput
        style={styles.input}
        placeholder="Autor"
        placeholderTextColor="#ecf0f1"
        value={inputAutor}
        onChangeText={setInputAutor}
      />
      <Button title="Agregar publicación" onPress={handleCategoriaSubmit} color="#3498db" />

      <FlatList
        style={{ marginTop: 20, width: '100%' }}
        data={categoriasCreadas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.categoriaContainer}>
            <Text style={styles.categoriaText}>{item.nombre}</Text>
            <Text style={styles.categoriaDescription}>{item.descripcion}</Text>
            <Text style={styles.categoriaAutor}>Autor: {item.autor}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay categorías creadas aún.</Text>
          </View>
        )}
      />
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
  categoriaContainer: {
    marginTop: 10,
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  categoriaText: {
    color: '#ecf0f1',
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoriaDescription: {
    color: '#ecf0f1',
    fontSize: 14,
    marginTop: 5,
  },
  categoriaAutor: {
    color: '#ecf0f1',
    fontSize: 14,
    marginTop: 5,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    color: '#ecf0f1',
    fontSize: 16,
  },
});

export default Publicar;*!/
*/
