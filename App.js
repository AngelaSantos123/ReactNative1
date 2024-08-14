import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, StyleSheet } from 'react-native';
// import { Provider as PaperProvider } from 'react-native-paper'; // Uncomment this if you are using PaperProvider

import HomeScreen from './screens/HomeScreen';
import AddCategory from './screens/AddCategory';
import ArticulosScreen from './screens/ArticulosScreen';
import AddArticulo from './screens/AddArticulo';
import EditCategory from './screens/EditCategory';
import EditArticulo from './screens/EditArticulo';
import CursoCodecademy from './screens/CursoCodecademy';

import Pantalla1 from './screens/Curso/Pantalla1';
import Pantalla2 from './screens/Curso/Pantalla2';
import Scroll from './screens/Curso/Scroll';
import Imagenes from './screens/Curso/Imagenes';
import FlexBox from './screens/Curso/FlexBox';
import SeparacionFB from './screens/Curso/SeparacionFB';
import RegistroDatos from './screens/Curso/RegistroDatos';
import Usuarios from "./screens/Curso/Usuarios";
import Vertical from './screens/Curso/Vertical';
import ComponentesVarios from './screens/Curso/ComponentesVarios';
import Contador from './screens/Curso/Contador';
import CambioColor from './screens/Curso/CambioColor';
import Publicar from './screens/Curso/Publicar';
import Tarjetas from './screens/Curso/Tarjetas';
import FechaActual from "./screens/Curso/FechaActual";
import Calendario from "./screens/Curso/Calendario";
import Botones from "./screens/Curso/Botones";
import AlertDialogs from "./screens/Curso/AlertDialogs";
import MapScreen from "./screens/Curso/MapScreen";
import Calculadora from "./screens/Curso/Calculadora";
import Desplegable from "./screens/Curso/Desplegable";
import Desplegable1 from "./screens/Curso/Desplegable1";
import Puntos from './screens/Curso/Puntos';
import Figuras from './screens/Curso/Figuras';

import MenuDegradados from './screens/Degradados/MenuDegradados';
import D_Horizontal from './screens/Degradados/D_Horizontal';
import D_Vertical from './screens/Degradados/D_Vertical';
import D_Oblicuo from './screens/Degradados/D_Oblicuo';
import ColorPickerScreen from './screens/Curso/ColorPickerScreen';

import Tablas from "./screens/Tabla/Tablas";
import Tablas1 from "./screens/Tabla/Tablas1";
import Tablas2 from "./screens/Tabla/Tablas2";

import Videos from "./screens/Curso/Videos";
import MenuNavegacion from "./screens/Navegacion/MenuNavegacion";
import DrawerNavigator from "./screens/Navegacion/DrawerNavigator";
import BottomTabNavigator from "./screens/Navegacion/BottomTabNavigator";
import TopTabNavigator from './screens/Navegacion/TopTabNavigator';

import Proceso from './screens/Curso/Proceso';
import TextInputs from './screens/Curso/TextInputs';

// CARRITO DE LA COMPRA
import Home_Carrito from './screens/CarritoCompra/Home_Carrito';
import AddCategory_Carrito from './screens/CarritoCompra/AddCategory_Carrito';
import Articulos_Carrito from './screens/CarritoCompra/Articulos_Carrito';
import AddArticulo_Carrito from './screens/CarritoCompra/AddArticulo_Carrito';
import ListaCarrito from './screens/CarritoCompra/ListaCarrito';

// MÚSICA
import Canciones from './screens/Musica/Canciones';
import ControlVolumen from './screens/Musica/ControlVolumen';
import PausarPlay from './screens/Musica/PausarPlay';

import MyChart from './screens/Curso/MyChart';
import MenuGraficas from "./screens/Graficas/MenuGraficas";
import G_Barras from "./screens/Graficas/G_Barras";
import G_Circular from './screens/Graficas/G_Circular';
import G_Puntos from "./screens/Graficas/G_Puntos";


// LIBRERÍA ESTILO BOOTSTRAP
import MenuDiseno from "./screens/AtajoDiseno/MenuDiseno";
import MenuAvatar from "./screens/AtajoDiseno/Avatar/MenuAvatar";
import MenuAppBar from "./screens/AtajoDiseno/Navegaciones/MenuAppBar";
import NavegacionTablas from "./screens/AtajoDiseno/Tablas/NavegacionTablas";

