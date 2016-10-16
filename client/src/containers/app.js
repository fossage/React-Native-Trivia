/*===================================
          IMPORTS / SET UP
====================================*/
const ReactNative = require('react-native');

import React, { Component }  from 'react';
import { Provider, connect } from 'react-redux';
import ReduxPromise          from 'redux-promise';
import { Scene, Router }     from 'react-native-router-flux';

import {
  createStore, 
  applyMiddleware, 
  compose
} from 'redux';

import reducers        from '../reducers';
import { setUser }     from '../actions/index';
import Api             from '../services/api-service';
import Store           from '../services/store-service';
import LogIn           from './log-in';
import SignUp          from './sign-up';
import MainMenu        from '../components/main-menu';
import CurrentClue     from './current-clue';
import DecadesMenu     from './decades-menu';
import CategoriesIndex from './categories-index';

const {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} = ReactNative;

const enhancer = compose(
  applyMiddleware(ReduxPromise), 
  global.reduxNativeDevTools ? global.reduxNativeDevTools() : nope => nope
);

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const ReduxRouter               = connect()(Router);

/*===================================
           CLASS DEFINITION
====================================*/
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    Api.config({
      serverRoot: 'http://localhost:1337',
      apiRoute: 'api/'
    });
    
    // Send an empty object to use defaults
    Store.config({});
  }

  componentDidMount() {
    if(this.props.user) Actions.mainMenu();
  }

  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers, enhancer)} >
        <ReduxRouter >
          <Scene key="root">
            <Scene key="logIn" component={LogIn} title="Log In" />
            <Scene key="signUp" component={SignUp} title="Sign Up" />
            <Scene key="mainMenu" component={MainMenu} title="Main Menu" />
            <Scene key="decadesMenu" component={DecadesMenu} title="Select Decade" />
            <Scene key="categoriesIndex" component={CategoriesIndex} title="Select Category" />
            <Scene key="currentClue" component={CurrentClue} title="Clues" />
          </Scene>
        </ReduxRouter>
      </Provider>
    );
  }
}