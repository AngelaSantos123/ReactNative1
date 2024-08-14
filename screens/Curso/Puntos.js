// screens/Curso/PuntosScreen.js

import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line, Circle } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Asegúrate de usar FontAwesome5

const Puntos = () => {
  const [points, setPoints] = useState([]);
  const [lines, setLines] = useState([]);
  const [history, setHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);

  const handlePress = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    const newPoints = [...points, { x: locationX, y: locationY }];

    // Guardar el estado actual en el historial de deshacer
    setHistory([...history, { points, lines }]);
    // Limpiar el historial de rehacer
    setRedoHistory([]);
    setPoints(newPoints);
  };

  const handleCompleteFigure = () => {
    const newLines = getLines(points);
    setLines(newLines);
  };

  const handleClearFigure = () => {
    setHistory([...history, { points, lines }]);
    setRedoHistory([]);
    setPoints([]);
    setLines([]);
  };

  const handleUndoLastPoint = () => {
    if (history.length === 0) return;

    const lastState = history[history.length - 1];
    const newHistory = history.slice(0, -1);

    setRedoHistory([{ points, lines }, ...redoHistory]);
    setPoints(lastState.points);
    setLines(lastState.lines);
    setHistory(newHistory);
  };

  const handleRedoLastPoint = () => {
    if (redoHistory.length === 0) return;

    const lastRedoState = redoHistory[0];
    const newRedoHistory = redoHistory.slice(1);

    setHistory([...history, { points, lines }]);
    setPoints(lastRedoState.points);
    setLines(lastRedoState.lines);
    setRedoHistory(newRedoHistory);
  };

  const getLines = (pointsArray) => {
    const newLines = [];
    for (let i = 0; i < pointsArray.length; i++) {
      const nextIndex = (i + 1) % pointsArray.length;
      newLines.push({
        x1: pointsArray[i].x,
        y1: pointsArray[i].y,
        x2: pointsArray[nextIndex].x,
        y2: pointsArray[nextIndex].y,
      });
    }
    return newLines;
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon
          name="undo"
          size={30}
          color="black"
          onPress={handleUndoLastPoint}
          style={styles.icon}
        />
        <Icon
          name="redo"
          size={30}
          color="black"
          onPress={handleRedoLastPoint}
          style={styles.icon}
        />
      </View>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.touchableArea}>
          <Svg height={Dimensions.get('window').height} width={Dimensions.get('window').width}>
            {/* Solo dibujar las líneas cuando se complete la figura */}
            {lines.map((line, index) => (
              <Line
                key={index}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="blue"
                strokeWidth="2"
              />
            ))}
            {/* Siempre dibujar los puntos */}
            {points.map((point, index) => (
              <Circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="5"
                fill="red"
              />
            ))}
          </Svg>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.buttonContainer}>
        <Icon
          name="check"
          size={30}
          color="black"
          onPress={handleCompleteFigure}
          style={styles.button}
        />
        <Icon
          name="trash"
          size={30}
          color="black"
          onPress={handleClearFigure}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    zIndex: 1, // Asegura que los íconos estén encima del contenido
  },
  icon: {
    marginHorizontal: 10,
  },
  button: {
    marginHorizontal: 10,
  },
});

export default Puntos;