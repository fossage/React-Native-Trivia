/*===================================
        IMPORTS/DECONSTRUCTION
 ===================================*/
const ReactNative = require('react-native');

import _                            from 'lodash';
import { connect }                  from 'react-redux';
import React, {Component}           from 'react';
import TimerMixin                   from 'react-timer-mixin';
import inflection                   from 'lodash-inflection';
import ReactMixin                   from 'react-mixin';
import MainStyles                   from '../styles/main';
import { Actions }                  from 'react-native-router-flux';
import ScoreCounter                 from '../components/score-counter';
import { updateCurrentGameScore }   from '../actions/index';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import {
  blackList, 
  alternateText,
  cleanWord
} from '../utils/string';

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
  StyleSheet,
  ProgressViewIOS
} = ReactNative;

/*===================================
           CLASS DEFINITION
 ===================================*/
class CurrentClue extends Component{
  constructor(props) {
    super(props);
    _.mixin(inflection);
    
    this.state = { 
      progress: 0,
      userAnswer: '',
      difficultyIdx: 0,
      currentDifficulty: 0,
      correctLastAnswer: false
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

  componentDidMount() {
    this.refs.circularProgress.performLinearAnimation(100, 20000);
  }
  
  render() {
    return (
      <View style={{paddingTop: 80}}>
        <ProgressViewIOS style={styles.progressView} progress={this.state.progress}/>
        <View style={styles.scrollContainer}>
          <Text style={styles.difficultyText}>{this.state.currentDifficulty}</Text>
          { this._renderProgress(this.props.currentScore)      }
          { this._renderClue(this.props.clues) }
          { this._renderAnswer() }
        </View>
      </View>
    );
  }

  _renderProgress(score) {
    return (
     <AnimatedCircularProgress
        size={80}
        width={3}
        rotation={0}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
        resetOnComplete={true}
        onComplete={(e) => {console.log(e)}}
        ref="circularProgress">
        {() => <Text style={styles.pointText}>{score}</Text>}
      </AnimatedCircularProgress>
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
      let icon      = 'mood-bad';
      let bgc       = '#FFBABA';
      let textColor = '#D8000C';

      if(this.state.correctLastAnswer) {
        icon      = 'mood';
        bgc       = '#4F8A10';
        textColor = '#ffffff';
      }

      return (
        <View style={styles.answerContainer}>
          <Button 
            small
            raised
            textStyle={{color: textColor}}
            backgroundColor={bgc}
            title={_.titleize(cleanWord(this.state.actualAnswer))}
            icon={{name: icon, color: textColor}}
          />
        </View>
      )
    }
  }

  _handleSubmit() {
    let current      = this.props.clues[this.state.difficultyIdx];
    let actualAnswer = current.answer;
    let userAnswer   = this.state.userAnswer;
    let correct      = false;

    // break the words up into an array and lowercase them
    let actualAnswerKeywords = _createKeywords(actualAnswer);
    let userAnswerKeywords   = _createKeywords(userAnswer);

    if(_compareKeywords(actualAnswerKeywords, userAnswerKeywords)) {
      this.props.updateCurrentGameScore(current.value)
      correct = true;
    } else {
      this.props.updateCurrentGameScore(-current.value);
    }

    let difficultyIdx = this.state.difficultyIdx + 1;
    
    this.setState({ 
      actualAnswer: current.answer,
      correctLastAnswer: correct
    });

    this.setTimeout(
      () => {
        if(difficultyIdx === this.props.clues.length) {
          Actions.categoriesIndex();
        } else {
           this.setState({
            difficultyIdx: difficultyIdx,
            currentDifficulty: this.props.clues[difficultyIdx].value,
            progress: difficultyIdx / (this.props.clues.length - 1),
            userAnswer: '',
            actualAnswer: ''
          });

          this.refs.circularProgress.performLinearAnimation(100, 20000);
        }
      }, 4000);
  }
}

/*===================================
                STYLES
 ===================================*/
const styles = StyleSheet.create({
  container: {
    paddingTop:80
  },

  pointText: {
    position: 'absolute',
    textAlign: 'center',
    width: 80,
    top: 30,
    left: 0,
    backgroundColor: 'transparent',
    fontSize: 20
  },

  scrollContainer: {
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

  progressView: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30
  },

  answerContainer: {
    marginTop: 20,
    width: 300
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
  let whiteStrArr = str.toLowerCase().split(' ');
  let blackStrArr = [];

  whiteStrArr.forEach(word => {
    let cleanedWord = cleanWord(word);
    
    if(!blackList.includes(cleanedWord)) {
      blackStrArr.push(cleanedWord);
    }
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

/*===================================
           MIXINS/CONNECTION
 ===================================*/
ReactMixin(CurrentClue.prototype, TimerMixin);

export default connect(_mapStateToProps, { updateCurrentGameScore })(CurrentClue);