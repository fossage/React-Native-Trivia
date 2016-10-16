import {combineReducers} from 'redux';
import categories        from './reducer-categories';
import routes            from './reducer-routes';
import user             from './reducer-user';

const rootReducer = combineReducers({
  routes,
  categories,
  user
});

export default rootReducer;