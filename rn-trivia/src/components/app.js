const ReactNative = require('react-native');

import React, { Component }   from 'react';
import { Provider, connect }  from 'react-redux';
import ReduxPromise           from 'redux-promise';
import { Scene, Router }      from 'react-native-router-flux';

import {
  createStore, 
  applyMiddleware, 
  compose
} from 'redux';

import reducers        from '../reducers';
import Api             from '../services/api-service';
import MainMenu        from './main-menu';
import DecadesMenu     from '../containers/decades-menu';
import CategoriesIndex from '../containers/categories-index';
import CurrentClue     from './current-clue';

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

export default class App extends Component {
  componentWillMount() {
    Api.config({
      serverRoot: 'http://localhost:1337',
      apiRoute: 'api/'
    });
  }

  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers, enhancer)} >
        <ReduxRouter navigationBarStyle={styles.container}>
          <Scene sceneStyle={styles.container} key="root">
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});