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
import CluesMenu       from './clues-menu';

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

  // initialRoute is where we explicitly define the initial route upon loading.
  // We can also define initalRouteStack which is a pre-populated stack of routes
  // that will give us routes we can navigate back and forward in upon app load(I think).

  // When we update the stack via either push or pop, it will call the fucntion assigned
  // to renderScene again passing in the 'route' object. It is up to the function assigned
  // to renderScene to take the data from that object and return the appropriate component
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers, enhancer)} >
        <ReduxRouter navigationBarStyle={styles.container}>
          <Scene sceneStyle={styles.container} key="root">
            <Scene key="mainMenu" component={MainMenu} title="Main Menu" />
            <Scene key="decadesMenu" component={DecadesMenu} title="Select Decade" />
            <Scene key="categoriesIndex" component={CategoriesIndex} title="Select Category" />
            <Scene key="cluesMenu" component={CluesMenu} title="Clues" />
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