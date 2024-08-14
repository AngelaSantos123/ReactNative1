import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, Button, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

// Importar imágenes de los íconos de ojo
import eyeOpen from '../../assets/abierto.png';
import eyeClosed from '../../assets/cerrado.png';

const RegistroDatos = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://192.168.144.33:8000/api/registros/');
      setUsuarios(response.data.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      Alert.alert('Error', 'Hubo un problema al obtener los usuarios.');
    }
  };

  const handleRegistroSubmit = async () => {
    try {
      const response = await axios.post('http://192.168.144.33:8000/api/registros/', {
        nombre: name,
        contra: password,
      });
      Alert.alert('Éxito', `Usuario registrado: ${response.data.data.nombre}`);
      setName('');
      setPassword('');
      fetchUsuarios();
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      Alert.alert('Error', 'Hubo un problema al registrar el usuario.');
    }
  };

  // Función para manejar el clic en el botón de imagen
  const handleImagePress = async () => {
    Alert.alert(
      'Dar acceso a la cámara',
      '',
      [
        {
          text: 'No',
          onPress: () => console.log('No se dio acceso a la cámara'),
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Se necesita acceso a la galería para seleccionar una imagen.');
              return;
            }
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });
            if (!result.canceled) {
              setSelectedImage(result.uri);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
      ) : (
        <TouchableOpacity style={styles.imageButton} onPress={handleImagePress}>
          <Image source={require('../../assets/editar.png')} style={styles.imageIcon} />
        </TouchableOpacity>
      )}
      <Text style={styles.saludo}>{name ? `Hola ${name}` : 'Hola'}</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.nameInput} // Estilo para el TextInput del nombre
          onChangeText={text => setName(text)}
          value={name}
          placeholder="Ingrese su nombre"
          placeholderTextColor="#666"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contraseña:</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            onChangeText={text => setPassword(text)}
            value={password}
            placeholder="Ingrese su contraseña"
            placeholderTextColor="#666"
            secureTextEntry={!showPassword} // Mostrar texto oculto si showPassword es falso
          />
          <TouchableOpacity style={styles.eyeButton} onPress={togglePasswordVisibility}>
            <Image source={showPassword ? eyeOpen : eyeClosed} style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <Button title="Registrar" onPress={handleRegistroSubmit} color="#3498db" />

      <View style={styles.spacing} />

      {usuarios.length > 0 ? (
        usuarios.map((usuario) => (
          <View key={usuario.id} style={styles.card}>
            <Text style={styles.title}>{usuario.nombre}</Text>
            <Text style={styles.description}>Contraseña: {usuario.contra}</Text>
          </View>
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay usuarios registrados aún.</Text>
        </View>
      )}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0', // Fondo gris claro
  },
  imageButton: {
    marginBottom: 16,
    width: 125,
    height: 125,
    borderRadius: 125 / 2, // Hace que sea un círculo
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0', // Fondo azul clarito
  },
  imageIcon: {
    width: 50,
    height: 50,
  },
  selectedImage: {
    width: 125,
    height: 125,
    borderRadius: 125 / 2, // Para hacerlo circular, usa la mitad del ancho/alto
    marginBottom: 16,
  },
  saludo: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'left',
  },
  nameInput: {
    width: '100%',
    padding: 12,
    backgroundColor: '#e0e0e0', // Fondo azul clarito
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b0b0b0', // Borde de color gris
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    backgroundColor: '#e0e0e0', // Fondo azul clarito
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b0b0b0', // Borde de color gris
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: '#666', // Color gris para el icono inicial
  },
});
export default RegistroDatos;


/*import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Importar imágenes de los íconos de ojo
import eyeOpen from '../../assets/abierto.png';
import eyeClosed from '../../assets/cerrado.png';

const RegistroDatos = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Función para manejar el clic en el botón de imagen
  const handleImagePress = async () => {
    Alert.alert(
      'Dar acceso a la cámara',
      '',
      [
        {
          text: 'No',
          onPress: () => console.log('No se dio acceso a la cámara'),
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Se necesita acceso a la galería para seleccionar una imagen.');
              return;
            }
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });
            if (!result.canceled) {
              setSelectedImage(result.uri);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
      ) : (
        <TouchableOpacity style={styles.imageButton} onPress={handleImagePress}>
          <Image source={require('../../assets/editar.png')} style={styles.imageIcon} />
        </TouchableOpacity>
      )}
      <Text style={styles.saludo}>{name ? `Hola ${name}` : 'Hola'}</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.nameInput} // Estilo para el TextInput del nombre
          onChangeText={text => setName(text)}
          value={name}
          placeholder="Ingrese su nombre"
          placeholderTextColor="#666"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contraseña:</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            onChangeText={text => setPassword(text)}
            value={password}
            placeholder="Ingrese su contraseña"
            placeholderTextColor="#666"
            secureTextEntry={!showPassword} // Mostrar texto oculto si showPassword es falso
          />
          <TouchableOpacity style={styles.eyeButton} onPress={togglePasswordVisibility}>
            <Image source={showPassword ? eyeOpen : eyeClosed} style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0', // Fondo gris claro
  },
  imageButton: {
    marginBottom: 16,
    width: 125,
    height: 125,
    borderRadius: 125 / 2, // Hace que sea un círculo
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0', // Fondo azul clarito
  },
  imageIcon: {
    width: 50,
    height: 50,
  },
  selectedImage: {
    width: 125,
    height: 125,
    borderRadius: 125 / 2, // Para hacerlo circular, usa la mitad del ancho/alto
    marginBottom: 16,
  },
  saludo: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'left',
  },
  nameInput: {
    width: '100%',
    padding: 12,
    backgroundColor: '#e0e0e0', // Fondo azul clarito
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b0b0b0', // Borde de color gris
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    backgroundColor: '#e0e0e0', // Fondo azul clarito
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b0b0b0', // Borde de color gris
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: '#666', // Color gris para el icono inicial
  },
});

export default RegistroDatos;*/


