// TopTabNavigator.js
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Pantalla1 from '../Curso/Pantalla1';
import Pantalla2 from '../Curso/Pantalla2';
import Scroll from '../Curso/Scroll';
import Imagenes from '../Curso/Imagenes';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Pantalla1" component={Pantalla1} />
    <Tab.Screen name="Pantalla2" component={Pantalla2} />
    <Tab.Screen name="Scroll" component={Scroll} />
    <Tab.Screen name="Imagenes" component={Imagenes} />
  </Tab.Navigator>
);

export default TopTabNavigator;
