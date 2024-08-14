import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../HomeScreen';
import Pantalla2 from '../Curso/Pantalla2';
import Scroll from '../Curso/Scroll';
import Imagenes from '../Curso/Imagenes';
import Vertical from '../Curso/Vertical';
import RegistroDatos from '../Curso/RegistroDatos';
import Contador from '../Curso/Contador';
import Tarjetas from '../Curso/Tarjetas';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Pantalla2" component={Pantalla2} />
    <Drawer.Screen name="Scroll" component={Scroll} />
    <Drawer.Screen name="Imagenes" component={Imagenes} />
    <Drawer.Screen name="Vertical" component={Vertical} />
    <Drawer.Screen name="RegistroDatos" component={RegistroDatos} />
    <Drawer.Screen name="Contador" component={Contador} />
    <Drawer.Screen name="Tarjetas" component={Tarjetas} />
  </Drawer.Navigator>
);

export default DrawerNavigator;



/*
// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '.././HomeScreen';
import AddCategory from '.././AddCategory';
import AddArticulo from ".././AddArticulo";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="ArticulosScreen" component={AddArticulo} />
    <Drawer.Screen name="AddCategory" component={AddCategory} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
*/
