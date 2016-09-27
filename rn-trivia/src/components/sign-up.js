const ReactNative = require('react-native');

import React, {Component} from 'react';
import Store              from '../services/store-service';
import { Actions }        from 'react-native-router-flux';
import { connect }        from 'react-redux';
import { signUp }         from '../actions/index';

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

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      userName: '',
      password: '',
      passwordConf: '',
      erroText: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <FormLabel>EMAIL</FormLabel>
        <FormInput 
          value={this.state.email}
          onChangeText={this._handleEmailChange.bind(this)}
          onSubmitEditing={this._handlePress.bind(this)}
          placeholder="Please enter your email..."/>

        <FormLabel>USERNAME</FormLabel>
        <FormInput 
          value={this.state.userName}
          onChangeText={this._handleUserNameChange.bind(this)}
          onSubmitEditing={this._handlePress.bind(this)}
          placeholder="Please enter your desired username..."/>

        <FormLabel>PASSWORD</FormLabel>
        <FormInput 
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={this._handlePasswordChange.bind(this)}
          onSubmitEditing={this._handlePress.bind(this)}
          placeholder="Please enter a password(min. 8 characters)..."/>

        <FormLabel>CONFIRM PASSWORD</FormLabel>
        <FormInput 
          secureTextEntry={true}
          value={this.state.passwordConf}
          onChangeText={this._handlePasswordConfChange.bind(this)}
          onSubmitEditing={this._handlePress.bind(this)}
          placeholder="Please confirm your password..."/>

         <Text style={styles.errorText}>{this.state.errorText}</Text>
         
         <Button 
          raised
          iconRight
          onPress={this._handlePress.bind(this)}
          buttonStyle={styles.button}
          icon={{name: 'send'}}
          title='Submit'
        />
      </View>
    )
  }

  _handlePress() {
    this.setState({errorText: ''});

    if(!(
      this.state.email
      && this.state.userName
      && this.state.password
      && this.state.passwordConf)) {
        return this.setState({errorText: 'All fields are required...'})
      }

      if(this.state.password !== this.state.passwordConf) {
        return this.setState({errorText: 'Passwords must match...'});
      }

      if(this.state.password.length < 8 || this.state.passwordConf.length < 8) {
        return this.setState({errorText: 'Password must be at least 8 characters in length...'});
      }

      this.props.signUp({
        username: this.state.userName,
        email: this.state.email,
        password: this.state.password
      })
      .then(resp => {
        Store.save({
          key: 'user',
          rawData: resp.payload
        });
      })
      .catch(e => {
        this.setState({errorText: e})
      })
  }

  _handleEmailChange(email) {
    this.setState({email});
  }

  _handleUserNameChange(userName) {
    this.setState({userName});
  }

  _handlePasswordChange(password) {
    this.setState({password});
  }

  _handlePasswordConfChange(passwordConf) {
    this.setState({passwordConf});
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    justifyContent: 'center'
  },

  button: {
    padding: 5,
    width: 200,
    alignSelf: 'center',
    marginTop: 50
  },

  errorText: {
    color: 'red',
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 40
  }
});


export default connect(null, {signUp})(SignUp)