import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import MultiSelect from 'react-native-multiple-select';

const Desplegable = () => {  
  const [radioValue, setRadioValue] = useState('Radio1');
  const [additionalCheckboxes, setAdditionalCheckboxes] = useState([]);
  const [dropdownValue, setDropdownValue] = useState('');
  const [multipleSelectValues, setMultipleSelectValues] = useState([]);
  const [displayText, setDisplayText] = useState('');

  const handleAdditionalCheckboxChange = (value) => {
    setAdditionalCheckboxes((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleAccept = () => {
    const selectedCheckboxes = additionalCheckboxes.length > 0 ? ` con ${additionalCheckboxes.join(', ')}` : '';
    const multipleSelect = multipleSelectValues.length > 0 ? ` y selección múltiple: ${multipleSelectValues.join(', ')}` : '';
    setDisplayText(`Has escogido: Radio ${radioValue}, Desplegable: ${dropdownValue}${selectedCheckboxes}${multipleSelect}.`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Esto son elecciones del tipo "radio":</Text>
      <View style={styles.radioContainer}>
        <RadioButton.Group onValueChange={value => setRadioValue(value)} value={radioValue}>
          <View style={styles.radioButton}>
            <RadioButton value="Radio1" />
            <Text>Radio1</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton value="Radio2" />
            <Text>Radio2</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton value="Radio3" />
            <Text>Radio3</Text>
          </View>
        </RadioButton.Group>
      </View>

      <Text style={styles.label}>Esto son elecciones Checkbox:</Text>
      <CheckBox
        title="CB1"
        checked={additionalCheckboxes.includes('CB1')}
        onPress={() => handleAdditionalCheckboxChange('CB1')}
      />
      <CheckBox
        title="CB2"
        checked={additionalCheckboxes.includes('CB2')}
        onPress={() => handleAdditionalCheckboxChange('CB2')}
      />
      <CheckBox
        title="CB3"
        checked={additionalCheckboxes.includes('CB3')}
        onPress={() => handleAdditionalCheckboxChange('CB3')}
      />

      <Text style={styles.label}>Desplegable:</Text>
      <Picker
        selectedValue={dropdownValue}
        style={styles.picker}
        onValueChange={(itemValue) => setDropdownValue(itemValue)}
      >
        <Picker.Item label="Seleccione una opción..." value="" />
        <Picker.Item label="Opción1" value="Opción1" />
        <Picker.Item label="Opción2" value="Opción2" />
        <Picker.Item label="Opción3" value="Opción3" />
      </Picker>

      <Text style={styles.label}>Selección múltiple:</Text>
      <MultiSelect
        items={[
          { id: 'opt1', name: 'Opción1' },
          { id: 'opt2', name: 'Opción2' },
          { id: 'opt3', name: 'Opción3' },
        ]}
        uniqueKey="id"
        onSelectedItemsChange={setMultipleSelectValues}
        selectedItems={multipleSelectValues}
        selectText="Seleccione opciones..."
        searchInputPlaceholderText="Buscar..."
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor="#48d22b"
        submitButtonText="Aceptar"
      />

      <Button title="Aceptar" onPress={handleAccept} />

      {displayText ? <Text style={styles.result}>{displayText}</Text> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
});

export default Desplegable;
