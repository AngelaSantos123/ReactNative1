import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, Appbar, Menu, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

// Importa la imagen local
import GridIcon from '../../assets/imagenes/icono1.png';

const MENU_ICON = 'menu'; // 3 rayitas (menú hamburguesa)

const Tab = createBottomTabNavigator();

export default function NavegacionInferior2() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="Inicio"
        component={Inicio}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Animatable.View
                animation={focused ? 'bounceIn' : undefined}
                duration={1000}
                style={{ transform: [{ scale: focused ? 2 : 1 }] }}
              >
                <Icon name="alert-circle" size={size} color={focused ? 'yellow' : color} />
              </Animatable.View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Estadísticas"
        component={Estadisticas}
        options={{
          tabBarLabel: 'Estadísticas',
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Animatable.View
                animation={focused ? 'shake' : undefined}
                duration={1000}
              >
                <Icon name="bell" size={size} color={focused ? 'yellow' : color} />
              </Animatable.View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Animatable.View
                animation={focused ? 'slideInUp' : undefined}
                duration={1000}
                style={{ opacity: focused ? 1 : 0.5 }}
              >
                <Icon name="camera" size={size} color={focused ? 'yellow' : color} />
              </Animatable.View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Perfil2"
        component={Perfil2}
        options={{
          tabBarLabel: 'Perfil2',
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Animatable.View
                animation={focused ? 'pulse' : undefined}
                duration={1000}
                iterationCount="infinite"
                style={{ backgroundColor: focused ? 'red' : 'transparent', borderRadius: 20 }}
              >
                <Icon name="account" size={size} color={focused ? 'yellow' : color} />
              </Animatable.View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Coche"
        component={Perfil2}
        options={{
          tabBarLabel: 'Coche',
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Animatable.View
                animation={focused ? 'slideInRight' : undefined}
                duration={1000}
              >
                <Icon name="car" size={size} color={focused ? 'yellow' : color} />
              </Animatable.View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Calendario"
        component={Perfil2}
        options={{
          tabBarLabel: 'Calendario',
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Animatable.View
                animation={focused ? 'fadeIn' : undefined}
                duration={1000}
              >
                <Icon name="calendar" size={size} color={focused ? 'yellow' : color} />
              </Animatable.View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Corazon"
        component={Perfil2}
        options={{
          tabBarLabel: 'Corazon',
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Animatable.View
                animation={focused ? 'flash' : undefined}
                duration={1000}
                style={{ backgroundColor: focused ? 'red' : 'transparent', borderRadius: 20 }}
              >
                <Icon name="heart" size={size} color={focused ? 'yellow' : color} />
              </Animatable.View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Reloj"
        component={Perfil2}
        options={{
          tabBarLabel: 'Reloj',
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Animatable.View
                animation={focused ? 'fadeInLeft' : undefined}
                duration={1000}
              >
                <Icon name="clock" size={size} color={focused ? 'yellow' : color} />
              </Animatable.View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Estrella"
        component={Perfil2}
        options={{
          tabBarLabel: 'Estrella',
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Animatable.View
                animation={focused ? 'bounceInRight' : undefined}
                duration={1000}
              >
                <Icon name="star" size={size} color={focused ? 'yellow' : color} />
              </Animatable.View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

function Inicio() {
  const [visible, setVisible] = React.useState(false);
  const [selectedScreen, setSelectedScreen] = useState('Pantalla1'); // Estado para manejar la pantalla seleccionada
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
      <Appbar.Header>
        <View style={styles.appbarContent}>
          <TouchableOpacity onPress={handleGridIconPress}>
            <Image source={GridIcon} style={styles.gridIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>Simulador</Text>
        </View>
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <Appbar.Action
              icon={MENU_ICON}
              onPress={handleMenuIconPress}
            />
          }
        >
          <Menu.Item onPress={() => handleMenuItemPress('opcion1')} title="Opción 1" />
          <Menu.Item onPress={() => handleMenuItemPress('opcion2')} title="Opción 2" />
          <Menu.Item onPress={() => handleMenuItemPress('opcion3')} title="Opción 3" />
          <Divider />
        </Menu>
      </Appbar.Header>

      {/* Contenido scrollable */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Card */}
        <View style={styles.card}>
          <Image
            source={require('../../assets/imagenes/casa1.jpg')}
            style={styles.cardImage}
            alt="Imagen Principal"
          />
        </View>
      </ScrollView>
    </View>
  );
}

function Comprar() {
  return (
    <View style={styles.container}>
      <Text>Comprar</Text>
    </View>
  );
}

function Estadisticas() {
  return (
    <View style={styles.container}>
      <Text>Estadisticas</Text>
    </View>
  );
}

function Perfil() {
  return (
    <View style={styles.container}>
      <Text>Perfil</Text>
    </View>
  );
}

function Perfil2() {
  return (
    <View style={styles.container}>
      <Text>Perfil2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  cardImage: {
    width: '100%',
    height: 220,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  screenSelection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  screenButton: {
    padding: 10,
    backgroundColor: '#f8f9fa',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  selectedButton: {
    backgroundColor: '#FFD700',
  },
  screenButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  features: {
    marginTop: 20,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  featureIcon: {
    marginRight: 10,
    color: '#FFD700',
  },
  featureText: {
    flex: 1,
  },
  featureNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  featureDescription: {
    color: '#9e9e9e',
  },
  gridIcon: {
    width: 24,
    height: 24,
  },
});
