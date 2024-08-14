import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Circle, Line, Svg } from 'react-native-svg';
import AnimatedClock from 'react-native-reanimated-clock';

const { width } = Dimensions.get('window');
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);

const Reloj = () => {
    /*const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    const hora = currentTime.getHours();
    const minuto = currentTime.getMinutes();

    // Cálculo de los ángulos de las agujas
    const horaAngulo = (hora % 12 + minuto / 60) * 30;
    const minutoAngulo = minuto * 6;

    return (
      <View style={styles.container}>
        <Svg width={width * 0.8} height={width * 0.8} viewBox="-50 -50 100 100">
          {/!* Esfera del reloj *!/}
          <AnimatedCircle
            cx="0"
            cy="0"
            r="45"
            stroke="black"
            strokeWidth="1"
            fill="white"
          />
          {/!* Aguja de la hora *!/}
          <AnimatedLine
            x1="0"
            y1="0"
            x2="0"
            y2="-20"
            stroke="black"
            strokeWidth="1"
            strokeLinecap="round"
            rotation={horaAngulo}
            origin="0, 0"
          />
          {/!* Aguja del minuto *!/}
          <AnimatedLine
            x1="0"
            y1="0"
            x2="0"
            y2="-30"
            stroke="black"
            strokeWidth="1"
            strokeLinecap="round"
            rotation={minutoAngulo}
            origin="0, 0"
          />
        </Svg>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });*/
}

export default Reloj;
