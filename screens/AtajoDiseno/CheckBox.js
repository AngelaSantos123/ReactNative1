import * as React from 'react';
import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';

const CheckBox = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <View>
        {/*<Checkbox.Item label="Item" status="checked" />*/}
        <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
                setChecked(!checked);
        }}
        />
    </View>
    
    
  );
};

export default CheckBox;