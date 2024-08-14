import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const Articulos_Carrito = ({ route, navigation }) => {
  const { categoriaId } = route.params;
  const [articulos, setArticulos] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetchArticulos(categoriaId);
    const storedQuantities = JSON.parse(localStorage.getItem('quantities'));
    if (storedQuantities) {
      setQuantities(storedQuantities);
    }

    const cleanup = setInterval(() => {
      localStorage.removeItem('quantities');
    }, 300000); // 300000 ms = 5 minutos

    return () => clearInterval(cleanup);
  }, [categoriaId]);

  const fetchArticulos = (id) => {
    axios.get(`http://192.168.144.33:8000/api/carrito/categorias/${id}/articulos/`)
      .then(response => {
        const fetchedArticulos = response.data.data;
        setArticulos(fetchedArticulos);

        const initialQuantities = {};
        fetchedArticulos.forEach(articulo => {
          initialQuantities[articulo.id] = 0;
        });
        setQuantities(initialQuantities);
      })
      .catch(error => {
        console.error('Error al obtener artículos:', error);
      });
  };

  const updateCart = (id, quantity) => {
    if (quantity >= 0 && quantity <= 15) {
      axios.post('http://192.168.144.33:8000/api/carrito/items/add/', {
        articulo_id: id,
        cantidad: quantity,
      })
      .then(response => {
        console.log('Artículo actualizado en el carrito:', response.data);
        setQuantities(prevQuantities => {
          const updatedQuantities = { ...prevQuantities, [id]: quantity };
          localStorage.setItem('quantities', JSON.stringify(updatedQuantities));
          return updatedQuantities;
        });
      })
      .catch(error => {
        console.error('Error al actualizar artículo en el carrito:', error);
      });
    }
  };

  const handleIncrement = (id) => {
    setQuantities(prevQuantities => {
      const newQuantity = Math.min(prevQuantities[id] + 1, 15);
      updateCart(id, newQuantity);
      return { ...prevQuantities, [id]: newQuantity };
    });
  };

  const handleDecrement = (id) => {
    setQuantities(prevQuantities => {
      const newQuantity = Math.max(prevQuantities[id] - 1, 0);
      updateCart(id, newQuantity);
      return { ...prevQuantities, [id]: newQuantity };
    });
  };

  const renderArticuloItem = ({ item }) => {
    const precio = parseFloat(item.precio);
    const descuentos = parseFloat(item.descuentos);
    const precioFormateado = isNaN(precio) ? '0.00' : precio.toFixed(2);
    const descuentosFormateado = isNaN(descuentos) ? '0.00' : descuentos.toFixed(2);

    return (
      <TouchableOpacity style={styles.articleCard}>
        <Text style={styles.articleTitle}>{item.titulo}</Text>
        <Text style={styles.articleCategory}>Categoría: {item.categoria}</Text>
        <Text style={styles.articlePrice}>Precio: {precioFormateado} €</Text>
        <Text style={styles.articleDiscounts}>Descuento: {descuentosFormateado} %</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={[styles.quantityButton, quantities[item.id] === 0 && styles.buttonDisabled]}
            onPress={() => handleDecrement(item.id)}
            disabled={quantities[item.id] === 0}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantities[item.id]}</Text>
          <TouchableOpacity
            style={[styles.quantityButton, quantities[item.id] === 15 && styles.buttonDisabled]}
            onPress={() => handleIncrement(item.id)}
            disabled={quantities[item.id] === 15}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articulos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderArticuloItem}
        style={styles.list}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.footerContainer}>
        <TouchableOpacity 
          style={styles.fab} 
          onPress={() => navigation.navigate('AddArticulo_Carrito', { categoriaId })}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('ListaCarrito')}
        >
          <Icon name="shopping-cart" size={25} color="#fff" />
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
  articleCard: {
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
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  articleCategory: {
    fontSize: 14,
    color: '#ecf0f1',
  },
  articlePrice: {
    fontSize: 14,
    color: '#1abc9c',
  },
  articleDiscounts: {
    fontSize: 14,
    color: '#e74c3c',
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
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#2c3e50',
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  fab: {
    backgroundColor: '#1abc9c',
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
  fabText: {
    fontSize: 24,
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

export default Articulos_Carrito;








