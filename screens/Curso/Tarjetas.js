import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

const Tarjetas = ({ categoriasCreadas }) => (
  <ScrollView contentContainerStyle={styles.layout}>
    {categoriasCreadas.map((item) => (
      <View key={item.id} style={styles.card}>
        <Text style={styles.title}>{item.nombre}</Text>
        <Text style={styles.description}>{item.descripcion}</Text>
        <Text style={styles.author}>Autor: {item.autor}</Text>
      </View>
    ))}
    {categoriasCreadas.length === 0 && (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hay categorías creadas aún.</Text>
      </View>
    )}
  </ScrollView>
);

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around', // Espacio entre las tarjetas para que se ajusten correctamente
    alignItems: 'flex-start',
  },
  card: {
    backgroundColor: 'white',
    margin: 8,
    borderRadius: 10,
    padding: 16,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: { height: 1, width: 0.3 },
    width: '45%', // Ajusta el ancho para que se ajusten dos tarjetas en una fila
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  author: {
    fontSize: 10,
    textAlign: 'right',
    marginTop: 'auto',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#000',
  },
});

export default Tarjetas;



/*
import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

const Tarjetas = ({ categoriasCreadas }) => (
  <FlatList
    style={styles.layout}
    data={categoriasCreadas}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <View style={styles.card}>
        <Text style={styles.title}>{item.nombre}</Text>
        <Text style={styles.description}>{item.descripcion}</Text>
        <Text style={styles.author}>Autor: {item.autor}</Text>
      </View>
    )}
    ListEmptyComponent={() => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hay categorías creadas aún.</Text>
      </View>
    )}
  />
);

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: '#e5e5e5',
    paddingTop: 20,
  },
  card: {
    width: '90%',
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 10,
    padding: 16,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: { height: 1, width: 0.3 },
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  author: {
    fontSize: 10,
    textAlign: 'right',
    marginTop: 'auto',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#000',
  },
});

export default Tarjetas;

*/
