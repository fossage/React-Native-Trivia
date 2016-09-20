/*===================================
          IMPORTS/ASSIGNMENT
 ===================================*/
const ReactNative = require('react-native');

import _                          from 'lodash';
import { connect }                from 'react-redux';
import React, {Component}         from 'react';
import TimerMixin                 from 'react-timer-mixin';
import inflection                 from 'lodash-inflection';
import ReactMixin                 from 'react-mixin';
import MainStyles                 from '../styles/main';
import { Actions }                from 'react-native-router-flux';
import ScoreCounter               from '../components/score-counter';
import { updateCurrentGameScore } from '../actions/index';

import { 
  Button,
  List,
  ListItem,
  FormInput,
  FormLabel
} from 'react-native-elements';

const {
  View,
  Text,
  TextInput,
  StyleSheet
} = ReactNative;


/*===================================
           CLASS DEFINITION
 ===================================*/
class CurrentClue extends Component{
  constructor(props) {
    super(props);
    _.mixin(inflection);
    
    this.state = { 
      difficultyIdx: 0,
      userAnswer: ''
    };
  }

  componentWillMount() {
    // sort clues by easiest first
    const sortedClues = this.props.clues.sort((a, b) => a.value - b.value);
    this.props.clues = _.remove(sortedClues, clue => {
      return clue.value === null || clue.value === undefined;
    });

    // ensure we clear any existing score
    this.props.updateCurrentGameScore(-this.props.currentScore);

    this.setState({currentDifficulty: this.props.clues[0].value})
  }
  
  render() {
    return (
      <View style={styles.scrollContainer}>
        <Text style={styles.difficultyText}>{this.state.currentDifficulty}</Text>
        <ScoreCounter score={this.props.currentScore}/>
        { this._renderClue(this.props.clues) }
        { this._renderAnswer() }
      </View>
    );
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
            value={this.state.userAnswer}
            onSubmitEditing={this._handleSubmit.bind(this)}
            onChangeText={userAnswer => this.setState({userAnswer})} 
          />
        </View>
      </View>
    )
  }

  _renderAnswer() {
     if(this.state.actualAnswer){
      return (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>
            {_.titleize(this.state.actualAnswer.replace(/[\\]/g, ''))}
          </Text>
        </View>
      )
    }
  }

  _handleSubmit() {
    let current      = this.props.clues[this.state.difficultyIdx];
    let actualAnswer = current.answer;
    let userAnswer   = this.state.userAnswer;
    
    // break the words up into an array and lowercase them
    let actualAnswerKeywords = _createKeywords(actualAnswer);
    let userAnswerKeywords   = _createKeywords(userAnswer);

    if(_compareKeywords(actualAnswerKeywords, userAnswerKeywords)) {
      this.props.updateCurrentGameScore(current.value)
    } else {
      this.props.updateCurrentGameScore(-current.value);
    }

    let difficultyIdx = this.state.difficultyIdx + 1;
    this.setState({ actualAnswer: current.answer });

    this.setTimeout(
      () => {
        if(difficultyIdx === this.props.clues.length) {
          Actions.categoriesIndex();
        }

        this.setState({
          difficultyIdx: difficultyIdx,
          currentDifficulty: this.props.clues[difficultyIdx].value,
          userAnswer: '',
          actualAnswer: ''
        });
      }, 4000);
  }
}

/*===================================
                STYLES
 ===================================*/
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

  difficultyText: {
    textAlign: 'center'
  },

  answerContainer: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    marginTop: 20,
    padding: 10,
    width: 300,
    backgroundColor: '#008C3F'
  },

  answerText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 18
  },

  textInput: {
    flex: 1,
  }
});

/*===================================
           PRIVATE FUNCTIONS
 ===================================*/
function _createKeywords(str) {
  const blackList = [
    'the',
    'or',
    'and',
    'of',
    'a'
  ];

  let whiteStrArr = str.toLowerCase().split(' ');
  let blackStrArr = [];

  whiteStrArr.forEach(word => {
    let cleanedWord = word
    .replace(/<[^>]*>/g, "")
    .replace(/[\"\'\*\-\_\(\)\=\+\{\}\|\/\\\[\]\!\`\~\.\?\<\>\;\:\,\^]/g, "")
    .trim();
    if(!blackList.includes(cleanedWord)) blackStrArr.push(cleanedWord);
  });

  return blackStrArr;
}

function _compareKeywords(actualAnswerKeys, userAnswerKeys) {
  console.log(actualAnswerKeys, userAnswerKeys)
  for(let i=0; i<actualAnswerKeys.length; i++) {
    if(!userAnswerKeys[i] || (userAnswerKeys[i] !== actualAnswerKeys[i])) {
      return false;
    }
  }

  return true;
}

function _mapStateToProps(state){
  return {currentScore: state.user.currentGameScore}
}

ReactMixin(CurrentClue.prototype, TimerMixin);

export default connect(_mapStateToProps, { updateCurrentGameScore })(CurrentClue);