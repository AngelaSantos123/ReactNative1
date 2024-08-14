import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, Button, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

// Importar imágenes de los íconos de ojo
import eyeOpen from '../../assets/abierto.png';
import eyeClosed from '../../assets/cerrado.png';

// Importar las imágenes seleccionables
import image1 from '../../assets/gato.jpg';
import image2 from '../../assets/perro.jpg';
import image3 from '../../assets/leon.jpg';
import image4 from '../../assets/tigre.jpg';
import image5 from '../../assets/mas.png';

const TextInputs = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);

  const navigation = useNavigation();

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
      console.log('Usuario registrado');
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
    if (selectedImage) {
      setModalVisible(true); // Mostrar el modal para seleccionar otra imagen
    } else {
      setModalVisible(true); // Mostrar el modal inicial para seleccionar una imagen
    }
  };

  // Función para manejar la selección de imagen desde el modal
  const handleThumbnailPress = (image) => {
    setSelectedImage(image); // Actualiza el estado con la imagen seleccionada
    setModalVisible(false); // Cierra el modal después de seleccionar la imagen
  };

  // Función para abrir la galería y seleccionar una imagen
  const openImagePicker = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permisos insuficientes', 'Se requiere permiso para acceder a la galería de imágenes.');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true, // Permite editar la imagen antes de seleccionarla
        aspect: [1, 1], // Proporción de aspecto cuadrada (opcional, ajusta según necesites)
        quality: 1, // Calidad de la imagen (1 es la máxima calidad)
      });
      // pickerResult.uri = ImagePicker;

      if (!pickerResult.cancelled) {
        setSelectedImage({ uri: pickerResult.uri });
        setModalVisible(false); // Cierra el modal después de seleccionar la imagen
      }
    } catch (error) {
      console.error('Error al seleccionar imagen desde la galería:', error);
      Alert.alert('Error', 'Hubo un problema al seleccionar la imagen desde la galería.');
    }
  };

  // Función para cerrar el modal al presionar fuera de él
  const closeModal = () => {
    setModalVisible(false);
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {selectedImage ? (
        <TouchableOpacity style={styles.imageButton} onPress={handleImagePress}>
          <Image source={selectedImage} style={styles.selectedImage} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.imageButton} onPress={handleImagePress}>
          <Image source={require('../../assets/editar.png')} style={styles.imageIcon} />
        </TouchableOpacity>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={() => handleThumbnailPress(image1)}>
                <Image source={image1} style={styles.thumbnailImage} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleThumbnailPress(image2)}>
                <Image source={image2} style={styles.thumbnailImage} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleThumbnailPress(image3)}>
                <Image source={image3} style={styles.thumbnailImage} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleThumbnailPress(image4)}>
                <Image source={image4} style={styles.thumbnailImage} />
              </TouchableOpacity>
              <TouchableOpacity onPress={openImagePicker}>
                <Image source={image5} style={styles.thumbnailImage} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Text style={styles.saludo}>{name ? `Hola ${name}` : 'Hola'}</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={(text) => setName(text)}
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
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="Ingrese su contraseña"
            placeholderTextColor="#666"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity style={styles.eyeButton} onPress={togglePasswordVisibility}>
            <Image source={showPassword ? eyeOpen : eyeClosed} style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Registrar" onPress={handleRegistroSubmit} color="#3498db" />
        <View style={styles.buttonSpacing} />
        <Button title="Ver Usuarios" onPress={() => navigation.navigate('Usuarios')} color="#3498db" />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Proceso')}>
        <Text style={styles.forgotPassword}>¿Has olvidado tu contraseña?</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  imageButton: {
    marginBottom: 16,
    width: 125,
    height: 125,
    borderRadius: 125 / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  imageIcon: {
    width: 50,
    height: 50,
  },
  selectedImage: {
    width: 125,
    height: 125,
    borderRadius: 125 / 2,
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
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b0b0b0',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b0b0b0',
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16, // Espacio adicional debajo de los botones
  },
  buttonSpacing: {
    width: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    flexWrap: 'wrap',
  },
  thumbnailImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
  },
  forgotPassword: {
    color: '#3498db',
    fontSize: 16,
    marginTop: 8, // Aumentar el margen superior
    textAlign: 'center',
  },
});

export default TextInputs;
