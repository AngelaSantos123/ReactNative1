import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';

const ControlVolumen = () => {
  const [volume, setVolume] = useState(0.5);
  const [sound, setSound] = useState(null);

  const loadSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/cancion1.mp3') // Lugar donde se localiza la canción
    );
    setSound(sound);
    await sound.playAsync();
    await sound.setVolumeAsync(volume);
  };

  const unloadSound = async () => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }
  };

  useEffect(() => {
    loadSound();
    return () => {
      unloadSound();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Para darle al play
      if (sound) {
        sound.playAsync();
      }

      // Para pararlo
      return () => {
        if (sound) {
          sound.pauseAsync();
        }
      };
    }, [sound])
  );

  const handleVolumeChange = async (value) => {
    setVolume(value);
    if (sound) {
      await sound.setVolumeAsync(value);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/speaker.png')} style={styles.speakerIcon} /> {/*Ruta donde se encuentra la imagen*/}
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={handleVolumeChange}
          minimumTrackTintColor="#1FB28A"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#1FB28A"
        />
        <View style={styles.volumeLabels}>
          <Text style={styles.volumeLabel}>0</Text>
          <Text style={styles.volumeLabel}>100</Text>
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
    backgroundColor: '#f5f5f5',
  },
  speakerIcon: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  sliderContainer: {
    width: '80%',
    alignItems: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  volumeLabels: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  volumeLabel: {
    fontSize: 16,
    color: '#333',
  },
});

export default ControlVolumen;












/*import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';

const ControlVolumen = () => {
  const [volume, setVolume] = useState(0.5);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/cancion1.mp3')
      );
      setSound(sound);
      await sound.playAsync();
      // await sound.setIsLoopingAsync(true); // Opcional: para repetir la canción
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const handleVolumeChange = async (value) => {
    setVolume(value);
    if (sound) {
      await sound.setVolumeAsync(value);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/speaker.png')} style={styles.speakerIcon} />
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={handleVolumeChange}
          minimumTrackTintColor="#1FB28A"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#1FB28A"
        />
        <View style={styles.volumeLabels}>
          <Text style={styles.volumeLabel}>0</Text>
          <Text style={styles.volumeLabel}>100</Text>
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
    backgroundColor: '#f5f5f5',
  },
  speakerIcon: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  sliderContainer: {
    width: '80%',
    alignItems: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  volumeLabels: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  volumeLabel: {
    fontSize: 16,
    color: '#333',
  },
});

export default ControlVolumen;*/