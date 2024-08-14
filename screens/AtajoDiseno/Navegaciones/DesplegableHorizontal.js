import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Drawer, Text } from 'react-native-paper';

const DesplegableHorizontal = () => {
  const [active, setActive] = React.useState('inbox');

  return (
    <View style={styles.container}>
      <Drawer.Section title="Mail">
        <Drawer.Item
          label="Inbox"
          active={active === 'inbox'}
          icon="inbox"
          onPress={() => setActive('inbox')}
        />
        <Drawer.Item
          label="Sent"
          active={active === 'sent'}
          icon="send"
          onPress={() => setActive('sent')}
        />
        <Drawer.Item
          label="Drafts"
          active={active === 'drafts'}
          icon="file-document-outline"
          onPress={() => setActive('drafts')}
        />
        <Drawer.Item
          label="Spam"
          active={active === 'spam'}
          icon="alert-circle-outline"
          onPress={() => setActive('spam')}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DesplegableHorizontal;
