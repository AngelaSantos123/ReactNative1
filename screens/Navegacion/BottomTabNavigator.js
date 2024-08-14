import Pantalla1 from '../Curso/Pantalla1';
import Pantalla2 from '../Curso/Pantalla2';
import Scroll from '../Curso/Scroll';
import Imagenes from '../Curso/Imagenes';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Pantalla1" component={Pantalla1} />
    <Tab.Screen name="Pantalla2" component={Pantalla2} />
    <Tab.Screen name="Scroll" component={Scroll} />
    <Tab.Screen name="Imagenes" component={Imagenes} />
  </Tab.Navigator>
);

export default BottomTabNavigator;


/*
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Importa el paquete de iconos
import Pantalla1 from '../Curso/Pantalla1';
import Pantalla2 from '../Curso/Pantalla2';
import Scroll from '../Curso/Scroll';
import Imagenes from '../Curso/Imagenes';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Pantalla1') {
          iconName = 'ios-home';
        } else if (route.name === 'Pantalla2') {
          iconName = 'ios-list';
        } else if (route.name === 'Scroll') {
          iconName = 'ios-arrow-down';
        } else if (route.name === 'Imagenes') {
          iconName = 'ios-images';
        }

        // Puedes retornar cualquier componente que desees aquí
        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Pantalla1" component={Pantalla1} />
    <Tab.Screen name="Pantalla2" component={Pantalla2} />
    <Tab.Screen name="Scroll" component={Scroll} />
    <Tab.Screen name="Imagenes" component={Imagenes} />
  </Tab.Navigator>
);

export default BottomTabNavigator;
*/


