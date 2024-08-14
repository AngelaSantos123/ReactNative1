import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
const gato = require('../../assets/gato.jpg')
const perro = require('../../assets/perro.jpg')
const koala = require('../../assets/koala.jpg')
const tigre = require('../../assets/tigre.jpg')
const leon = require('../../assets/leon.jpg')

const Imagenes = () => (
  <View style={styles.container}>
      {/*<Text style={{ fontWeight: 'bold' }}>Disposición de las imágenes </Text>*/}
    <View style={styles.row}>
      <View style={styles.tigresRow}>
        <Image source={tigre} style={styles.image} />
        <Image source={tigre} style={styles.image} />
        <Image source={tigre} style={styles.image} />
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.perrosColumn}>
        <Image source={perro} style={styles.image} />
        <Image source={perro} style={styles.image} />
        <Image source={perro} style={styles.image} />
      </View>
      <View style={styles.centerColumn}>
        <Image source={gato} style={styles.image} />
        <Image source={gato} style={styles.image} />
        <Image source={gato} style={styles.image} />
      </View>
      <View style={styles.koalasColumn}>
        <Image source={koala} style={styles.image} />
        <Image source={koala} style={styles.image} />
        <Image source={koala} style={styles.image} />
      </View>
    </View>
    <View style={styles.row}>
      <View style={styles.leonesRow}>
        <Image source={leon} style={styles.image} />
        <Image source={leon} style={styles.image} />
        <Image source={leon} style={styles.image} />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  perrosColumn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  koalasColumn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  tigresRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  leonesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  centerColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

export default Imagenes;
