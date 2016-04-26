import {
  FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, RESET_USERS,
  FETCH_USER, FETCH_USER_SUCCESS,  FETCH_USER_FAILURE, RESET_ACTIVE_USER,
  CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAILURE, RESET_NEW_USER,
  UPDATE_USER_DETAILS, UPDATE_USER_DETAILS_SUCCESS, UPDATE_USER_DETAILS_FAILURE,
  DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_FAILURE, RESET_DELETED_USER, RESET_USER_FIELDS
} from '../actions/user_actions';


const INITIAL_STATE = { 
  usersList: { users: [], error: null, loading: false },  
  newUser: { user: null, error: null, loading: false }, 
  activeUser: { user: null, error: null, loading: false, updating: false, updateError: false }, 
  deletedUser: { user: null, error: null, loading: false},
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {

    // start fetching all users and set loading = true
    case FETCH_USERS: 
      return { ...state, usersList: {users:[], error: null, loading: true} }; 
    
    // return list of users and make loading = false
    case FETCH_USERS_SUCCESS:
      return { ...state, usersList: {users: action.payload, error:null, loading: false} };
    
    // return error and make loading = false
    case FETCH_USERS_FAILURE:
      return { ...state, usersList: {users: null, error: action.payload, loading: false} };
   
    case RESET_USERS:
      return { ...state, usersList: {users: null, error: null, loading: false} };

    case FETCH_USER:
      return { ...state, activeUser:{...state.activeUser, loading: true}};
    
    case FETCH_USER_SUCCESS:
      return { ...state, activeUser: {user: action.payload.data, error: null, loading: false}};
    
    case FETCH_USER_FAILURE:
      return { ...state, activeUser: {user: null, error: action.payload.data, loading: false}};
    
    case RESET_ACTIVE_USER:
      return { ...state, activeUser: {user: null, error: null, loading: false}};

    case UPDATE_USER_DETAILS:
      return { ...state, activeUser: {...state.activeUser, updateError: false, updating: true}};
    
    case UPDATE_USER_DETAILS_SUCCESS:
      return { ...state, activeUser: {...state.activeUser, user: action.payload, updateError: false, updating: false }};
    
    case UPDATE_USER_DETAILS_FAILURE:
      return { ...state, activeUser: {...state.activeUser, updateError: action.payload, updating: false}};

    case CREATE_USER:
      return {...state, newUser: {...state.newUser, loading: true}}

    case CREATE_USER_SUCCESS:
      state.usersList.users.push(action.payload.data);
      state.usersList.error = null;
      state.usersList.loading = false;

      state = {...state, newUser: {user: action.payload.data, error: null, loading: false}};
      return state;

    case CREATE_USER_FAILURE:
      return {...state, newUser: {user: null, error: action.payload.data, loading: false}};

    case RESET_NEW_USER:
      return {...state,  newUser: {user: null, error: null, loading: false}};

    case DELETE_USER:
      return {...state, deletedUser: {...state.deletedUser, loading: true}};

    case DELETE_USER_SUCCESS:
      state.usersList.users.splice(action.payload.index, 1);
      state.error = null;
      state.loading = false;
      
      return {...state, deletedUser: {user: action.payload, error: null, loading: false}};

    case DELETE_USER_FAILURE:
      return {...state, deletedUser: {user: null, error: action.payload, loading: false}};

    case RESET_DELETED_USER:
      return {...state,  deletedUser: {user: null, error: null, loading: false}};

    case RESET_USER_FIELDS:
      return {...state, newUser: {...state.newUser, error: null, loading: null}};

    default:
      return state;
    }
}
