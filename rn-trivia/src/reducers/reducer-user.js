import { UPDATE_CURRENT_SCORE } from '../actions/index';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  avatarUrl: '',
  currentGameScore: 0,
  allTimeScore: 0,
};

export default function UserReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case UPDATE_CURRENT_SCORE:
      return { ...state, currentGameScore: (state.currentGameScore + action.payload) }

    default:
      return state;
  }
}