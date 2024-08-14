import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Animated, Easing, TouchableWithoutFeedback } from 'react-native';

const initialData = [
  // Datos de la tabla estátitica
  { id: 1, content: [['Comida1', 'Comida2', 'Comida3'], ['Comida4', 'Comida5', 'Comida6'], ['Comida7', 'Comida8', 'Comida9'], ['Comida10', 'Comida11', 'Comida12'], ['Comida13', 'Comida14', 'Comida15']] },
  { id: 2, content: [['Bebida1', 'Bebida2', 'Bebida3'], ['Bebida4', 'Bebida5', 'Bebida6'], ['Bebida7', 'Bebida8', 'Bebida9'], ['Bebida10', 'Bebida11', 'Bebida12'], ['Bebida13', 'Bebida14', 'Bebida15']] },
  { id: 3, content: [['Nombre1', 'Apellido1', 'Apellido2'], ['Nombre2', 'Apellido3', 'Apellido4'], ['Nombre3', 'Apellido5', 'Apellido6'], ['Nombre4', 'Apellido7', 'Apellido8'], ['Nombre5', 'Apellido9', 'Apellido10']] },
];

const Tablas = () => {
  // Variables
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(initialData);
  const [menuVisible, setMenuVisible] = useState(false);
  const [columnWidths, setColumnWidths] = useState([]);
  const [rowHeights, setRowHeights] = useState([]);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [buttonAnimation] = useState(new Animated.Value(1));
  const menuRef = useRef(null);

  useEffect(() => {
    calculateColumnWidths();
    calculateRowHeights();
  }, [data, currentPage]);

  // Calcular ancho y largo de cada fila y columna
  const calculateColumnWidths = () => {
    const currentTable = data[currentPage - 1].content;
    let newColumnWidths = [];

    for (let colIndex = 0; colIndex < currentTable[0].length; colIndex++) {
      let maxWidth = 0;
      for (let rowIndex = 0; rowIndex < currentTable.length; rowIndex++) {
        const cellContent = currentTable[rowIndex][colIndex];
        const textWidth = measureText(cellContent).width;
        if (textWidth > maxWidth) {
          maxWidth = textWidth;
        }
      }
      newColumnWidths.push(maxWidth);
    }

    setColumnWidths(newColumnWidths);
  };

  const calculateRowHeights = () => {
    const currentTable = data[currentPage - 1].content;
    let newRowHeights = [];

    for (let rowIndex = 0; rowIndex < currentTable.length; rowIndex++) {
      let maxHeight = 0;
      for (let colIndex = 0; colIndex < currentTable[0].length; colIndex++) {
        const cellContent = currentTable[rowIndex][colIndex];
        const textHeight = measureText(cellContent).height;
        if (textHeight > maxHeight) {
          maxHeight = textHeight;
        }
      }
      newRowHeights.push(maxHeight);
    }

    setRowHeights(newRowHeights);
  };

  const measureText = (text) => {
    const fontSize = 16;
    const width = text.length * fontSize * 0.5;
    const height = fontSize * 1.2;
    return { width, height };
  };

  // Añadir filas y columnas
  const addRow = () => {
    const newData = [...data];
    newData[currentPage - 1].content.push(Array(newData[currentPage - 1].content[0].length).fill(''));
    setData(newData);
    calculateRowHeights();
  };

  const addColumn = () => {
    const newData = [...data];
    newData[currentPage - 1].content.forEach(row => row.push(''));
    setData(newData);
    calculateColumnWidths();
  };

  // Para modificar los campos
  const updateCell = (pageIndex, rowIndex, colIndex, value) => {
    const newData = [...data];
    newData[pageIndex].content[rowIndex][colIndex] = value;
    setData(newData);
  };

  // Cuando se pulsa el botón del menú
  const handleButtonPress = (event) => {
    const { pageY, pageX } = event.nativeEvent;
    setMenuPosition({ top: pageY + 10, left: pageX });
    Animated.timing(buttonAnimation, {
      toValue: 1.2,
      duration: 100,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(true);
    });
  };

  const handleMenuClose = () => {
    Animated.timing(buttonAnimation, {
      toValue: 1,
      duration: 100,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(false);
    });
  };

  const handleOutsidePress = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      handleMenuClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsidePress);
    return () => {
      document.removeEventListener('mousedown', handleOutsidePress);
    };
  }, []);

  const renderTable = () => {
    const currentTable = data[currentPage - 1].content;
    return (
      <ScrollView horizontal>
        <View style={styles.table}>
          {currentTable.map((row, rowIndex) => (
            <View key={rowIndex} style={[styles.row, { height: rowHeights[rowIndex] }]}>
              {row.map((cell, colIndex) => (
                <TextInput
                  key={colIndex}
                  style={[styles.cell, rowIndex === 0 ? styles.headerCell : null, { width: columnWidths[colIndex] }]}
                  value={cell}
                  onChangeText={(text) => updateCell(currentPage - 1, rowIndex, colIndex, text)}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Animated.View style={[styles.menuButton, { transform: [{ scale: buttonAnimation }] }]}>
            <TouchableOpacity onPress={handleButtonPress} style={styles.menuButtonContent}>
              <Text style={styles.menuButtonText}>≡</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        {renderTable()}
        <View style={styles.pagination}>
          <TouchableOpacity onPress={() => setCurrentPage(1)}><Text style={styles.pageNumber}>1</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentPage(2)}><Text style={styles.pageNumber}>2</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentPage(3)}><Text style={styles.pageNumber}>3</Text></TouchableOpacity>
        </View>
        {menuVisible && (
          <View ref={menuRef} style={[styles.menu, { top: menuPosition.top, left: menuPosition.left }]}>
            <TouchableOpacity style={styles.menuOption} onPress={() => { addRow(); handleMenuClose(); }}>
              <Text>Añadir fila</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuOption} onPress={() => { addColumn(); handleMenuClose(); }}>
              <Text>Añadir columna</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuOption} onPress={() => handleDeleteOption('row')}>
              <Text>Eliminar fila</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuOption} onPress={() => handleDeleteOption('column')}>
              <Text>Eliminar columna</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  menuButton: {
    padding: 10,
    backgroundColor: '#1FB28A',
    borderRadius: 5,
    elevation: 5,
  },
  menuButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    minWidth: 100,
  },
  headerCell: {
    fontWeight: 'bold',
    backgroundColor: '#ddd',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  pageNumber: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  menu: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    elevation: 5,
    padding: 10,
  },
  menuOption: {
    paddingVertical: 5,
  },
});

export default Tablas;

