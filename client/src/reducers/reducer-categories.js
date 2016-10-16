import { 
  FETCH_CATEGORIES, 
  FETCH_1980,
  FETCH_1990,
  FETCH_2000,
  FETCH_MODERN
} from '../actions/index';

const INITIAL_STATE = {
  current: []
};

export default function CategoriesReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_CATEGORIES:
    case FETCH_1980:
    case FETCH_1990:
    case FETCH_2000:
    case FETCH_MODERN:
      return { ...state, current: action.payload }

    default:
      return state;
  }
}