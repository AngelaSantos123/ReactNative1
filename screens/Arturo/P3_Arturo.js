import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, Appbar, Menu, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import GridIcon from '../../assets/imagenes/mapa.gif';
// const GRID_ICON = 'grid';
const MENU_ICON = 'menu';

const Tab = createBottomTabNavigator();

export default function NavegacionInferior2() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FFD700',  // Color dorado para el icono activo
        tabBarInactiveTintColor: '#000000', // Color negro para el icono inactivo
        tabBarStyle: {
          backgroundColor: '#F8F9FA', // Fondo claro para la barra de navegación
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={Inicio}
        options={{
          tabBarLabel: 'Cosmo',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Anno"
        component={Comprar}
        options={{
          tabBarLabel: 'Anno',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="calendar" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Esens"
        component={Estadisticas}
        options={{
          tabBarLabel: 'Esens',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="chart-bar" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Pameta"
        component={Perfil}
        options={{
          tabBarLabel: 'Pameta',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="account" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Pando"
        component={Perfil}
        options={{
          tabBarLabel: 'Pando',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="cart" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

function Inicio() {
  const [visible, setVisible] = React.useState(false);
  const navigation = useNavigation();

  const handleGridIconPress = () => {
    console.log('9 puntos pulsado');
  };

  const handleMenuIconPress = () => {
    setVisible(true);
  };

  const handleMenuItemPress = (option) => {
    console.log(`${option} pulsado`);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <View style={styles.appbarContent}>
          <Appbar.Action icon={GridIcon} onPress={handleGridIconPress} />
          <Text style={styles.title}>Simulador</Text>
        </View>
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Appbar.Action icon={MENU_ICON} onPress={handleMenuIconPress} />
          }
        >
          <Menu.Item onPress={() => handleMenuItemPress('opcion1')} title="Opción 1" />
          <Menu.Item onPress={() => handleMenuItemPress('opcion2')} title="Opción 2" />
          <Menu.Item onPress={() => handleMenuItemPress('opcion3')} title="Opción 3" />
          <Divider />
        </Menu>
      </Appbar.Header>

      {/* Mapa simulado */}
      <View style={styles.mapContainer}>
        <Image
          source={GridIcon}
          style={styles.mapImage}
        />
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperature}>34°</Text>
          <Icon name="map-marker" size={32} color="#000" />
        </View>
      </View>

      {/* Contenido scrollable */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Opciones de simulador */}
        <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate('Proceso')}>
          <Icon name="file-document" size={24} style={styles.optionIcon} />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>linjeau</Text>
            <Text style={styles.optionDescription}>Struccocler chaf</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate('Proceso')}>
          <Icon name="clock-outline" size={24} style={styles.optionIcon} />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>luntande</Text>
            <Text style={styles.optionDescription}>Roolite sif er peenlia</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate('Proceso')}>
          <Icon name="cog-outline" size={24} style={styles.optionIcon} />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Potodie inuar</Text>
            <Text style={styles.optionDescription}>Def puentaitals</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionCard} onPress={() => navigation.navigate('Proceso')}>
          <Icon name="lightbulb-on-outline" size={24} style={styles.optionIcon} />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Hint cayecta</Text>
            <Text style={styles.optionDescription}>Debelecar de all de slare</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#000" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function Comprar() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>COMPRAR!</Text>
    </View>
  );
}

function Estadisticas() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Estadísticas!</Text>
    </View>
  );
}

function Perfil() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Perfil!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  appbar: {
    backgroundColor: '#FFFFFF',
  },
  appbarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  mapContainer: {
    height: 200,
    backgroundColor: '#EEEEEE',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  temperatureContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  temperature: {
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 5,
  },
  content: {
    padding: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  optionIcon: {
    marginRight: 10,
    color: '#FFD700',
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionDescription: {
    color: '#9e9e9e',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
  },
});

