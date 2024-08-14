import React, { useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

const Contador = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    if (count < 5) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {`Pulsar: ${count}`}
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="-" onPress={decrement} disabled={count <= 0} />
        <Button title="+" onPress={increment} disabled={count >= 5} />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 24,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
  },
});

export default Contador;




/*
import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

const Contador = () => {
  const [pressedCount, setPressedCount] = useState(0);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{ margin: 16 }}>
        {pressedCount > 0
          ? `The button was pressed ${pressedCount} times!`
          : 'The button isn\'t pressed yet'
        }
      </Text>
      <Button
        title='Press me'
        onPress={() => setPressedCount(pressedCount + 1)}
        disabled={pressedCount >= 3}
      />
    </View>
  );
};

export default Contador;*/
