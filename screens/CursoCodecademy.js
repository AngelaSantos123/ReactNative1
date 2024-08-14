import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importa el hook useNavigation

const CursoCodecademy = () => {
  const navigation = useNavigation(); // Obtiene el objeto de navegación

  // Ejemplo de datos para los botones
  const buttonsData = [
    { text: 'Fondo con cuadrado centrado', screen: 'Pantalla1' },
    { text: 'Texto en negrita', screen: 'Pantalla2' },
    { text: 'Scroll', screen: 'Scroll' },
    { text: 'Imágenes', screen: 'Imagenes' },
    { text: 'FlexBox', screen: 'FlexBox' },
    { text: 'Vertical', screen: 'Vertical' },
    { text: 'SeparacionFB', screen: 'SeparacionFB' },
    { text: 'Recoger datos', screen: 'TextInputs' },
    { text: 'Componentes Varios', screen: 'ComponentesVarios' },
    { text: 'Contador', screen: 'Contador' },
    { text: 'Cambio de Color', screen: 'CambioColor' },
    { text: 'Publicacion', screen: 'Publicar' },
    { text: 'Tipos de Navegación', screen: 'MenuNavegacion' },
    { text: 'Fecha Actual', screen: 'FechaActual' },
    { text: 'Calendario', screen: 'Calendario' },
    { text: 'Estilo Botones', screen: 'Botones' },
    { text: 'Alert Dialogs', screen: 'AlertDialogs' },
    { text: 'Carrito Compra', screen: 'Home_Carrito' },
    { text: 'Calculadora', screen: 'Calculadora' },
    { text: 'Canciones', screen: 'Canciones' },
    { text: 'ControlVolumen', screen: 'ControlVolumen' },
    { text: 'PausarPlay', screen: 'PausarPlay' },    
    { text: 'Tablas Estático', screen: 'Tablas' }, // Formato tabla (filas y columnas), paginación, filtros
    // { text: 'Chat', screen: 'Proceso' },
    // { text: 'Tablas Dinámico', screen: 'Tablas1' },
    // { text: 'Tablas Dinámico Prueba', screen: 'Tablas2' },

    { text: 'Desplegable Teórico', screen: 'Desplegable1' },
    { text: 'Desplegable Ejemplo', screen: 'Desplegable' },


    // { text: 'Color Picker', screen: 'ColorPickerScreen' }, // Funciona pero hay que mejorar el front
    { text: 'Gráficas', screen: 'MenuGraficas' },

    { text: 'Puntos', screen: 'Puntos' }, // Completar figuras
    { text: 'Figuras', screen: 'Figuras' },
    { text: 'Degradados', screen: 'MenuDegradados' },
    // { text: 'Vídeos', screen: 'Proceso' },    // Intentado pero no coge bien la librería "npm install react-native-video"
    // { text: 'Mapas', screen: 'Proceso' },     // Intentado pero no coge bien la librería "npm install react-native-video"
    // { text: 'Parallax', screen: 'Proceso' },  // Intentado pero no coge bien la librería "npm install react-native-video"

    /* { text: 'Historial', screen: 'Proceso' },*/ 
    
    // Notificaciones
    // Animaciones con react-native-reanimated o react-native-animatable
    // Poner modo oscuro o modo claro de la app
    // Gestionar archivos (subir, descargar y gestionar)
    // Añadir y gestionar roles
    // Reproductor de vídeo
    // Botones de acceso a redes sociales

    // Mirar SASS
  ];

  // Función para manejar la navegación al presionar un botón
  const handleNavigation = (screenName) => {
    navigation.navigate(screenName); // Navega a la pantalla correspondiente
  };

  // Función para renderizar los botones
  const renderButtons = () => {
    return buttonsData.map((button, index) => (
      <TouchableOpacity key={index} style={styles.button} onPress={() => handleNavigation(button.screen)}>
        <Text style={styles.buttonText}>{button.text}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.gridContainer}>
          {renderButtons()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    width: '30%',
    aspectRatio: 1, 
    margin: '2%',
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default CursoCodecademy;
