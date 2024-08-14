import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity  } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, Appbar, Menu, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'; 

const GRID_ICON = 'grid'; // 9 puntos
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
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Comprar"
        component={Comprar}
        options={{
          tabBarLabel: 'Comprar',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="cart" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Estadísticas"
        component={Estadisticas}
        options={{
          tabBarLabel: 'Estadísticas',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="chart-bar" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => {
            return <Icon name="account" size={size} color={color} />;
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
      <Appbar.Header>
        <View style={styles.appbarContent}>
          <Appbar.Action icon={GRID_ICON} onPress={handleGridIconPress} />
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
            source={{ uri: 'https://via.placeholder.com/420x220' }}
            style={styles.cardImage}
            alt="Imagen Principal"
          />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Simulador</Text>
            <Text style={styles.cardText}>
              Vres alla mis d'erege inmentate de concicion prostillador.
            </Text>
            <View style={styles.cardTextRow}>
              <Icon name="weather-sunny" size={18} />
              <Text style={styles.cardText}> 620+ Romguin</Text>
            </View>
          </View>
        </View>

        {/* Features */}
        <View style={styles.features}>
          {/* Single Feature */}
          <TouchableOpacity style={styles.featureCard} onPress={() => navigation.navigate('Proceso')}>
            <Icon name="chart-bar" size={24} style={styles.featureIcon} />
            <View style={styles.featureText}>
              <Text style={styles.featureNumber}>620+</Text>
              <Text style={styles.featureDescription}>Producción anual</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featureCard} onPress={() => navigation.navigate('Proceso')}>
            <Icon name="map-marker" size={24} style={styles.featureIcon} />
            <View style={styles.featureText}>
              <Text style={styles.featureNumber}>34</Text>
              <Text style={styles.featureDescription}>Potal de Gosta</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featureCard} onPress={() => navigation.navigate('Proceso')}>
            <Icon name="calendar" size={24} style={styles.featureIcon} />
            <View style={styles.featureText}>
              <Text style={styles.featureNumber}>Deplay eaent torm residia</Text>
              <Text style={styles.featureDescription}>Procesadir frieaum</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featureCard} onPress={() => navigation.navigate('Proceso')}>
            <Icon name="lightning-bolt" size={24} style={styles.featureIcon} />
            <View style={styles.featureText}>
              <Text style={styles.featureNumber}>De colinea</Text>
              <Text style={styles.featureDescription}>Debelear de all de slare</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function Comprar() {
  const [visible, setVisible] = React.useState(false);

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
          <Appbar.Action icon={GRID_ICON} onPress={handleGridIconPress} />
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
      <Text variant="headlineMedium">COMPRAR!</Text>      
    </View>
  );
}

function Estadisticas() {
  const [visible, setVisible] = React.useState(false);

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
          <Appbar.Action icon={GRID_ICON} onPress={handleGridIconPress} />
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
      <Text variant="headlineMedium">Estadisticas!</Text>      
    </View>
  );
}


function Perfil() {
  const [visible, setVisible] = React.useState(false);

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
          <Appbar.Action icon={GRID_ICON} onPress={handleGridIconPress} />
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
      <Text variant="headlineMedium">Perfil!</Text>      
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
  cardBody: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardText: {
    marginTop: 5,
    color: '#9e9e9e',
  },
  cardTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
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
});

