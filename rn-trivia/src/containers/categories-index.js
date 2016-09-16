const ReactNative = require('react-native');

import _                    from 'lodash';
import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { Actions }          from 'react-native-router-flux';

const {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  StyleSheet
} = ReactNative;

import {
  Button,
  List,
  ListItem
} from 'react-native-elements';

class CategoriesIndex extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
         style={styles.scrollContainer}>
          <List>
            { this._renderListItems.call(this) }
          </List>
        </ScrollView>
      </View>
    )
  }

  _renderListItems() {
    return this.props.categories.map(category => {
      return (
        <ListItem 
          title={_.startCase(category.title)} 
          key={category.id}
          onPress={this._handleCategoryPress.bind(this, category)} 
          titleStyle={styles.catogoryTitle}
        />
      )
    });
  }

  _handleCategoryPress(category){
    Actions.cluesMenu(category);
  }
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    paddingTop: 55
  },

  scrollContainer: {
    flex: 5,
    padding: 5
  },

  // scrollView: {
  //   flex: 1
  // },

  buttonContainer: {
    flex: 1,
    justifyContent: 'center'
  },

  button: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 5,
    padding: 5,
  },

  buttonText: {
    fontSize: 20,
    color: '#666666'
  },

  catogoryTitle: {
    fontSize: 18
  }
});

function mapStateToProps(state, ownProps) {
  return { categories: state.categories.current }
}

export default connect(mapStateToProps)(CategoriesIndex);