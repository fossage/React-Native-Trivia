import { 
  UPDATE_CURRENT_SCORE,
  SET_USER
} from '../actions/index';

import _ from 'lodash';

const INITIAL_STATE = {
  username: '',
  email: '',
  id: null,
  currentGameScore: 0,
};

export default function UserReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case UPDATE_CURRENT_SCORE:
      return { ...state, currentGameScore: (state.currentGameScore + action.payload) }
    
    case SET_USER:
      return { ...state, ..._.pick(action.payload, ['email', 'id', 'username']) }

    default:
      return state;
  }
}