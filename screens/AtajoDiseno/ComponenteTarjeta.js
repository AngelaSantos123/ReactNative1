import * as React from 'react';
import { Avatar, Button, Card, Text, Divider, IconButton } from 'react-native-paper';
import { View, StyleSheet, ScrollView } from 'react-native';
// import Cantidad from './Cantidad'; // Importa el componente Cantidad

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const ComponenteTarjeta = () => (
  <ScrollView style={styles.scrollView}>
    <Card style={[styles.card, styles.cardWhite]}>
      <Card.Title title="TÍTULO" subtitle="SUBTÍTULO" left={LeftContent} />
      <Divider />
      <Card.Content style={styles.cardContent}>
        <Text variant="titleLarge">EJEMPLO1</Text>
        <Text variant="bodyMedium">Ejemplo1</Text>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={styles.cardCover} />
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
      {/*<View style={styles.cantidadContainer}>
        <Cantidad />
      </View>*/}
    </Card>

    <Card style={[styles.card, styles.cardYellow]}>
      <Card.Title title="TÍTULO 2" subtitle="SUBTÍTULO 2" left={LeftContent} />
      <Divider />
      <Card.Content style={styles.cardContent}>
        <Text style={styles.redText} variant="titleLarge">EJEMPLO 2</Text>
        <Text style={styles.redText} variant="bodyMedium">Ejemplo 2</Text>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={styles.cardCover} />
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>    
    <Card style={[styles.card, styles.cardWhite]}>
      <Card.Title title="TÍTULO" subtitle="SUBTÍTULO" left={LeftContent} />
      <Divider />
      <Card.Content style={styles.cardContent}>
        <Text variant="titleLarge">EJEMPLO1</Text>
        <Text variant="bodyMedium">Ejemplo1</Text>
      </Card.Content>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={styles.cardCover} />
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
    {/*ACCIONES TARJETAS*/}
    <Card style={styles.card}>
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
    </Card>
    {/*CONTENIDO TARJETAS*/}
    <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">Card content</Text>
        </Card.Content>
    </Card>
    {/*IMAGEN TARJETAS*/}
    <Card style={styles.card}>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    </Card>
    {/*TÍTULO TARJETAS*/}
    <Card style={styles.card}>
      <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
      />
    </Card>
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 10, // Ajusta el padding según sea necesario
  },
  card: {
    marginBottom: 20, // Aumenta el margen inferior de la tarjeta para más separación
  },
  cardWhite: {
    backgroundColor: '#ffffff', // Color de fondo blanco para la primera tarjeta
  },
  cardYellow: {
    backgroundColor: '#ffff00', // Color de fondo amarillo para la segunda tarjeta
  },
  redText: {
    color: '#ff0000', // Color de texto rojo para la segunda tarjeta
  },
  cardContent: {
    marginBottom: 10, // Añade un margen inferior al contenido de la tarjeta
  },
  cardCover: {
    marginTop: 10, // Añade un margen superior a la imagen de la tarjeta
  },
  cantidadContainer: {
    position: 'absolute',
    top: 20, // Ajusta la posición del componente Cantidad en la tarjeta
    right: 10,
  },
});

export default ComponenteTarjeta;







/*import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const ComponenteTarjeta = () => (
    <View style={styles.container}>
        <Card>
            <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
            <Card.Content>
            <Text variant="titleLarge">Card title</Text>
            <Text variant="bodyMedium">Card content</Text>
            </Card.Content>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
            </Card.Actions>
        </Card>
  </View>
  
);

export default ComponenteTarjeta;*/