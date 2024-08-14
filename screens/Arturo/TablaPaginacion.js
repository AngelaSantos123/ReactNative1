import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Componente que define el encabezado de la tabla
const TablaTitulo = () => (
  <DataTable.Header>
    <DataTable.Title sortDirection="descending">Ejemplos</DataTable.Title>
    <DataTable.Title numeric>Datos1</DataTable.Title>
    <DataTable.Title numeric>Datos2</DataTable.Title>
  </DataTable.Header>
);

// Componente principal que integra el título, las celdas y la paginación
const TablaPaginacion = () => {
  const numberOfItemsPerPageList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const items = [
    { key: 1, dessert: 'Ejemplo1', calories: 150, fat: 6 },
    { key: 2, dessert: 'Ejemplo2', calories: 200, fat: 9 },
    { key: 3, dessert: 'Ejemplo3', calories: 250, fat: 16 },
    { key: 4, dessert: 'Ejemplo4', calories: 300, fat: 4 },
    { key: 5, dessert: 'Ejemplo5', calories: 350, fat: 16 },
    { key: 6, dessert: 'Ejemplo6', calories: 120, fat: 5 },
    { key: 7, dessert: 'Ejemplo7', calories: 180, fat: 7 },
    { key: 8, dessert: 'Ejemplo8', calories: 220, fat: 8 },
    { key: 9, dessert: 'Ejemplo9', calories: 270, fat: 10 },
    { key: 10, dessert: 'Ejemplo10', calories: 320, fat: 12 },

    { key: 11, dessert: 'Ejemplo11', calories: 150, fat: 6 },
    { key: 12, dessert: 'Ejemplo12', calories: 200, fat: 9 },
    { key: 13, dessert: 'Ejemplo13', calories: 250, fat: 16 },
    { key: 14, dessert: 'Ejemplo14', calories: 300, fat: 4 },
    { key: 15, dessert: 'Ejemplo15', calories: 350, fat: 16 },
  ];

  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] = React.useState(5);
  const numberOfPages = Math.ceil(items.length / numberOfItemsPerPage);
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  // Componente para el renderizado de los números de páginas
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 0; i < numberOfPages; i++) {
      pages.push(
        <TouchableOpacity
          key={i}
          onPress={() => setPage(i)}
          style={[
            styles.pageNumber,
            page === i && styles.activePageNumber, // Aplica el estilo activo a la página actual
          ]}
        >
          <Text style={page === i ? styles.activePageText : styles.pageText}>{i + 1}</Text>
        </TouchableOpacity>
      );
    }
    return pages;
  };

  return (
    <DataTable>
      {/* Encabezado de la tabla */}
      <TablaTitulo />

      {/* Filas de la tabla según la paginación */}
      {items.slice(from, to).map(item => (
        <DataTable.Row key={item.key}>
          <DataTable.Cell>{item.dessert}</DataTable.Cell>
          <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
          <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
        </DataTable.Row>
      ))}

      {/* Paginación numérica */}
      <View style={styles.paginationContainer}>
        {renderPageNumbers()}
      </View>

      {/* Control de elementos por página */}
      <DataTable.Pagination
        page={page}
        numberOfPages={numberOfPages}
        onPageChange={page => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        showFastPaginationControls
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={numberOfItemsPerPage}
        onItemsPerPageChange={setNumberOfItemsPerPage}
        selectPageDropdownLabel={'Filas por página'}
      />
    </DataTable>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  pageNumber: {
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  activePageNumber: {
    backgroundColor: '#6200ee',
  },
  pageText: {
    fontSize: 16,
    color: '#000',
  },
  activePageText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default TablaPaginacion;