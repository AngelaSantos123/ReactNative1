import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';

const songs = [
  // Título y lugar de cada canción 
  { id: '1', title: 'Cumpleaños Feliz', source: require('../../assets/cumplefeliz.mp3') },
  { id: '2', title: 'Himno Argentina', source: require('../../assets/cancion1.mp3') },
  { id: '3', title: 'Thunder', source: require('../../assets/Thunder.mp3') },
  { id: '4', title: 'Bones', source: require('../../assets/Bones.mp3') },
];

const PausarPlay = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [sounds, setSounds] = useState({});
  const [playbackStatus, setPlaybackStatus] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSounds = async () => {
      const newSounds = {};
      const newPlaybackStatus = {};

      for (let i = 0; i < songs.length; i++) {
        const { sound } = await Audio.Sound.createAsync(songs[i].source);
        newSounds[i] = sound;

        sound.setOnPlaybackStatusUpdate((status) => {
          newPlaybackStatus[i] = status;
          setPlaybackStatus({ ...newPlaybackStatus });
        });
      }

      setSounds(newSounds);
      setIsLoading(false);
    };

    loadSounds();

    return () => {
      Object.values(sounds).forEach(sound => {
        if (sound) {
          sound.unloadAsync();
        }
      });
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        Object.values(sounds).forEach(sound => {
          if (sound) {
            sound.stopAsync();
          }
        });
      };
    }, [sounds])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSongIndex !== null && sounds[currentSongIndex]) {
        sounds[currentSongIndex].getStatusAsync().then(status => {
          setPlaybackStatus(prevStatus => ({
            ...prevStatus,
            [currentSongIndex]: status,
          }));
        });
      }
    }, 500);

    return () => clearInterval(interval);
  }, [currentSongIndex]);

  const handlePlayPause = async (index) => {
    if (sounds[index]) {
      if (playbackStatus[index]?.isPlaying) {
        await sounds[index].pauseAsync();
      } else {
        Object.keys(sounds).forEach(async (key) => {
          if (key !== index.toString()) {
            await sounds[key].stopAsync();
          }
        });
        setCurrentSongIndex(index);
        await sounds[index].playAsync();
      }
    }
  };

  const handleSliderChange = async (index, value) => {
    if (sounds[index]) {
      await sounds[index].setPositionAsync(value);
    }
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.songContainer}>
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <TouchableOpacity onPress={() => handlePlayPause(index)}>
          <Image
            source={playbackStatus[index]?.isPlaying ? require('../../assets/pause.png') : require('../../assets/play.png')} // Imágenes de pausa y play
            style={styles.playPauseIcon}
          />
        </TouchableOpacity>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={playbackStatus[index]?.durationMillis || 0}
        value={playbackStatus[index]?.positionMillis || 0}
        onValueChange={(value) => handleSliderChange(index, value)}
        minimumTrackTintColor="#1FB28A"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#1FB28A"
      />
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(playbackStatus[index]?.positionMillis || 0)}</Text>
        <Text style={styles.timeText}>{formatTime(playbackStatus[index]?.durationMillis || 0)}</Text>
      </View>
      <View style={styles.separator} />
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          data={songs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  songContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  songInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  songTitle: {
    fontSize: 18,
    color: '#333',
  },
  playPauseIcon: {
    width: 50,
    height: 50,
  },
  slider: {
    width: '100%',
    height: 40,
    marginVertical: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 16,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  list: {
    padding: 10,
  },
});

export default PausarPlay;











