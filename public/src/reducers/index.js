import { combineReducers } from 'redux';
import UsersReducer from './reducer_users';
import GroupsReducer from './reducer_groups';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  users: UsersReducer, 
  groups: GroupsReducer,
  form: formReducer 
});

export default rootReducer;
