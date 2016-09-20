const ReactNative = require('react-native');

import React from 'react';

const {
  View,
  Text,
  StyleSheet
} = ReactNative;

export default function scoreCounter({score}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: 80,
    borderWidth: 2,
    borderColor: '#cccccc',
    borderRadius: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 1,
    shadowOpacity: 0.5
  },

  text: {
    fontSize: 20,
    width: 70,
    textAlign: 'center',
    color: '#ffffff'
  }
});