/*import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';

const songs = [
  { id: '1', title: 'Cumpleaños Feliz', source: require('../../assets/cumplefeliz.mp3') },
  { id: '2', title: 'Himno Argentina', source: require('../../assets/cancion1.mp3') },
  { id: '3', title: 'Thunder', source: require('../../assets/Thunder.mp3') },
  { id: '4', title: 'Bones', source: require('../../assets/Bones.mp3') },
];

const PausarPlay = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [sounds, setSounds] = useState({});
  const [playbackStatus, setPlaybackStatus] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSounds = async () => {
      const newSounds = {};
      const newPlaybackStatus = {};

      for (let i = 0; i < songs.length; i++) {
        const { sound } = await Audio.Sound.createAsync(songs[i].source);
        newSounds[i] = sound;

        sound.setOnPlaybackStatusUpdate((status) => {
          newPlaybackStatus[i] = status;
          setPlaybackStatus({ ...newPlaybackStatus });
        });
      }

      setSounds(newSounds);
      setIsLoading(false);
    };

    loadSounds();

    return () => {
      Object.values(sounds).forEach(sound => {
        if (sound) {
          sound.unloadAsync();
        }
      });
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSongIndex !== null && sounds[currentSongIndex]) {
        sounds[currentSongIndex].getStatusAsync().then(status => {
          setPlaybackStatus(prevStatus => ({
            ...prevStatus,
            [currentSongIndex]: status,
          }));
        });
      }
    }, 500);

    return () => clearInterval(interval);
  }, [currentSongIndex]);

  const handlePlayPause = async (index) => {
    if (sounds[index]) {
      if (playbackStatus[index]?.isPlaying) {
        await sounds[index].pauseAsync();
      } else {
        Object.keys(sounds).forEach(async (key) => {
          if (key !== index.toString()) {
            await sounds[key].stopAsync();
          }
        });
        setCurrentSongIndex(index);
        await sounds[index].playAsync();
      }
    }
  };

  const handleSliderChange = async (index, value) => {
    if (sounds[index]) {
      await sounds[index].setPositionAsync(value);
    }
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.songContainer}>
      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{item.title}</Text>
        <TouchableOpacity onPress={() => handlePlayPause(index)}>
          <Image
            source={playbackStatus[index]?.isPlaying ? require('../../assets/pause.png') : require('../../assets/play.png')}
            style={styles.playPauseIcon}
          />
        </TouchableOpacity>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={playbackStatus[index]?.durationMillis || 0}
        value={playbackStatus[index]?.positionMillis || 0}
        onValueChange={(value) => handleSliderChange(index, value)}
        minimumTrackTintColor="#1FB28A"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#1FB28A"
      />
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(playbackStatus[index]?.positionMillis || 0)}</Text>
        <Text style={styles.timeText}>{formatTime(playbackStatus[index]?.durationMillis || 0)}</Text>
      </View>
      <View style={styles.separator} />
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          data={songs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  songContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  songInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  songTitle: {
    fontSize: 18,
    color: '#333',
  },
  playPauseIcon: {
    width: 50,
    height: 50,
  },
  slider: {
    width: '100%',
    height: 40,
    marginVertical: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 16,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  list: {
    padding: 10,
  },
});

export default PausarPlay;*/















/*
// UN SOLO AUDIO
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';

const PausarPlay = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const soundRef = useRef(null);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/cumplefeliz.mp3')
      );
      setSound(sound);
      soundRef.current = sound;

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPosition(status.positionMillis);
          setDuration(status.durationMillis);
          setIsPlaying(status.isPlaying);
          setIsLoaded(true);
        }
      });

      await sound.playAsync();
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const handlePlayPause = async () => {
    if (isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = async (value) => {
    setPosition(value);
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(value);
    }
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return ( // Pause // Play
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePlayPause}>
        <Image
          source={isPlaying ? require('../../assets/eliminar.png') : require('../../assets/editar.png')}
          style={styles.playPauseIcon}
        />
      </TouchableOpacity>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onValueChange={handleSliderChange}
          minimumTrackTintColor="#1FB28A"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#1FB28A"
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
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
  playPauseIcon: {
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
  timeContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  timeText: {
    fontSize: 16,
    color: '#333',
  },
});

export default PausarPlay;*/
