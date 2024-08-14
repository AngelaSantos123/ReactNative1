import * as React from 'react';
import { List, MD3Colors, Divider } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const MyComponent = () => (
  <View style={styles.container}>
    <List.Item
      title="Folders"
      left={props => <List.Icon {...props} color={MD3Colors.tertiary70} icon="folder" />}
      style={styles.listItem}
    />
    <Divider />
    <List.Item
      title="Equalizer"
      left={props => <List.Icon {...props} color={MD3Colors.tertiary70} icon="equal" />}
      style={styles.listItem}
    />
    <Divider />
    <List.Item
      title="Calendar"
      left={props => <List.Icon {...props} color={MD3Colors.tertiary70} icon="calendar" />}
      style={styles.listItem}
    />
  </View>
);

export default MyComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    margin: 16,
    elevation: 2,
  },
  listItem: {
    paddingVertical: 8,
  },
});
