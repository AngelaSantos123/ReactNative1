// screens/Curso/FigurasScreen.js

import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle as SvgCircle, Rect, Polygon } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Asegúrate de usar FontAwesome5

const Figuras = () => {
  const [shapes, setShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState('circle'); // Forma predeterminada

  const handlePress = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    const newShape = { type: selectedShape, x: locationX, y: locationY };

    setShapes([...shapes, newShape]);
  };

  const renderShape = (shape, index) => {
    switch (shape.type) {
      case 'circle':
        return <SvgCircle key={index} cx={shape.x} cy={shape.y} r="20" fill="blue" />;
      case 'star':
        return (
          <Polygon
            key={index}
            points={`${shape.x},${shape.y - 20} ${shape.x + 6},${shape.y - 6} ${shape.x + 20},${shape.y - 6} ${shape.x + 10},${shape.y + 8} ${shape.x + 12},${shape.y + 20} ${shape.x},${shape.y + 12} ${shape.x - 12},${shape.y + 20} ${shape.x - 10},${shape.y + 8} ${shape.x - 20},${shape.y - 6} ${shape.x - 6},${shape.y - 6}`}
            fill="red"
          />
        );
      case 'rectangle':
        return <Rect key={index} x={shape.x - 20} y={shape.y - 10} width="40" height="20" fill="green" />;
      case 'arrow':
        return (
          <Polygon
            key={index}
            points={`${shape.x},${shape.y - 10} ${shape.x + 10},${shape.y - 10} ${shape.x + 10},${shape.y - 20} ${shape.x + 20},${shape.y} ${shape.x + 10},${shape.y + 20} ${shape.x},${shape.y}`}
            fill="purple"
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon
          name="circle"
          size={30}
          color="black"
          onPress={() => setSelectedShape('circle')}
          style={[styles.icon, selectedShape === 'circle' && styles.selectedIcon]}
        />
        <Icon
          name="star"
          size={30}
          color="black"
          onPress={() => setSelectedShape('star')}
          style={[styles.icon, selectedShape === 'star' && styles.selectedIcon]}
        />
        <Icon
          name="square"
          size={30}
          color="black"
          onPress={() => setSelectedShape('rectangle')}
          style={[styles.icon, selectedShape === 'rectangle' && styles.selectedIcon]}
        />
        <Icon
          name="arrow-right"
          size={30}
          color="black"
          onPress={() => setSelectedShape('arrow')}
          style={[styles.icon, selectedShape === 'arrow' && styles.selectedIcon]}
        />
      </View>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.touchableArea}>
          <Svg height={Dimensions.get('window').height} width={Dimensions.get('window').width}>
            {shapes.map((shape, index) => renderShape(shape, index))}
          </Svg>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  icon: {
    marginHorizontal: 10,
  },
  selectedIcon: {
    color: 'blue', // Color de la forma seleccionada
  },
  touchableArea: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Figuras;