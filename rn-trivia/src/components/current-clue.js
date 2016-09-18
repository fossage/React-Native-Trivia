const ReactNative = require('react-native');

import _                  from 'lodash';
import React, {Component} from 'react';
import MainStyles         from '../styles/main';
import { Actions }        from 'react-native-router-flux';

import { 
  Button,
  List,
  ListItem,
  FormInput,
  FormLabel
} from 'react-native-elements';

const {
  View,
  TextInput,
  StyleSheet
} = ReactNative;

export default class CluesMenu extends Component{
  constructor(props) {
    super(props);
    
    this.state = { 
      difficultyIdx: 0,
      answer: ''
    };
  }

  componentWillMount() {
    // sort clues by easiest first
    this.props.clues = this.props.clues.sort((a, b) => a.value - b.value);
  }
  
  render() {
    return (
      <View style={styles.scrollContainer}>
        { this._renderClue(this.props.clues) }
      </View>
    );
  }

  _handleSubmit() {
    let actualAnswer = this.props.clues[this.state.difficultyIdx].answer;
    let cleanedAnswer = 

    console.log(actualAnswer);

    let difficultyIdx = ++this.state.difficultyIdx;
    
    if(difficultyIdx === this.props.clues.length -1) {
      Actions.categoriesIndex();
    }

    this.setState({
      difficultyIdx: difficultyIdx,
      answer: ''
    });
  }

  _renderClue(clues) {
    let clue = this.props.clues[this.state.difficultyIdx];;

    return (
      <View>
        <Button 
          small
          raised
          buttonStyle={styles.buttonText}
          title={clue.question}
          icon={{name: 'help'}}
        />
        
        <View>
          <FormLabel containerStyle={{flex: 1}}>What is:</FormLabel>
          <FormInput 
            returnTypeKey="go"
            value={this.state.answer}
            onSubmitEditing={this._handleSubmit.bind(this)}
            onChangeText={answer => this.setState({answer})} 
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1
  },

  buttonText: {
    flexDirection: 'column'
  },

  textInput: {
    flex: 1,
  }
});

function _createKeywords(str) {
  // @todo: make string parsing happen here
}