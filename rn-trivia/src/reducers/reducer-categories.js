import { FETCH_CATEGORIES, FETCH_1980 } from '../actions/index';

const INITIAL_STATE = {
  current: []
};

export default function CategoriesReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_CATEGORIES:
    case FETCH_1980:
      return { ...state, current: action.payload }

    default:
      return state;
  }
}