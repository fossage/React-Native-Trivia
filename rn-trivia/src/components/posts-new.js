const ReactNative = require('react-native');

import React, {Component} from 'react';

const {
  View,
  StyleSheet,
  Text
} = ReactNative;

export default class PostsNew extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>New Post</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  title: {

  }
});