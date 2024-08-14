import React from 'react';
import { Platform, StatusBar, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Videos = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.boxContainer}>
          <View style={styles.redBox} />
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
    backgroundColor: 'blue',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  innerContainer: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  boxContainer: {
    height: 100,
    width: 100,
    backgroundColor: 'red',
  },
  redBox: {
    flex: 1,
  },
  volverButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  volverText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Videos;



/*
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';

const Videos = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Introduce la URL del video:</Text>
      <TextInput
        style={styles.input}
        placeholder="URL del video"
        value={videoUrl}
        onChangeText={(text) => setVideoUrl(text)}
      />

      <TouchableOpacity style={styles.button} onPress={togglePlayPause}>
        <Text style={styles.buttonText}>{isPlaying ? 'Pausar' : 'Reproducir'}</Text>
      </TouchableOpacity>

      <View style={styles.videoContainer}>
        {videoUrl ? (
          <Video
            source={{ uri: videoUrl }}
            style={styles.video}
            resizeMode="contain"
            paused={!isPlaying}
            repeat={true}
            onError={(error) => console.log('Error al reproducir el video:', error)}
          />
        ) : (
          <Text style={styles.placeholderText}>Introduce una URL y presiona Reproducir</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b0b0b0',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    width: 150,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  videoContainer: {
    width: 320,
    height: 180,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
  },
});

export default Videos;
*/




/*import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const Videos = () => {
  const handleAlertWithTitle = () => {
    Alert.alert(
      'Alerta con Título',
      'Este es un mensaje de alerta con título.',
      [{ text: 'OK' }]
    );
  };

  const handleConfirmationAlert = () => {
    Alert.alert(
      'Confirmación',
      '¿Estás seguro de realizar esta acción?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Aceptar', onPress: () => console.log('Acción confirmada') }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleAlertWithTitle}>
        <Text style={styles.buttonText}>Alerta con Título</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleConfirmationAlert}>
        <Text style={styles.buttonText}>Alerta de Confirmación</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  button: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default Videos;*/
