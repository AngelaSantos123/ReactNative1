import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Calculadora = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [operation, setOperation] = useState('');

  const handleNumberPress = (number) => {
    if (operator) {
      setSecondValue(secondValue + number);
      setDisplayValue(`${firstValue} ${operator} ${secondValue + number}`);
    } else {
      setFirstValue(firstValue + number);
      setDisplayValue(`${firstValue + number}`);
    }
  };

  const handleOperatorPress = (operator) => {
    if (firstValue && !secondValue) {
      setOperator(operator);
      setOperation(`${firstValue} ${operator}`);
      setDisplayValue(`${firstValue} ${operator}`);
    }
  };

  const calculateResult = () => {
    let result;
    const first = parseFloat(firstValue);
    const second = parseFloat(secondValue);

    switch (operator) {
      case '+':
        result = first + second;
        break;
      case '-':
        result = first - second;
        break;
      case '*':
        result = first * second;
        break;
      case '/':
        result = first / second;
        break;
      case '%':
        result = (first / 100) * second;
        break;
      default:
        return;
    }

    setDisplayValue(`${operation} ${secondValue} = ${result}`);
    setFirstValue(result.toString());
    setSecondValue('');
    setOperator(null);
    setOperation('');
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setFirstValue('');
    setSecondValue('');
    setOperator(null);
    setOperation('');
  };

  const undoLastEntry = () => {
    if (secondValue) {
      // Remove last character from secondValue
      const newSecondValue = secondValue.slice(0, -1);
      setSecondValue(newSecondValue);
      setDisplayValue(`${firstValue} ${operator} ${newSecondValue}`);
    } else if (operator) {
      // Remove operator if secondValue is empty
      setOperator(null);
      setDisplayValue(firstValue);
    } else if (firstValue) {
      // Remove last character from firstValue if no operator is set
      const newFirstValue = firstValue.slice(0, -1);
      setFirstValue(newFirstValue);
      setDisplayValue(newFirstValue || '0');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{displayValue}</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.buttonClear} onPress={clearDisplay}>
          <Text style={styles.buttonText}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonUndo} onPress={undoLastEntry}>
          <Text style={styles.buttonText}>⌫</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOperator} onPress={() => handleOperatorPress('%')}>
          <Text style={styles.buttonText}>%</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOperator} onPress={() => handleOperatorPress('/')}>
          <Text style={styles.buttonText}>/</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress('7')}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress('8')}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress('9')}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOperator} onPress={() => handleOperatorPress('*')}>
          <Text style={styles.buttonText}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress('4')}>
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress('5')}>
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress('6')}>
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOperator} onPress={() => handleOperatorPress('-')}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress('1')}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress('2')}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress('3')}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOperator} onPress={() => handleOperatorPress('+')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress('0')}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNumber} onPress={() => handleNumberPress('.')}>
          <Text style={styles.buttonText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOperator} onPress={calculateResult}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOperator} onPress={() => handleOperatorPress('+')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  display: {
    fontSize: 36,
    color: '#333',
    textAlign: 'right',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  buttonNumber: {
    flex: 1,
    margin: 5,
    padding: 20,
    backgroundColor: '#333',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOperator: {
    flex: 1,
    margin: 5,
    padding: 20,
    backgroundColor: '#FFA500', // Naranja
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonClear: {
    flex: 1,
    margin: 5,
    padding: 20,
    backgroundColor: '#DDDDDD', // Gris claro
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonUndo: {
    flex: 1,
    margin: 5,
    padding: 20,
    backgroundColor: '#DDDDDD', // Gris claro
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default Calculadora;
