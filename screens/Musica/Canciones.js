import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Icon from 'react-native-vector-icons/FontAwesome';
const songs = [
  { id: '1', title: 'Canción1' },
  { id: '2', title: 'Canción2' },
  { id: '3', title: 'Canción3' },
  { id: '4', title: 'Canción4' },
  { id: '5', title: 'Canción5' },
  { id: '6', title: 'Canción6' },
];

const Card = ({ item, drag }) => (
  <TouchableOpacity style={styles.card} onLongPress={drag}>
    <Text style={styles.cardText}>{item.title}</Text>
    <Icon name="bars" size={20} color="#000" style={styles.dragIcon} />
  </TouchableOpacity>
);

const Canciones = () => {
  const [data, setData] = useState(songs);

  const renderItem = ({ item, drag }) => <Card item={item} drag={drag} />;

  return (
    <SafeAreaView style={styles.container}>
      <DraggableFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => setData(data)}
        activationDistance={8}
        containerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    flexGrow: 1,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardText: {
    fontSize: 18,
    color: '#333',
  },
  dragIcon: {
    marginLeft: 10,
  },
});

export default Canciones;
