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
import styles                       from '../styles/styles-current-clue';
import { Actions }                  from 'react-native-router-flux';
import ScoreCounter                 from '../components/score-counter';
import { updateCurrentGameScore }   from '../actions/index';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import {
  cleanWord,
  blackList, 
  alternateText,
  createKeywords,
  compareKeywords,
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
  Animated,
  Dimensions,
  Easing
} = ReactNative;

/*===================================
           CLASS DEFINITION
 ===================================*/
class CurrentClue extends Component{
  constructor(props) {
    super(props);

    this.state = { 
      userAnswer: '',
      difficultyIdx: 0,
      currentDifficulty: 0,
      correctLastAnswer: false,
      timerProgress: new Animated.Value(0),
      processingLastAnswer: false
    };

    this.data = {
      progress: new Animated.Value(0),
      easing: Easing.inOut(Easing.ease),
      easingDuration: 500,
      width: Dimensions.get('window').width
    };

    _.mixin(inflection);
  }

  componentWillMount() {
    // sort clues by easiest first
    const sortedClues = this.props.clues.sort((a, b) => a.value - b.value);
    this.props.clues = _.remove(sortedClues, clue => !clue.value);

    // ensure we clear any existing score
    this.props.updateCurrentGameScore(-this.props.currentScore);
    this.setState({currentDifficulty: this.props.clues[0].value})
  }

  componentDidMount() {
    this._startTimer();
  }
  
  render() {
    const fillWidth = this.data.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.data.width - 20],
    });

    return (
      <View style={{paddingTop: 65}}>
        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressBar, {width: fillWidth}]}/>
        </View>

        <View style={styles.clueStateContainer}>
          <Text style={styles.difficultyText}>
            {this.state.currentDifficulty}
          </Text>
          
          { this._renderProgress(this.props.currentScore) }
          { this._renderClue(this.props.clues)            }
          { this._renderAnswer()                          }
        </View>
      </View>
    );
  }

  /*============== RENDER HELPERS =============*/
  _renderProgress(score) {
    return (
     <AnimatedCircularProgress
        size={80}
        width={3}
        rotation={0}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
        fill={this.state.timerProgress}>
        { () => <Text style={styles.pointText}>{score}</Text> }
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
            blurOnSubmit={true}
            onChangeText={ userAnswer => {
              if(this.state.processingLastAnswer) return false;
              this.setState({userAnswer})
            }} 
          />
        </View>
      </View>
    )
  }

  _renderAnswer() {
     if(this.state.actualAnswer) {
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

 /*=============== HANDLERS ==============*/
  _handleSubmit() {
    if(this.state.processingLastAnswer) return false;
    let current      = this.props.clues[this.state.difficultyIdx];
    let actualAnswer = current.answer;
    let userAnswer   = this.state.userAnswer;

    // break the words up into an array and lowercase them
    let actualAnswerKeys     = createKeywords(actualAnswer, blackList);
    let userAnswerKeys       = createKeywords(userAnswer, blackList);
    let correctLastAnswer    = compareKeywords(actualAnswerKeys, userAnswerKeys)
    let currentRoundPoints   = correctLastAnswer ? current.value : -current.value;
    let processingLastAnswer = true;
    
    this.props.updateCurrentGameScore(currentRoundPoints)
    this.state.timerProgress.setValue(0);

    this.setState({ 
      actualAnswer,
      correctLastAnswer,
      processingLastAnswer
    });

    this.setTimeout(() => {
      let difficultyIdx = this.state.difficultyIdx + 1;
      this.setState({processingLastAnswer: false});

      (difficultyIdx === this.props.clues.length) 
        ? Actions.categoriesIndex()
        : this._updateAndGoToNextClue(difficultyIdx);
    }, 4000);
  }

  _startTimer() {
    Animated.timing(this.state.timerProgress, {
      toValue: 100,
      duration: 20000
    })
    .start(e => {
      if(e.finished) {
        let timerProgress = new Animated.Value(0);
        this.setState({ timerProgress });
        this._handleSubmit();
      }
    });        
  }

  _updateProgressBar() {
    Animated.timing(this.data.progress, {
      easing: this.data.easing,
      duration: this.data.easingDuration,
      toValue: this.data.progress
    }).start();
  }

  _updateAndGoToNextClue(difficultyIdx) {
    let {easing}          = this.data;
    let duration          = this.data.easingDuration;
    let toValue           = difficultyIdx / (this.props.clues.length - 1)
    let userAnswer        = '';
    let actualAnswer      = '';
    let currentDifficulty = this.props.clues[difficultyIdx].value;
    
    Animated
    .timing(this.data.progress, {
      easing,
      duration,
      toValue
    }).start();

    this.setState({
      userAnswer,
      actualAnswer,
      difficultyIdx,
      currentDifficulty
    });

    this._startTimer();
  }
}

/*===================================
           PRIVATE FUNCTIONS
 ===================================*/
function _mapStateToProps(state){
  return {currentScore: state.user.currentGameScore}
}

/*===================================
           MIXINS/CONNECTION
 ===================================*/
ReactMixin(CurrentClue.prototype, TimerMixin);

export default connect(_mapStateToProps, { updateCurrentGameScore })(CurrentClue);