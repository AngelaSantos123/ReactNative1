import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const Tablas2 = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [currentTable, setCurrentTable] = useState(null);
  
    useEffect(() => {
      fetchTables();
    }, []);
  
    useEffect(() => {
      if (data.length > 0) {
        fetchTableData(data[currentPage - 1].id);
      }
    }, [currentPage, data]);
  
    const fetchTables = async () => {
      try {
        const response = await axios.get('http://192.168.144.33:8000/api/tablas/');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };
  
    const fetchTableData = async (tableId) => {
      try {
        // const response = await axios.get(`http://192.168.144.33:8000/api/tablas/${tableId}/`);
        const response = await axios.get(`http://192.168.144.33:8000/api/tablas/`);
        setCurrentTable(response.data);
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };
  
    const addRow = async () => {
      try {
        if (currentTable) {
          const response = await axios.post('http://192.168.144.33:8000/api/rows/', {
            table: currentTable.id,
            data: Array(currentTable.columns.length).fill(''),
          });
          fetchTableData(currentTable.id);
        }
      } catch (error) {
        console.error('Error adding row:', error);
      }
    };
  
    const addColumn = async () => {
      try {
        if (currentTable) {
          const response = await axios.post('http://192.168.144.33:8000/api/columns/', {
            table: currentTable.id,
            name: `Column ${currentTable.columns.length + 1}`,
          });
          fetchTableData(currentTable.id);
        }
      } catch (error) {
        console.error('Error adding column:', error);
      }
    };
  
    const updateCell = async (rowId, colIndex, value) => {
      try {
        if (currentTable) {
          const row = currentTable.rows.find(row => row.id === rowId);
          row.data[colIndex] = value;
          await axios.put(`http://192.168.144.33:8000/api/rows/${rowId}/`, row);
          fetchTableData(currentTable.id);
        }
      } catch (error) {
        console.error('Error updating cell:', error);
      }
    };
  
    return (
      <View style={styles.container}>
        {currentTable ? (
          <>
            <ScrollView horizontal>
              <View style={styles.table}>
                {currentTable.rows.map((row, rowIndex) => (
                  <View key={row.id} style={styles.row}>
                    {row.data.map((cell, colIndex) => (
                      <TextInput
                        key={colIndex}
                        style={styles.cell}
                        value={cell}
                        onChangeText={(text) => updateCell(row.id, colIndex, text)}
                      />
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
            <View style={styles.pagination}>
              {data.length > 0 && data.map((_, index) => (
                <TouchableOpacity key={index} onPress={() => setCurrentPage(index + 1)}>
                  <Text style={[styles.pageNumber, index + 1 === currentPage ? styles.activePage : null]}>
                    {index + 1}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.button} onPress={addRow}>
              <Text style={styles.buttonText}>Añadir fila</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={addColumn}>
              <Text style={styles.buttonText}>Añadir columna</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text>Cargando...</Text>
        )}
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
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
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  pageNumber: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  activePage: {
    fontWeight: 'bold',
    color: '#1FB28A',
  },
  button: {
    padding: 10,
    backgroundColor: '#1FB28A',
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Tablas2;
