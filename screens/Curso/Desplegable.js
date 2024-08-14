import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';

const Desplegable = () => {
  const [size, setSize] = useState('');
  const [dough, setDough] = useState('');
  const [sauce, setSauce] = useState('');
  const [pizzaType, setPizzaType] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [price, setPrice] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  const handleIngredientChange = (ingredient) => {
    setSelectedIngredients((prevIngredients) =>
      prevIngredients.includes(ingredient)
        ? prevIngredients.filter((item) => item !== ingredient)
        : [...prevIngredients, ingredient]
    );
  };

  const handleAccept = () => {
    // Validación de campos
    if (!size || (!isCustom && !pizzaType) || (isCustom && (!dough || !sauce))) {
      Alert.alert('Error', 'Por favor, complete todos los campos requeridos.');
      return;
    }

    let basePrice = 0;
    switch (size) {
      case 'Pequeña':
        basePrice = 5;
        break;
      case 'Mediana':
        basePrice = 8;
        break;
      case 'Grande':
        basePrice = 10;
        break;
    }

    const additionalCost = selectedIngredients.length;
    const totalPrice = basePrice + additionalCost;
    setPrice(totalPrice);

    const ingredientText = selectedIngredients.length > 0 ? ` con ${selectedIngredients.join(', ')} extras` : '';
    setDisplayText(`Ha escogido una pizza ${size}, de masa ${dough} con ${sauce} ${!isCustom ? `de ${pizzaType}` : ''}${ingredientText}. Precio: ${totalPrice}€`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Escoge pizza a tu gusto:</Text>

      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={[styles.radioButton, !isCustom && styles.radioButtonActive]}
          onPress={() => { setIsCustom(false); setPizzaType(''); }}
        >
          <Text style={[styles.radioText, !isCustom && styles.radioTextActive]}>Pizzas predefinidas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioButton, isCustom && styles.radioButtonActive]}
          onPress={() => { setIsCustom(true); setPizzaType(''); }}
        >
          <Text style={[styles.radioText, isCustom && styles.radioTextActive]}>Personaliza tu pizza</Text>
        </TouchableOpacity>
      </View>

      {!isCustom && (
        <>
          <View style={styles.row}>
            <Text style={styles.label}>Tamaño:</Text>
            <Picker
              selectedValue={size}
              style={styles.picker}
              onValueChange={(itemValue) => setSize(itemValue)}
            >
              <Picker.Item label="Seleccione tamaño..." value="" />
              <Picker.Item label="Pequeña" value="Pequeña" />
              <Picker.Item label="Mediana" value="Mediana" />
              <Picker.Item label="Grande" value="Grande" />
            </Picker>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tipo de pizza:</Text>
            <Picker
              selectedValue={pizzaType}
              style={styles.picker}
              onValueChange={(itemValue) => setPizzaType(itemValue)}
            >
              <Picker.Item label="Seleccione tipo de pizza..." value="" />
              <Picker.Item label="BBQ" value="BBQ" />
              <Picker.Item label="Carbonara" value="Carbonara" />
              <Picker.Item label="Hawaiana" value="Hawaiana" />
            </Picker>
          </View>
        </>
      )}

      {isCustom && (
        <>
          <View style={styles.row}>
            <Text style={styles.label}>Tamaño:</Text>
            <Picker
              selectedValue={size}
              style={styles.picker}
              onValueChange={(itemValue) => setSize(itemValue)}
            >
              <Picker.Item label="Seleccione tamaño..." value="" />
              <Picker.Item label="Pequeña" value="Pequeña" />
              <Picker.Item label="Mediana" value="Mediana" />
              <Picker.Item label="Grande" value="Grande" />
            </Picker>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Masa:</Text>
            <Picker
              selectedValue={dough}
              style={styles.picker}
              onValueChange={(itemValue) => setDough(itemValue)}
            >
              <Picker.Item label="Seleccione masa..." value="" />
              <Picker.Item label="Masa fina" value="Masa fina" />
              <Picker.Item label="Masa gorda" value="Masa gorda" />
              <Picker.Item label="Masa de queso" value="Masa de queso" />
            </Picker>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Salsa base:</Text>
            <Picker
              selectedValue={sauce}
              style={styles.picker}
              onValueChange={(itemValue) => setSauce(itemValue)}
            >
              <Picker.Item label="Seleccione salsa..." value="" />
              <Picker.Item label="Carbonara" value="Carbonara" />
              <Picker.Item label="BBQ" value="BBQ" />
              <Picker.Item label="Tomate" value="Tomate" />
              <Picker.Item label="Queso" value="Queso" />
            </Picker>
          </View>

          <Text style={styles.label}>Ingredientes adicionales:</Text>
          <CheckBox
            title="Jamón"
            checked={selectedIngredients.includes('Jamón')}
            onPress={() => handleIngredientChange('Jamón')}
            containerStyle={styles.checkbox}
          />
          <CheckBox
            title="Queso extra"
            checked={selectedIngredients.includes('Queso')}
            onPress={() => handleIngredientChange('Queso')}
            containerStyle={styles.checkbox}
          />
          <CheckBox
            title="Champiñones"
            checked={selectedIngredients.includes('Champiñones')}
            onPress={() => handleIngredientChange('Champiñones')}
            containerStyle={styles.checkbox}
          />
          <CheckBox
            title="Aceitunas"
            checked={selectedIngredients.includes('Aceitunas')}
            onPress={() => handleIngredientChange('Aceitunas')}
            containerStyle={styles.checkbox}
          />
        </>
      )}

      <Button title="Aceptar" onPress={handleAccept} color="#C8102E" />

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
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#C8102E',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
  picker: {
    height: 50,
    width: '70%',
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  radioButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#C8102E',
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  radioButtonActive: {
    backgroundColor: '#C8102E',
  },
  radioText: {
    fontSize: 16,
    color: '#C8102E',
  },
  radioTextActive: {
    color: '#fff',
  },
  checkbox: {
    backgroundColor: '#f8f9fa',
    borderColor: '#C8102E',
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    color: '#C8102E',
    fontWeight: 'bold',
  },
});

export default Desplegable;