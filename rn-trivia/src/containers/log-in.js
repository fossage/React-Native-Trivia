const ReactNative = require('react-native');

import React, {Component}       from 'react';
import Storage                  from 'react-native-storage';
import { Actions }              from 'react-native-router-flux';
import { connect }              from 'react-redux';
import { login }                from '../actions/index';

import { 
  FormLabel, 
  FormInput, 
  Button 
} from 'react-native-elements'

const {
  View,
  Text,
  StyleSheet
} = ReactNative;

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      password: ''
    }
  } 

  render() {
    return (
      <View style={styles.container}>
        <FormLabel>USERNAME</FormLabel>
        <FormInput 
          value={this.state.userName}
          onChangeText={this._handleChangeUser.bind(this)}
          onSubmitEditing={this._handlePress.bind(this)}
          placeholder="Please enter your username..."/>

        <FormLabel>PASSWORD</FormLabel>
        <FormInput 
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={this._handleChangePassword.bind(this)}
          onSubmitEditing={this._handlePress.bind(this)}
          placeholder="Please enter your password..."/>

        <Button 
          raised
          iconRight
          onPress={this._handlePress.bind(this)}
          buttonStyle={styles.button}
          icon={{name: 'send'}}
          title='Submit'
        />

        <Text 
          style={styles.newAccountText}
          onPress={Actions.signUp}>
          Create new account...
        </Text>
      </View>
    )
  }

  _handleChangeUser(userName) {
    this.setState({userName});
  }

  _handleChangePassword(password) {
    this.setState({password});
  }

  _handlePress() {
    this.props.login(this.state.userName, this.state.password)
    .then(resp => {
      console.log(resp);
      Actions.mainMenu()
    })
    .catch(e => {
      this.setState({password: ''});
    })
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    justifyContent: 'center'
  },

  button: {
    width: 180,
    padding: 5,
    alignSelf: 'center',
    marginTop: 70,
    marginBottom: 30
  },

  newAccountText: {
    alignSelf: 'center',
    color: 'blue',
    textDecorationLine: 'underline'
  }
})

export default connect(null, { login })(LogIn);