import SimboloCargar from "./screens/AtajoDiseno/SimboloCargar";
import Cantidad from "./screens/AtajoDiseno/Cantidad";
import MostrarOcultar from "./screens/AtajoDiseno/MostrarOcultar";
import EstiloBotones from "./screens/AtajoDiseno/EstiloBotones";
import ComponenteTarjeta from "./screens/AtajoDiseno/ComponenteTarjeta";
import ChipEjemplo from "./screens/AtajoDiseno/ChipEjemplo";
import CheckBox from "./screens/AtajoDiseno/CheckBox";
import LineaSeparatoria from "./screens/AtajoDiseno/LineaSeparatoria";
import Ayudas from "./screens/AtajoDiseno/Ayudas";
import IconoDiseno from "./screens/AtajoDiseno/IconoDiseno";

import Avatar_Icono from "./screens/AtajoDiseno/Avatar/Avatar_Icono";
import Avatar_Imagen from "./screens/AtajoDiseno/Avatar/Avatar_Imagen";
import Avatar_Text from "./screens/AtajoDiseno/Avatar/Avatar_Text";

import Apbar from "./screens/AtajoDiseno/Navegaciones/Apbar";
import ApbarAction from "./screens/AtajoDiseno/Navegaciones/ApbarAction";
import ApbarBack from "./screens/AtajoDiseno/Navegaciones/ApbarBack";
import ApbarContent from "./screens/AtajoDiseno/Navegaciones/ApbarContent";
import ApbarHeader from "./screens/AtajoDiseno/Navegaciones/ApbarHeader";
import NavegacionInferior from "./screens/AtajoDiseno/Navegaciones/NavegacionInferior";
import NavegacionInferior2 from "./screens/AtajoDiseno/Navegaciones/NavegacionInferior2";
import DesplegableHorizontal from "./screens/AtajoDiseno/Navegaciones/DesplegableHorizontal";
import Deslizar from "./screens/AtajoDiseno/Navegaciones/Deslizar";
import DeslizarBotones from "./screens/AtajoDiseno/Navegaciones/DeslizarBotones";

import Dialog_Icon from "./screens/AtajoDiseno/Dialog/Dialog_Icon";
import Dialog_Scroll from "./screens/AtajoDiseno/Dialog/Dialog_Scroll";

// ARTURO
import { Provider as PaperProvider } from 'react-native-paper';
import TablaPaginacion from "./screens/Arturo/TablaPaginacion";
import Ejemplo2 from "./screens/Arturo/Ejemplo2";
import MenuArturo from "./screens/Arturo/MenuArturo";
import P1_Arturo from "./screens/Arturo/P1_Arturo";
import P2_Arturo from "./screens/Arturo/P2_Arturo";
import P3_Arturo from "./screens/Arturo/P3_Arturo";
import Efectos from "./screens/Arturo/Efectos";

// import Ejemplo2 from "./screens/Arturo/Ejemplo2";
// import Ejemplo2 from "./screens/Arturo/Ejemplo2";
// import Ejemplo2 from "./screens/Arturo/Ejemplo2";
// import Ejemplo2 from "./screens/Arturo/Ejemplo2";
// import Ejemplo2 from "./screens/Arturo/Ejemplo2";
// import Ejemplo2 from "./screens/Arturo/Ejemplo2";
// import Ejemplo2 from "./screens/Arturo/Ejemplo2";
// import Ejemplo2 from "./screens/Arturo/Ejemplo2";
// import Ejemplo2 from "./screens/Arturo/Ejemplo2";
// import Ejemplo2 from "./screens/Arturo/Ejemplo2";

// Conexión front-back
import axios from 'axios';

// Configuración de Axios
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la respuesta de Axios:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

