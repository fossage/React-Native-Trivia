import {combineReducers} from 'redux';
import categories        from './reducer-categories';
import routes            from './reducer-routes';

const rootReducer = combineReducers({
  routes,
  categories
});

export default rootReducer;