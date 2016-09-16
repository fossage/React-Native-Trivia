const ReactNative = require('react-native');

import _                  from 'lodash';
import React, {Component} from 'react';
import MainStyles         from '../styles/main';
import { 
  Button,
  List,
  ListItem,
} from 'react-native-elements';

const {
  View,
  StyleSheet
} = ReactNative;

export default class CluesMenu extends Component{
  constructor(props) {
    super(props);
    this.state = { difficultyIdx: null };
  }

  componentWillMount() {
    // sort clues by easiest first
    this.props.clues = this.props.clues.sort((a, b) => a - b);
    console.log(this.props.clues);
  }
  
  render() {
    return (
      <View style={styles.scrollContainer}>
        { this._renderClue(this.props.clues) }
      </View>
    );
  }

  _renderClue(clues) {
    let clue = null;

    if(!this.state.difficultyIdx) {
      clue = this.props.clues[0];
      this.state.difficultyIdx = 1;
    } else {
      clue = this.state.difficultyIdx;
      this.setState({difficultyIdx: ++this.state.difficultyIdx});
    }

    return (
      <Button 
        small
        raised
        buttonStyle={styles.buttonText}
        title={clue.question}
        icon={{name: 'help'}}
      />
    )
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 55,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },

  buttonText: {
    flexDirection: 'column',
    alignSelf: 'center'
  }
});