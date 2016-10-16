const StyleSheet = require('react-native').StyleSheet;

export default StyleSheet.create({
  container: {
    paddingTop: 50
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

  clueStateContainer: {
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

  progressContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#cccccc',
  },

  progressBar: {
    height: 5,
    borderRadius: 5,
    backgroundColor: 'orange',
    width: 0
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