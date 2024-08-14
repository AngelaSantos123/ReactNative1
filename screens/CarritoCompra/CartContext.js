import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    axios.get('http://192.168.144.33:8000/api/carrito/items/')
      .then(response => {
        const fetchedItems = response.data.data || [];
        setCartItems(fetchedItems);
        calculateTotal(fetchedItems);
      })
      .catch(error => {
        console.error('Error al obtener artículos del carrito:', error);
      });
  };

  const calculateTotal = (items) => {
    if (Array.isArray(items)) {
      const total = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
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
        const updatedItems = cartItems
          .map(item => item.id === id ? { ...item, cantidad: quantity } : item)
          .filter(item => item.cantidad > 0);

        setCartItems(updatedItems);
        calculateTotal(updatedItems);
      })
      .catch(error => {
        console.error('Error al actualizar artículo en el carrito:', error);
      });
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, total, updateCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
