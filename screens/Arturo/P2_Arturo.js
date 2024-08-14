// screens/Ejemplo2.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, TextInput, Button, Animated, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const P2_Arturo = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [featureCards, setFeatureCards] = useState([
    {
      icon: 'warning',
      cardText: 'Prooflucion annual',
      cardTitle: 'Deploy ent torm reaida',
      description: 'Promoina Parring Alegeil Marile Llonets'
    },
    {
      icon: 'save',
      cardText: 'Progle coina',
      cardTitle: 'Debolsar de alle slare',
      description: 'Doiponte tanic Jerse anical sitine'
    }
  ]);

  const [newCard, setNewCard] = useState({ icon: '', cardText: '', cardTitle: '', description: '' });
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([
    'Feature 1',
    'Feature 2',
    'Another Feature',
    'More Features',
    // Agrega más datos aquí
  ]);

  const handleAddCard = () => {
    setFeatureCards([...featureCards, newCard]);
    setNewCard({ icon: '', cardText: '', cardTitle: '', description: '' });
    setModalVisible(false);
  };

  const handleSearch = (text) => {
    setSearchText(text);

    if (text.trim() === '') {
      setFilteredData([]);
      return;
    }

    const results = data.filter(item => item.toLowerCase().includes(text.toLowerCase()));
    setFilteredData(results);
  };
  const MenuItem = ({ icon, label, isActive }) => (
    <TouchableOpacity style={[styles.menuItem, isActive && styles.menuItemActive]}>
      <Icon name={icon} size={24} color={isActive ? "#FF6347" : "#000"} />
      <Text style={[styles.menuLabel, isActive && styles.menuLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
  

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbarRight}>
        <Icon name="arrow-back" size={24} color="black" style={styles.icon2} />
        <View style={styles.searchContainer}>
          <Icon name="search" size={24} color="white" style={styles.icon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="white"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>
      </View>
      <View style={styles.navbar}>
        <View style={styles.navbarLeft}>
          <Text style={styles.navbarTitle}>Simulador</Text>
          <Text style={styles.navbarSubtitle}>Vrers aila mis d'ereg imeniste de conicicion prostilledor</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Card */}
        <View style={styles.card}>
          <Image
            source={{ uri: 'https://via.placeholder.com/420x320' }}
            style={styles.cardImage}
          />
        </View>

        {/* Features */}
        <View style={styles.features}>
          <View style={styles.navbarRight}>
            <Text style={styles.featuresTitle}>Pottal de gosta</Text>
            <Text style={styles.featuresLink}>Inllanite</Text>
          </View>
          
          {featureCards.map((card, index) => (
            <FeatureCard
              key={index}
              icon={card.icon}
              cardText={card.cardText}
              cardTitle={card.cardTitle}
              description={card.description}
            />
          ))}

          <View>
            <Button title="Add Feature" onPress={() => setModalVisible(true)} />
          </View>

          {/* Mostrar resultados de búsqueda */}
          {filteredData.length > 0 && (
            <View style={styles.searchResults}>
              {filteredData.map((item, index) => (
                <Text key={index} style={styles.resultItem}>
                  {item}
                </Text>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      {/* Modal para añadir un nuevo FeatureCard */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TextInput
            placeholder="Icon Name"
            value={newCard.icon}
            onChangeText={(text) => setNewCard({ ...newCard, icon: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Card Title"
            value={newCard.cardTitle}
            onChangeText={(text) => setNewCard({ ...newCard, cardTitle: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Card Text"
            value={newCard.cardText}
            onChangeText={(text) => setNewCard({ ...newCard, cardText: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={newCard.description}
            onChangeText={(text) => setNewCard({ ...newCard, description: text })}
            style={styles.input}
          />
          <Button title="Add Card" onPress={handleAddCard} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      {/* Bottom Menu */}
      <View style={styles.bottomMenu}>
        <MenuItem icon="home-outline" label="Inicio" isActive={true} />
        <MenuItem icon="cart-outline" label="Comprar" isActive={false} />
        <MenuItem icon="bar-chart-outline" label="Estadísticas" isActive={false} />
        <MenuItem icon="person-outline" label="Perfil" isActive={false} />
      </View>
    </View>
  );
};

const FeatureCard = ({ icon, cardTitle, description, cardText }) => {
  const [scale] = useState(new Animated.Value(1)); // Estado para manejar la animación de escala

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 1.05, // Escala ligeramente mayor
      friction: 3, // Controla la suavidad de la animación
      useNativeDriver: true, // Mejora el rendimiento de la animación
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1, // Regresa al tamaño normal
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.featureCard, { transform: [{ scale }] }]}>
        <Icon name={icon} size={32} style={styles.featureIcon} />
        <View style={styles.featureText}>
          <Text style={styles.featureDescription}>{cardText}</Text>
          <Text style={styles.featureTitle}>{cardTitle}</Text>
          <Text style={styles.featureDescription}>{description}</Text>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const MenuItem = ({ icon, label }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Icon name={icon} size={24} color="#000" />
    <Text style={styles.menuLabel}>{label}</Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    navbar: {
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff',
        display: 'flex',
    },
    navbarLeft: {
        flexDirection: 'column',
        justifyContent: 'center', // Centra verticalmente
        display: 'flex',
        flexWrap: 'wrap',
    },
    navbarTitle: {
        marginLeft: 8,
        fontSize: 24,
        fontWeight: 'bold',
    },
    navbarSubtitle: {
        marginLeft: 8,
        fontSize: 16,
        color: 'gray',
    },
    navbarRight: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Distribuye el espacio entre los íconos
        alignItems: 'center', // Alinea verticalmente al centro
        display: 'flex',
    },
    icon: {
        padding: 5, // Añade un poco de espacio alrededor del ícono
        backgroundColor: 'black', // Color de fondo del ícono
        borderRadius: 50, // Hace el fondo redondeado
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    icon2: {
        padding: 5, // Añade un poco de espacio alrededor del ícono
        backgroundColor: 'lightgray', // Color de fondo del ícono
        borderRadius: 50, // Hace el fondo redondeado
        marginLeft: 10,
        marginTop: 10,
    },
    content: {
        padding: 15,
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
        height: 320,
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
        marginTop: 10,
    },
    featuresLink: {
        textDecorationStyle: 'none',
        color: 'orange',
    },
    featuresTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
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
    },
    featureText: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    featureDescription: {
        color: '#9e9e9e',
    },
    bottomMenu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingVertical: 10,
    },
    menuItem: {
        alignItems: 'center',
    },
    menuLabel: {
        fontSize: 12,
        marginTop: 4,
    },
    modalView: {
        marginTop: 100,
        padding: 20,
        backgroundColor: 'white',
        marginHorizontal: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    searchInput: {
        color: 'white',
        marginLeft: 5,
        flex: 1,
    },
    searchResults: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    resultItem: {
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    menuItemActive: {
        backgroundColor: '#f0f0f0', // Color de fondo diferente cuando está activo
        borderRadius: 10, // Puedes ajustar esto según el diseño
        padding: 5, // Espacio adicional para el efecto de foco
    },
    menuLabel: {
        fontSize: 12,
        marginTop: 4,
    },
    menuLabelActive: {
        color: '#FF6347', // Cambia el color del texto cuando está activo
        fontWeight: 'bold', // Resalta el texto cuando está activo
    },
});
  
export default P2_Arturo;