import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const Tablas1 = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [columnWidths, setColumnWidths] = useState([]);
  const [rowHeights, setRowHeights] = useState([]);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.144.33:8000/api/tables/');
      setData(response.data);
      calculateColumnWidths(response.data);
      calculateRowHeights(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
    }
  };

  const deleteRow = async (rowId) => {
    try {
      await axios.delete(`http://192.168.144.33:8000/api/tablerows/${rowId}/`);
      console.log('Fila eliminada correctamente');
      fetchData();
    } catch (error) {
      console.error('Error deleting row:', error);
      alert('Error deleting row. Please try again later.');
    }
  };

  const deleteColumn = async (colId) => {
    try {
      const response = await axios.get('http://192.168.144.33:8000/api/tablecells/');
      const cellsToDelete = response.data.filter(cell => cell.columnId === colId);
      await Promise.all(cellsToDelete.map(cell => axios.delete(`http://192.168.144.33:8000/api/tablecells/${cell.id}/`)));
      console.log('Columna eliminada correctamente');
      fetchData();
    } catch (error) {
      console.error('Error deleting column:', error);
      alert('Error deleting column. Please try again later.');
    }
  };

  const calculateColumnWidths = (tableData) => {
    if (!tableData[currentPage - 1] || !tableData[currentPage - 1].rows) return;

    const currentTable = tableData[currentPage - 1].rows;
    if (currentTable.length === 0 || !currentTable[0].cells) return;

    let newColumnWidths = [];
    for (let colIndex = 0; colIndex < currentTable[0].cells.length; colIndex++) {
      let maxWidth = 0;
      for (let rowIndex = 0; rowIndex < currentTable.length; rowIndex++) {
        const cell = currentTable[rowIndex]?.cells[colIndex];
        if (!cell) continue;
        const cellContent = cell.content || '';
        const textWidth = measureText(cellContent).width;
        if (textWidth > maxWidth) {
          maxWidth = textWidth;
        }
      }
      newColumnWidths.push(maxWidth);
    }
    setColumnWidths(newColumnWidths);
  };

  const calculateRowHeights = (tableData) => {
    if (!tableData[currentPage - 1] || !tableData[currentPage - 1].rows) return;

    const currentTable = tableData[currentPage - 1].rows;
    let newRowHeights = [];
    for (let rowIndex = 0; rowIndex < currentTable.length; rowIndex++) {
      const row = currentTable[rowIndex];
      if (!row.cells) continue;

      let maxHeight = 0;
      for (let colIndex = 0; colIndex < row.cells.length; colIndex++) {
        const cell = row.cells[colIndex];
        if (!cell) continue;
        const cellContent = cell.content || '';
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

  const addRow = async () => {
    try {
      const response = await axios.post(`http://192.168.144.33:8000/api/tablerows/`, { table: data[currentPage - 1].id });
      console.log('Fila creada correctamente');
      fetchData();
    } catch (error) {
      console.error('Error adding row:', error);
    }
  };

  const addColumn = async () => {
    const currentTable = data[currentPage - 1];
    const rows = currentTable.rows;

    try {
      await Promise.all(rows.map(async (row) => {
        await axios.post(`http://192.168.144.33:8000/api/tablecells/`, { row: row.id, content: '' });
      }));
      console.log('Columna creada correctamente');
      fetchData();
    } catch (error) {
      console.error('Error adding column:', error);
    }
  };

  const updateCell = async (rowId, cellId, value) => {
    try {
      await axios.put(`http://192.168.144.33:8000/api/tablecells/${cellId}/`, { content: value });
      fetchData();
    } catch (error) {
      console.error('Error updating cell:', error);
    }
  };

  const handleButtonPress = (event) => {
    const { pageX, pageY } = event.nativeEvent;
    setMenuPosition({ top: pageY, left: pageX });
    setMenuVisible(true);
  };

  const handleMenuClose = () => {
    setMenuVisible(false);
  };

  const handleAddRow = () => {
    console.log('Has pulsado "Agregar fila"');
    addRow();
    handleMenuClose();
  };

  const handleAddColumn = () => {
    console.log('Has pulsado "Agregar columna"');
    addColumn();
    handleMenuClose();
  };

  const handleDeleteRow = () => {
    // Implement logic for deleting a row
    console.log('Has pulsado "Eliminar fila"');
    // Example: deleteRow(someRowId);
    handleMenuClose();
  };

  const handleDeleteColumn = () => {
    // Implement logic for deleting a column
    console.log('Has pulsado "Eliminar columna"');
    // Example: deleteColumn(someColumnId);
    handleMenuClose();
  };

  const renderTable = () => {
    if (!data[currentPage - 1]) return null;

    const currentTable = data[currentPage - 1].rows;
    return (
      <ScrollView horizontal>
        <View style={styles.table}>
          {currentTable.map((row, rowIndex) => (
            <View key={rowIndex} style={[styles.row, { height: rowHeights[rowIndex] }]}>
              {row.cells.map((cell, colIndex) => (
                <TextInput
                  key={colIndex}
                  style={[styles.cell, rowIndex === 0 && { width: columnWidths[colIndex] }]}
                  value={cell.content}
                  onChangeText={(value) => updateCell(row.id, cell.id, value)}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.pageTitle}>Tabla {currentPage}</Text>
      </View>
      <View style={styles.tableContainer}>
        {renderTable()}
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleButtonPress}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      {menuVisible && (
        <View style={[styles.menu, { top: menuPosition.top, left: menuPosition.left }]} ref={menuRef}>
          <TouchableOpacity style={styles.menuItem} onPress={handleAddRow}>
            <Text style={styles.menuItemText}>Agregar fila</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleAddColumn}>
            <Text style={styles.menuItemText}>Agregar columna</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleDeleteRow}>
            <Text style={styles.menuItemText}>Eliminar fila</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleDeleteColumn}>
            <Text style={styles.menuItemText}>Eliminar columna</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleMenuClose}>
            <Text style={styles.menuItemText}>Cerrar menú</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tableContainer: {
    flex: 1,
    marginVertical: 20,
  },
  table: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  menu: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    zIndex: 1000,
  },
  menuItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    fontSize: 16,
  },
});

export default Tablas1;









/*import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Animated, Easing } from 'react-native';
import axios from 'axios';

const Tablas1 = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [columnWidths, setColumnWidths] = useState([]);
  const [rowHeights, setRowHeights] = useState([]);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [buttonAnimation] = useState(new Animated.Value(1));
  const menuRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.144.33:8000/api/tables/');
      setData(response.data);
      calculateColumnWidths(response.data);
      calculateRowHeights(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
    }
  };

  const deleteRow = async (rowId) => {
    try {
      await axios.delete(`http://192.168.144.33:8000/api/tablerows/${rowId}/`);
      fetchData();
    } catch (error) {
      console.error('Error deleting row:', error);
      alert('Error deleting row. Please try again later.');
    }
  };

  const deleteColumn = async (colId) => {
    try {
      const response = await axios.get('http://192.168.144.33:8000/api/tablecells/');
      const cellsToDelete = response.data.filter(cell => cell.columnId === colId);
      await Promise.all(cellsToDelete.map(cell => axios.delete(`http://192.168.144.33:8000/api/tablecells/${cell.id}/`)));
      fetchData();
    } catch (error) {
      console.error('Error deleting column:', error);
      alert('Error deleting column. Please try again later.');
    }
  };

  const calculateColumnWidths = (tableData) => {
    if (!tableData[currentPage - 1] || !tableData[currentPage - 1].rows) return;

    const currentTable = tableData[currentPage - 1].rows;
    if (currentTable.length === 0 || !currentTable[0].cells) return;

    let newColumnWidths = [];
    for (let colIndex = 0; colIndex < currentTable[0].cells.length; colIndex++) {
      let maxWidth = 0;
      for (let rowIndex = 0; rowIndex < currentTable.length; rowIndex++) {
        const cell = currentTable[rowIndex]?.cells[colIndex];
        if (!cell) continue;
        const cellContent = cell.content || '';
        const textWidth = measureText(cellContent).width;
        if (textWidth > maxWidth) {
          maxWidth = textWidth;
        }
      }
      newColumnWidths.push(maxWidth);
    }
    setColumnWidths(newColumnWidths);
  };

  const calculateRowHeights = (tableData) => {
    if (!tableData[currentPage - 1] || !tableData[currentPage - 1].rows) return;

    const currentTable = tableData[currentPage - 1].rows;
    let newRowHeights = [];
    for (let rowIndex = 0; rowIndex < currentTable.length; rowIndex++) {
      const row = currentTable[rowIndex];
      if (!row.cells) continue;

      let maxHeight = 0;
      for (let colIndex = 0; colIndex < row.cells.length; colIndex++) {
        const cell = row.cells[colIndex];
        if (!cell) continue;
        const cellContent = cell.content || '';
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

  const addRow = async () => {
    try {
      const response = await axios.post(`http://192.168.144.33:8000/api/tablerows/`, { table: data[currentPage - 1].id });
      fetchData();
    } catch (error) {
      console.error('Error adding row:', error);
    }
  };

  const addColumn = async () => {
    const currentTable = data[currentPage - 1];
    const rows = currentTable.rows;

    try {
      await Promise.all(rows.map(async (row) => {
        await axios.post(`http://192.168.144.33:8000/api/tablecells/`, { row: row.id, content: '' });
      }));
      fetchData();
    } catch (error) {
      console.error('Error adding column:', error);
    }
  };

  const updateCell = async (rowId, cellId, value) => {
    try {
      await axios.put(`http://192.168.144.33:8000/api/tablecells/${cellId}/`, { content: value });
      fetchData();
    } catch (error) {
      console.error('Error updating cell:', error);
    }
  };
  

  const handleButtonPress = (event) => {
    const { pageX, pageY } = event.nativeEvent;
    setMenuPosition({ top: pageY, left: pageX });
    setMenuVisible(true);
  };

  const handleMenuClose = () => {
    setMenuVisible(false);
  };

  const renderTable = () => {
    if (!data[currentPage - 1]) return null;

    const currentTable = data[currentPage - 1].rows;
    return (
      <ScrollView horizontal>
        <View style={styles.table}>
          {currentTable.map((row, rowIndex) => (
            <View key={rowIndex} style={[styles.row, { height: rowHeights[rowIndex] }]}>
              {row.cells.map((cell, colIndex) => (
                <TextInput
                  key={colIndex}
                  style={[styles.cell, rowIndex === 0 && { width: columnWidths[colIndex] }]}
                  value={cell.content}
                  onChangeText={(value) => updateCell(row.id, cell.id, value)}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.pageTitle}>Tabla {currentPage}</Text>
      </View>
      <View style={styles.tableContainer}>
        {renderTable()}
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleButtonPress}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      {menuVisible && (
        <View style={[styles.menu, { top: menuPosition.top, left: menuPosition.left }]} ref={menuRef}>
          <TouchableOpacity style={styles.menuItem} onPress={addRow}>
            <Text style={styles.menuItemText}>Agregar fila</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={addColumn}>
            <Text style={styles.menuItemText}>Agregar columna</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleMenuClose}>
            <Text style={styles.menuItemText}>Cerrar menú</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tableContainer: {
    flex: 1,
    marginVertical: 20,
  },
  table: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  menu: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    zIndex: 1000,
  },
  menuItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    fontSize: 16,
  },
});

export default Tablas1;
*/