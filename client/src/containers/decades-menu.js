/*==========================================
              IMPORTS / SET UP
 =========================================*/
const ReactNative = require('react-native');

import React, {Component}from 'react';
import { Button  }    from 'react-native-elements';
import { Actions }    from 'react-native-router-flux';
import MainStyles     from '../styles/main'; 
import { connect }    from 'react-redux';
import { 
  fetch1980,
  fetch1990,
  fetch2000,
  fetchModern 
}  from '../actions/index';

const {
  View,
  StyleSheet,
  ActivityIndicator
} = ReactNative;

/*===========================================
              CLASS DEFINITION
 ==========================================*/
class DecadesMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: false};
  }

  render(){
    const index =  (
      <View style={MainStyles.container}>
        <Button
          iconRight
          buttonStyle={styles.button}
          icon={{name: 'person'}}
          onPress={this._handlePress.bind(this, 'fetch1980')}
          title="80's" />
        
        <Button 
          iconRight
          buttonStyle={styles.button}
          icon={{name: 'group'}}
          onPress={this._handlePress.bind(this, 'fetch1990')}
          title="90's"/>
        
        <Button 
          iconRight
          buttonStyle={styles.button}
          icon={{name: 'group-add'}}
          onPress={this._handlePress.bind(this, 'fetch2000')}
          title="Early 2000's"/>
        
        <Button 
          iconRight
          buttonStyle={styles.button}
          icon={{name: 'settings'}}
          onPress={this._handlePress.bind(this, 'fetchModern')}
          title="Late 2000's"/>

          <Button 
            iconRight
            buttonStyle={styles.button}
            icon={{name: 'settings'}}
            onPress={this._handlePress.bind(this, 'fetchAll')}
            title="All"/>
      </View>
    );

    const loader = <ActivityIndicator size='large' style={styles.indicator}/>;

    return this.state.loading ? loader : index;
  }

  _handlePress(action) {
    if(action == 'fetchAll') return console.warn('Still need to implement fetchAll categores.');
    this.setState({loading: true});

    this.props[action]()
    .then(() => {
      Actions.categoriesIndex();
      this.setState({loading: false});
    });
  }
}

/*===========================================
                    STYLES
 ==========================================*/
const styles = StyleSheet.create({
  button: {
    width: 250
  },

  indicator: {
    flex: 1,
    alignSelf: 'center'
  }
});

/*===========================================
          REDUX CONNECTION / EXPORT
 ==========================================*/
function mapStateToProps(state, ownProps) {
  return { categories: state.categories.eighties }
}

export default connect(mapStateToProps, { fetch1980, fetch1990, fetch2000, fetchModern })(DecadesMenu);