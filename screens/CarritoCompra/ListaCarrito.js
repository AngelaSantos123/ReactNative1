import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListaCarrito = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    axios.get('http://192.168.144.33:8000/api/carrito/items/')
      .then(response => {
        const fetchedItems = response.data.data || [];
        setItems(fetchedItems);
        calculateTotal(fetchedItems);
      })
      .catch(error => {
        console.error('Error al obtener artículos del carrito:', error);
      });
  };

  const calculateTotal = (items) => {
    if (Array.isArray(items)) {
      const total = items.reduce((sum, item) => {
        return sum + item.precio * item.cantidad;
      }, 0);
      setTotal(total.toFixed(2));
    } else {
      setTotal('0.00');
    }
  };

  const updateCartItem = (id, quantity) => {
    if (quantity >= 0 && quantity <= 15) {
      axios.post('http://192.168.144.33:8000/api/carrito/items/update/', {
        item_id: id,
        cantidad: quantity,
      })
      .then(response => {
        // Filtrar los artículos con cantidad 0
        const updatedItems = items
          .map(item => item.id === id ? { ...item, cantidad: quantity } : item)
          .filter(item => item.cantidad > 0);
        
        setItems(updatedItems);
        calculateTotal(updatedItems);
      })
      .catch(error => {
        console.error('Error al actualizar artículo en el carrito:', error);
      });
    }
  };  

  const handleIncrement = (id) => {
    const item = items.find(item => item.id === id);
    if (item) {
      updateCartItem(id, item.cantidad + 1);
    }
  };

  const handleDecrement = (id) => {
    const item = items.find(item => item.id === id);
    if (item && item.cantidad > 0) {
      updateCartItem(id, item.cantidad - 1);
    }
  };

  const renderCartItem = ({ item }) => {
    const itemTotal = (Number(item.precio) * item.cantidad).toFixed(2);

    return (
        <View style={styles.cartItem}>
            <Text style={styles.cartItemTitle}>{item.titulo}</Text>
            <Text style={styles.cartItemPrice}>Precio: {Number(item.precio).toFixed(2)} €</Text>
            <View style={styles.quantityContainer}>
                <TouchableOpacity
                    style={[styles.quantityButton, item.cantidad === 0 && styles.buttonDisabled]}
                    onPress={() => handleDecrement(item.id)}
                    disabled={item.cantidad === 0}
                >
                    <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.cantidad}</Text>
                <TouchableOpacity
                    style={[styles.quantityButton, item.cantidad === 15 && styles.buttonDisabled]}
                    onPress={() => handleIncrement(item.id)}
                    disabled={item.cantidad === 15}
                >
                    <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.cartItemTotal}>Total: {itemTotal} €</Text>
        </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCartItem}
        style={styles.list}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.footerContainer}>
        <Text style={styles.totalText}>Total: {total} €</Text>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  list: {
    width: '100%',
    marginTop: 20,
  },
  listContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  cartItem: {
    backgroundColor: '#34495e',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cartItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#1abc9c',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#1abc9c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#95a5a6',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  quantityText: {
    marginHorizontal: 10,
    color: '#fff',
    fontSize: 16,
  },
  cartItemTotal: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#2c3e50',
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  totalText: {
    fontSize: 20,
    color: '#fff',
  },
  iconButton: {
    backgroundColor: '#e74c3c',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ListaCarrito;








