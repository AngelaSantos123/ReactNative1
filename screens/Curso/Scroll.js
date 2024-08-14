import React from 'react';
import { Text, View, ScrollView } from 'react-native';
// <ScrollView horizontal> - horizontal; <ScrollView> - vertical
const Scroll = () => (
  <View style={{ flex: 1, justifyContent: 'center' }}>
    <Text style={{ fontSize: 24, textAlign: 'center' }}>
      Scroll me!
    </Text>
    <View style={{ height: 400, backgroundColor: '#e5e5e5' }}>
        <Text style={{ fontWeight: 'bold' }}>SCROLL HORIZONTAL</Text>
      <ScrollView horizontal>
        <View style={{ width: 300, height: 300, backgroundColor: 'red' }} />
        <View style={{ width: 300, height: 300, backgroundColor: 'green' }} />
        <View style={{ width: 300, height: 300, backgroundColor: 'blue' }} />
      </ScrollView>
        <Text style={{ fontWeight: 'bold' }}> SCROLL VERTICAL</Text>
        <ScrollView>
        <View style={{ width: 300, height: 300, backgroundColor: 'purple' }} />
        <View style={{ width: 300, height: 300, backgroundColor: 'black' }} />
        <View style={{ width: 300, height: 300, backgroundColor: 'grey' }} />
      </ScrollView>
    </View>
  </View>
);

export default Scroll;