const HomeScreen123 = ({ route, navigation }) => {
  const color = route.params?.color || '#ffffff';

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color }]}>Color Seleccionado</Text>
      <Button
        title="Cambiar Color"
        onPress={() => navigation.navigate('ColorPickerScreen')}
      />
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    // Uncomment this if you are using PaperProvider
    <PaperProvider>  
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {/*PANTALLA PRINCIPAL*/}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddCategory" component={AddCategory} />
          <Stack.Screen name="Articulos" component={ArticulosScreen} />
          <Stack.Screen name="AddArticulo" component={AddArticulo} />
          <Stack.Screen name="EditCategory" component={EditCategory} />
          <Stack.Screen name="EditArticulo" component={EditArticulo} />

          {/*MENÚ DE PANTALLAS*/}
          <Stack.Screen name="CursoCodecademy" component={CursoCodecademy} />
          <Stack.Screen name="Pantalla1" component={Pantalla1} />
          <Stack.Screen name="Pantalla2" component={Pantalla2} />
          <Stack.Screen name="Scroll" component={Scroll} />
          <Stack.Screen name="Imagenes" component={Imagenes} />
          <Stack.Screen name="FlexBox" component={FlexBox} />
          <Stack.Screen name="SeparacionFB" component={SeparacionFB} />
          <Stack.Screen name="RegistroDatos" component={RegistroDatos} />
          <Stack.Screen name="Vertical" component={Vertical} />
          <Stack.Screen name="ComponentesVarios" component={ComponentesVarios} />
          <Stack.Screen name="Contador" component={Contador} />
          <Stack.Screen name="CambioColor" component={CambioColor} />
          <Stack.Screen name="Tarjetas" component={Tarjetas} />
          <Stack.Screen name="Publicar" component={Publicar} />
          <Stack.Screen name="FechaActual" component={FechaActual} />
          <Stack.Screen name="Calendario" component={Calendario} />
          <Stack.Screen name="Botones" component={Botones} />
          <Stack.Screen name="AlertDialogs" component={AlertDialogs} />
          <Stack.Screen name="Videos" component={Videos} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
          <Stack.Screen name="Calculadora" component={Calculadora} />
          <Stack.Screen name="Desplegable" component={Desplegable} />
          <Stack.Screen name="Desplegable1" component={Desplegable1} />
          <Stack.Screen name="Puntos" component={Puntos} />
          <Stack.Screen name="Figuras" component={Figuras} />
          <Stack.Screen name="MenuDegradados" component={MenuDegradados} />
          <Stack.Screen name="D_Horizontal" component={D_Horizontal} />
          <Stack.Screen name="D_Vertical" component={D_Vertical} />
          <Stack.Screen name="D_Oblicuo" component={D_Oblicuo} />
          {/*<Stack.Screen name="Home123" component={HomeScreen123} /> {/* Hay que hacerle front mejor />* /}
            <Stack.Screen name="ColorPickerScreen" component={ColorPickerScreen} /> {/* Hay que hacerle front mejor />*/}
          <Stack.Screen name="ColorPickerScreen" component={ColorPickerScreen} />
          <Stack.Screen name="MyChart" component={MyChart} />
          <Stack.Screen name="MenuGraficas" component={MenuGraficas} />
          <Stack.Screen name="G_Barras" component={G_Barras} />
          <Stack.Screen name="G_Circular" component={G_Circular} />
          <Stack.Screen name="G_Puntos" component={G_Puntos} />
          <Stack.Screen name="Tablas" component={Tablas} />
          <Stack.Screen name="Tablas1" component={Tablas1} />
          <Stack.Screen name="Tablas2" component={Tablas2} />
          {/*<Stack.Screen name="Proceso" component={Proceso} />*/}
          <Stack.Screen name="MenuNavegacion" component={MenuNavegacion} />
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
          <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
          <Stack.Screen name="TopTabNavigator" component={TopTabNavigator} />
          <Stack.Screen name="TextInputs" component={TextInputs} />
          <Stack.Screen name="Usuarios" component={Usuarios} />
          <Stack.Screen name="Proceso" component={Proceso} />

          {/* CARRITO DE LA COMPRA*/}
          <Stack.Screen name="Home_Carrito" component={Home_Carrito} />
          <Stack.Screen name="AddCategory_Carrito" component={AddCategory_Carrito} />
          <Stack.Screen name="Articulos_Carrito" component={Articulos_Carrito} />
          <Stack.Screen name="AddArticulo_Carrito" component={AddArticulo_Carrito} />
          <Stack.Screen name="ListaCarrito" component={ListaCarrito} />

          {/* MÚSICA*/}
          <Stack.Screen name="Canciones" component={Canciones} />
          <Stack.Screen name="ControlVolumen" component={ControlVolumen} />
          <Stack.Screen name="PausarPlay" component={PausarPlay} />

          {/* DISEÑO PÁGINA */}
          <Stack.Screen name="MenuDiseno" component={MenuDiseno} />
          <Stack.Screen name="MenuAvatar" component={MenuAvatar} />
          <Stack.Screen name="MenuAppBar" component={MenuAppBar} />
          <Stack.Screen name="NavegacionTablas" component={NavegacionTablas} />

          <Stack.Screen name="SimboloCargar" component={SimboloCargar} />
          <Stack.Screen name="Cantidad" component={Cantidad} />
          <Stack.Screen name="MostrarOcultar" component={MostrarOcultar} />      
          <Stack.Screen name="EstiloBotones" component={EstiloBotones} />
          <Stack.Screen name="ComponenteTarjeta" component={ComponenteTarjeta} />
          <Stack.Screen name="ChipEjemplo" component={ChipEjemplo} />
          <Stack.Screen name="CheckBox" component={CheckBox} />
          <Stack.Screen name="LineaSeparatoria" component={LineaSeparatoria} />          
          <Stack.Screen name="Ayudas" component={Ayudas} />
          <Stack.Screen name="IconoDiseno" component={IconoDiseno} />

          <Stack.Screen name="Apbar" component={Apbar} />
          <Stack.Screen name="ApbarAction" component={ApbarAction} />
          <Stack.Screen name="ApbarBack" component={ApbarBack} />
          <Stack.Screen name="ApbarContent" component={ApbarContent} />
          <Stack.Screen name="ApbarHeader" component={ApbarHeader} />
          <Stack.Screen name="NavegacionInferior" component={NavegacionInferior} />
          <Stack.Screen name="NavegacionInferior2" component={NavegacionInferior2} />
          <Stack.Screen name="DesplegableHorizontal" component={DesplegableHorizontal} />
          <Stack.Screen name="Deslizar" component={Deslizar} />
          <Stack.Screen name="DeslizarBotones" component={DeslizarBotones} />

          <Stack.Screen name="Avatar_Icono" component={Avatar_Icono} />
          <Stack.Screen name="Avatar_Imagen" component={Avatar_Imagen} />
          <Stack.Screen name="Avatar_Text" component={Avatar_Text} />

          <Stack.Screen name="Dialog_Icon" component={Dialog_Icon} />
          <Stack.Screen name="Dialog_Scroll" component={Dialog_Scroll} />

          {/*ARTURO*/}
          <Stack.Screen name="TablaPaginacion" component={TablaPaginacion} />
          <Stack.Screen name="MenuArturo" component={MenuArturo} />
          <Stack.Screen name="Ejemplo2" component={Ejemplo2} />      
          <Stack.Screen name="P1_Arturo" component={P1_Arturo} />
          <Stack.Screen name="P2_Arturo" component={P2_Arturo} />          
          <Stack.Screen name="P3_Arturo" component={P3_Arturo} />
          <Stack.Screen name="Efectos" component={Efectos} />                   
          
          
          {/*<Stack.Screen name="MenuDiseno" component={MenuDiseno} />*/}
          {/*<Stack.Screen name="MenuDiseno" component={MenuDiseno} />*/}          
          {/*<Stack.Screen name="MenuDiseno" component={MenuDiseno} />*/}
          {/*<Stack.Screen name="MenuDiseno" component={MenuDiseno} />*/}
          {/*<Stack.Screen name="MenuDiseno" component={MenuDiseno} />*/}
          {/*<Stack.Screen name="MenuDiseno" component={MenuDiseno} />*/}
          {/*<Stack.Screen name="MenuDiseno" component={MenuDiseno} />*/}
          {/*<Stack.Screen name="MenuDiseno" component={MenuDiseno} />*/}
          {/*<Stack.Screen name="MenuDiseno" component={MenuDiseno} />*/}
          {/*<Stack.Screen name="MenuDiseno" component={MenuDiseno} />*/}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;