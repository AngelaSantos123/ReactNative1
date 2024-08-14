import React from 'react';
import { Platform, StatusBar, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MapScreen = () => {
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

export default MapScreen;



/*import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825, // Latitud inicial del mapa
          longitude: -122.4324, // Longitud inicial del mapa
          latitudeDelta: 0.0922, // Delta de latitud para el zoom
          longitudeDelta: 0.0421, // Delta de longitud para el zoom
        }}
      >
        // Ejemplo de marcador en el mapa 
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="Marker Title"
          description="Marker Description"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;*/

