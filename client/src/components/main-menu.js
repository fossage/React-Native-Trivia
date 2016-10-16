/*==========================================
              IMPORTS / SET UP
 =========================================*/
const ReactNative = require('react-native');

import React       from 'react';
import { Button }  from 'react-native-elements'
import { Actions } from 'react-native-router-flux';

const { 
  View,
  StyleSheet 
} = ReactNative;

/*===========================================
              CLASS DEFINITION
 ==========================================*/
export default function() {
  return (
    <View style={styles.container}>
      <Button
        iconRight
        buttonStyle={styles.button}
        icon={{name: 'person'}}
        onPress={ Actions.decadesMenu }
        title='Solo Play' />
      
      <Button 
        iconRight
        buttonStyle={styles.button}
        icon={{name: 'group'}}
        title='Quick Match'/>
      
      <Button 
        iconRight
        buttonStyle={styles.button}
        icon={{name: 'group-add'}}
        title='Tournament'/>
      
      <Button 
        iconRight
        buttonStyle={styles.button}
        icon={{name: 'settings'}}
        title='Settings'/>
    </View>
  )
}

/*===========================================
                    STYLES
 ==========================================*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  button: {
    marginBottom: 20,
    width: 250,
  }
});