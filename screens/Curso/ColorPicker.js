import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';
import Slider from '@react-native-community/slider';

const ColorPickerScreen = ({ navigation }) => {
  const [selectedColor, setSelectedColor] = useState('#ffffff');

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSave = () => {
    navigation.navigate('CambioColorScreen', { color: selectedColor });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona un color:</Text>
      <ColorPicker
        oldColor={selectedColor}
        onColorSelected={handleColorChange}
        style={styles.colorPicker}
        sliderComponent={Slider}
      />
      <View style={[styles.colorDisplay, { backgroundColor: selectedColor }]} />
      <Button title="Guardar Color" onPress={handleSave} />
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
  title: {
    fontSize: 18,
    marginBottom: 16,
  },
  colorPicker: {
    width: 300,
    height: 300,
    marginBottom: 16,
  },
  colorDisplay: {
    width: 100,
    height: 100,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#000',
  },
});

export default ColorPickerScreen;
