import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Button = ({ size, shape, icon, onPress, children }) => {
  const sizeStyle = styles[`btn${size.charAt(0).toUpperCase() + size.slice(1)}`];
  const shapeStyle = shape === 'circle' ? styles.btnCircle : styles.btnSquare;

  return (
    <TouchableOpacity style={[styles.button, sizeStyle, shapeStyle]} onPress={onPress}>
      {icon ? <Icon name={icon} size={sizeStyle.fontSize} color="#fff" /> : null}
      {!icon && <Text style={styles.buttonText}>{children}</Text>}
    </TouchableOpacity>
  );
};

const BootstrapButton = ({ title, icon, style, textStyle, onPress, disabled }) => (
  <TouchableOpacity
    style={[styles.button, style, disabled ? styles.disabled : null]}
    onPress={onPress}
    disabled={disabled}
  >
    {icon && <Icon name={icon} size={20} color="#fff" style={styles.icon} />}
    <Text style={[styles.buttonText, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const Botones = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Bootstrap Styled Buttons</Text>

      <BootstrapButton
        title="Primary"
        icon="thumbs-up"
        style={styles.btnPrimary}
        onPress={() => {
          Alert.alert('Primary Button Pressed');
          navigation.navigate('Proceso');
        }}
      />
      <BootstrapButton
        title="Secondary"
        icon="thumbs-down"
        style={styles.btnSecondary}
        onPress={() => {
          Alert.alert('Secondary Button Pressed');
          navigation.navigate('Proceso');
        }}
      />
      <BootstrapButton
        title="Success"
        icon="check"
        style={styles.btnSuccess}
        onPress={() => {
          Alert.alert('Success Button Pressed');
          navigation.navigate('Proceso');
        }}
      />
      <BootstrapButton
        title="Danger"
        icon="exclamation-triangle"
        style={styles.btnDanger}
        onPress={() => {
          Alert.alert('Danger Button Pressed');
          navigation.navigate('Proceso');
        }}
      />
      <BootstrapButton
        title="Warning"
        icon="exclamation-circle"
        style={styles.btnWarning}
        onPress={() => {
          Alert.alert('Warning Button Pressed');
          navigation.navigate('Proceso');
        }}
      />
      <BootstrapButton
        title="Info"
        icon="info-circle"
        style={styles.btnInfo}
        onPress={() => {
          Alert.alert('Info Button Pressed');
          navigation.navigate('Proceso');
        }}
      />
      <BootstrapButton
        title="Light"
        icon="sun-o"
        style={styles.btnLight}
        onPress={() => {
          Alert.alert('Light Button Pressed');
          navigation.navigate('Proceso');
        }}
      />
      <BootstrapButton
        title="Dark"
        icon="moon-o"
        style={styles.btnDark}
        onPress={() => {
          Alert.alert('Dark Button Pressed');
          navigation.navigate('Proceso');
        }}
      />
      <BootstrapButton
        title="Primary Outline"
        style={styles.btnOutlinePrimary}
        textStyle={styles.btnOutlineText}
        onPress={() => {
          Alert.alert('Primary Outline Button Pressed');
          navigation.navigate('Proceso');
        }}
      />
      <BootstrapButton
        title="Secondary Outline"
        style={styles.btnOutlineSecondary}
        textStyle={styles.btnOutlineText}
        onPress={() => {
          Alert.alert('Secondary Outline Button Pressed');
          navigation.navigate('Proceso');
        }}
      />
      <BootstrapButton
        title="Success Outline"
        style={styles.btnOutlineSuccess}
        textStyle={styles.btnOutlineText}
        onPress={() => {
          Alert.alert('Success Outline Button Pressed');
          navigation.navigate('Proceso');
        }}
      />
      <BootstrapButton
        title="Danger Outline"
        style={styles.btnOutlineDanger}
        textStyle={styles.btnOutlineText}
        onPress={() => {
          Alert.alert('Danger Outline Button Pressed');
          navigation.navigate('Proceso');
        }}
      />
      <BootstrapButton
        title="Warning Outline"
        style={styles.btnOutlineWarning}
        textStyle={styles.btnOutlineText}
        onPress={() => {
          Alert.alert('Warning Outline Button Pressed');
          navigation.navigate('Proceso');
        }}
      />
      <BootstrapButton
        title="Info Outline"
        style={styles.btnOutlineInfo}
        textStyle={styles.btnOutlineText}
        onPress={() => {
          Alert.alert('Info Outline Button Pressed');
          navigation.navigate('Proceso');
        }}
      />
      <BootstrapButton
        title="Light Outline"
        style={styles.btnOutlineLight}
        textStyle={styles.btnOutlineText}
        onPress={() => {
          Alert.alert('Light Outline Button Pressed');
          navigation.navigate('Proceso');
        }}
      />
      <BootstrapButton
        title="Dark Outline"
        style={styles.btnOutlineDark}
        textStyle={styles.btnOutlineText}
        onPress={() => {
          Alert.alert('Dark Outline Button Pressed');
          navigation.navigate('Proceso');
        }}
      />
      <BootstrapButton
        title="Large Primary"
        style={[styles.btnPrimary, styles.btnLarge]}
        onPress={() => {
          Alert.alert('Large Primary Button Pressed');
          navigation.navigate('Proceso');
        }}
      />
      <BootstrapButton
        title="Large Secondary"
        style={[styles.btnSecondary, styles.btnLarge]}
        onPress={() => {
          Alert.alert('Large Secondary Button Pressed');
          navigation.navigate('Proceso');
        }}
      />
      <BootstrapButton
        title="Small Primary"
        style={[styles.btnPrimary, styles.btnSmall]}
        onPress={() => {
          Alert.alert('Small Primary Button Pressed');
          navigation.navigate('Proceso');
        }}
      />
      <BootstrapButton
        title="Small Secondary"
        style={[styles.btnSecondary, styles.btnSmall]}
        onPress={() => {
          Alert.alert('Small Secondary Button Pressed');
          navigation.navigate('Proceso');
        }}
      />
      <BootstrapButton
        title="Disabled Primary"
        style={styles.btnPrimary}
        disabled
      />
      <BootstrapButton
        title="Disabled Secondary"
        style={styles.btnSecondary}
        disabled
      />
      <BootstrapButton
        title="Disabled Primary Outline"
        style={styles.btnOutlinePrimary}
        disabled
      />
      <BootstrapButton
        title="Disabled Secondary Outline"
        style={styles.btnOutlineSecondary}
        disabled
      />
      <View style={styles.gridContainer}>
        <BootstrapButton
          title="Grid Button 1"
          style={styles.btnPrimary}
          onPress={() => {
            Alert.alert('Grid Button 1 Pressed');
            navigation.navigate('Proceso');
          }}
        />
        <BootstrapButton
          title="Grid Button 2"
          style={styles.btnPrimary}
          onPress={() => {
            Alert.alert('Grid Button 2 Pressed');
            navigation.navigate('Proceso');
          }}
        />
      </View>
      <View style={styles.gridEndContainer}>
        <BootstrapButton
          title="End Grid Button 1"
          style={styles.btnPrimary}
          onPress={() => {
            Alert.alert('End Grid Button 1 Pressed');
            navigation.navigate('Proceso');
          }}
        />
        <BootstrapButton
          title="End Grid Button 2"
          style={styles.btnPrimary}
          onPress={() => {
            Alert.alert('End Grid Button 2 Pressed');
            navigation.navigate('Proceso');
          }}
        />
      </View>
      {/* Botón totalmente redondo */}
      <BootstrapButton
        title="Abskcmdmcf"
        style={styles.btnRound}
        onPress={() => {
          Alert.alert('Round Button Pressed');
          navigation.navigate('Proceso');
        }}
      />

      {/* Botón con esquinas ligeramente redondeadas */}
      <BootstrapButton
        title="Redondeado"
        style={styles.btnRoundedCorners}
        onPress={() => {
          Alert.alert('Rounded Corners Button Pressed');
          navigation.navigate('Proceso');
        }}
      />

      <View style={styles.buttonRow}>
        <Button size="sm" onPress={() => Alert.alert('Small Button Pressed')}>
          Button
        </Button>
        <Button size="md" onPress={() => Alert.alert('Medium Button Pressed')}>
          Button
        </Button>
        <Button size="lg" onPress={() => Alert.alert('Large Button Pressed')}>
          Button
        </Button>
      </View>

      <View style={styles.buttonRow}>
        <Button size="sm" shape="square" icon="upload" onPress={() => Alert.alert('Upload Icon Small Square Button Pressed')} />
        <Button size="md" shape="square" icon="upload" onPress={() => Alert.alert('Upload Icon Medium Square Button Pressed')} />
        <Button size="lg" shape="square" icon="upload" onPress={() => Alert.alert('Upload Icon Large Square Button Pressed')} />
      </View>

      <View style={styles.buttonRow}>
        <Button size="sm" shape="circle" icon="upload" onPress={() => Alert.alert('Upload Icon Small Circle Button Pressed')} />
        <Button size="md" shape="circle" icon="upload" onPress={() => Alert.alert('Upload Icon Medium Circle Button Pressed')} />
        <Button size="lg" shape="circle" icon="upload" onPress={() => Alert.alert('Upload Icon Large Circle Button Pressed')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    color: '#343a40',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginVertical: 5,
    elevation: 2,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  icon: {
    marginRight: 10,
  },
  disabled: {
    backgroundColor: '#c0c0c0',
  },
  btnPrimary: {
    backgroundColor: '#007bff',
  },
  btnSecondary: {
    backgroundColor: '#6c757d',
  },
  btnSuccess: {
    backgroundColor: '#28a745',
  },
  btnDanger: {
    backgroundColor: '#dc3545',
  },
  btnWarning: {
    backgroundColor: '#ffc107',
  },
  btnInfo: {
    backgroundColor: '#17a2b8',
  },
  btnLight: {
    backgroundColor: '#f8f9fa',
    borderColor: '#dae0e5',
    borderWidth: 1,
  },
  btnDark: {
    backgroundColor: '#343a40',
  },
  btnOutlinePrimary: {
    backgroundColor: 'transparent',
    borderColor: '#007bff',
    borderWidth: 1,
  },
  btnOutlineSecondary: {
    backgroundColor: 'transparent',
    borderColor: '#6c757d',
    borderWidth: 1,
  },
  btnOutlineSuccess: {
    backgroundColor: 'transparent',
    borderColor: '#28a745',
    borderWidth: 1,
  },
  btnOutlineDanger: {
    backgroundColor: 'transparent',
    borderColor: '#dc3545',
    borderWidth: 1,
  },
  btnOutlineWarning: {
    backgroundColor: 'transparent',
    borderColor: '#ffc107',
    borderWidth: 1,
  },
  btnOutlineInfo: {
    backgroundColor: 'transparent',
    borderColor: '#17a2b8',
    borderWidth: 1,
  },
  btnOutlineLight: {
    backgroundColor: 'transparent',
    borderColor: '#f8f9fa',
    borderWidth: 1,
  },
  btnOutlineDark: {
    backgroundColor: 'transparent',
    borderColor: '#343a40',
    borderWidth: 1,
  },
  btnOutlineText: {
    color: '#000',
  },
  btnLarge: {
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  btnSmall: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  gridEndContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginVertical: 10,
  },
  btnRound: {
    backgroundColor: '#007bff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  btnRoundedCorners: {
    backgroundColor: '#007bff',
    borderRadius: 12,
  },


  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  btnSm: {
    padding: 8,
    fontSize: 14,
  },
  btnMd: {
    padding: 12,
    fontSize: 18,
  },
  btnLg: {
    padding: 16,
    fontSize: 22,
  },
  btnSquare: {
    borderRadius: 4,
  },
  btnCircle: {
    borderRadius: 50,
  },
});

export default Botones;
