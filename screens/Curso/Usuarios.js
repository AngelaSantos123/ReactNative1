import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, Button, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

// Importar imágenes de los íconos de ojo
import eyeOpen from '../../assets/abierto.png';
import eyeClosed from '../../assets/cerrado.png';

const Usuarios = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para manejar el estado de inicio de sesión
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

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.get('http://192.168.144.33:8000/api/registros/');
      const users = response.data.data;
      const user = users.find(u => u.nombre === name && u.contra === password);
      if (user) {
        console.log('Has iniciado sesión');
        Alert.alert('Éxito', `Bienvenido ${user.nombre}`);
        setIsLoggedIn(true); // Cambiar el estado a true cuando se inicia sesión correctamente
      } else {
        console.log('Datos incorrectos');
        Alert.alert('Error', 'Nombre de usuario o contraseña incorrectos');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error en la solicitud:', error.response);
      } else {
        console.error('Error:', error.message);
      }
      Alert.alert('Error', 'Hubo un problema al iniciar sesión.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Cambiar el estado a false para cerrar sesión
    navigation.goBack(); // Regresar a la pantalla anterior
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.saludo}>{isLoggedIn ? `Bienvenid@ ${name}` : 'Iniciar Sesión'}</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={text => setName(text)}
          value={name}
          placeholder="Ingrese su nombre"
          placeholderTextColor="#666"
          editable={!isLoggedIn} // Hacer no editable si ya está iniciada la sesión
          selectTextOnFocus={!isLoggedIn} // No seleccionar texto automáticamente si ya está iniciada la sesión
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
            secureTextEntry={!showPassword}
            editable={!isLoggedIn} // Hacer no editable si ya está iniciada la sesión
            selectTextOnFocus={!isLoggedIn} // No seleccionar texto automáticamente si ya está iniciada la sesión
          />
          <TouchableOpacity style={styles.eyeButton} onPress={togglePasswordVisibility}>
            <Image source={showPassword ? eyeOpen : eyeClosed} style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>
      </View>
      {isLoggedIn ? (
        <Button title="Cerrar Sesión" onPress={handleLogout} color="#e74c3c" />
      ) : (
        <Button title="Iniciar Sesión" onPress={handleLoginSubmit} color="#3498db" />
      )}
      {isLoggedIn && usuarios.length > 0 ? (
        <ScrollView style={styles.userList}>
          {usuarios.map((usuario) => (
            <View key={usuario.id} style={styles.card}>
              <Text style={styles.title}>{usuario.nombre}</Text>
              <Text style={styles.description}>Contraseña: {usuario.contra}</Text>
            </View>
          ))}
        </ScrollView>
      ) : isLoggedIn ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay usuarios registrados aún.</Text>
        </View>
      ) : null}
    </View>
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
  userList: {
    flex: 1,
    width: '100%',
  },
  card: {
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default Usuarios;
