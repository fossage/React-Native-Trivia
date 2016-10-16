/*==========================================
              IMPORTS / SET UP
 =========================================*/
const ReactNative = require('react-native');

import React, {Component} from 'react';
import Store              from '../services/store-service';
import Api                from '../services/api-service';
import { Actions }        from 'react-native-router-flux';
import { connect }        from 'react-redux';
import { login, setUser } from '../actions/index';
import MainStyles         from '../styles/main';

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

/*===========================================
              CLASS DEFINITION
 ==========================================*/
class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      password: '',
      errorMessage: ''
    };
    /* 
      THE REACT NATIVE STORAGE LIBRARY(3rd party, not core) SEEMS TO HAVE A BUG
      WHERE ONCE A KEY IS SET, I CAN'T REMOVE IT. 
      MIGHT BE A GOOD CANDIDATE FOR A PR ONCE I CAN FIND SOME TIME
      TO DIVE INTO IT, OR MIGHT BE THAT I SUCK A READING DOCUMENTATION,
      BUT I TEND TO THINK THE FORMER
      ========================================================================
    */
    Store.load({ key: 'user' })
    .then(data => {
      Api.setJWT(data.jwt)
      this.props.setUser(data.user);
      Actions.mainMenu();
    })
    .catch(e => {
      console.log(e)
    });
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

        <View style={styles.errorTextContainer}> 
          <Text style={styles.errorText}>{this.state.errorText}</Text>
        </View>

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
    .then(response => {
      if(response.error) throw response.payload;
      console.log(resp);
      Actions.mainMenu();
    })
    .catch(e => {
      this.setState({ 
        password: '',
        errorText: e.message
      });
    })
  }
}

/*===========================================
                    STYLES
 ==========================================*/
const styles = StyleSheet.create({
  container: {
    paddingTop: 140,
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
  },

  errorTextContainer: {
    marginTop:  20
  },

  errorText: {
    color: 'red',
    alignSelf: 'center',
    fontSize: 14,
    marginTop: 40
  }
});

console.log(styles)

/*===========================================
           REDUX CONNECTION / EXPORT
 ==========================================*/
export default connect(null, { login, setUser })(LogIn);