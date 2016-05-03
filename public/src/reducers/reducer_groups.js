import {
  FETCH_GROUPS, FETCH_GROUPS_SUCCESS, FETCH_GROUPS_FAILURE, RESET_GROUPS,
  FETCH_GROUP, FETCH_GROUP_SUCCESS,  FETCH_GROUP_FAILURE, RESET_ACTIVE_GROUP,
  CREATE_GROUP, CREATE_GROUP_SUCCESS, CREATE_GROUP_FAILURE, RESET_NEW_GROUP,
  DELETE_GROUP, DELETE_GROUP_SUCCESS, DELETE_GROUP_FAILURE, RESET_DELETED_GROUP,
  VALIDATE_GROUP_FIELDS,VALIDATE_GROUP_FIELDS_SUCCESS, VALIDATE_GROUP_FIELDS_FAILURE, RESET_GROUP_FIELDS
} from '../actions/group_actions';


const INITIAL_STATE = { 
  groupList: { groups: [], error: null, loading: false },  
  newGroup: { group: null, error: null, loading: false }, 
  activeGroup: { group: null, error: null, loading: false }, 
  deletedGroup: { group: null, error: null, loading: false },
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {

    // start fetching groups and set loading = true
    case FETCH_GROUPS: 
      return { ...state, groupList: {groups:[], error: null, loading: true}}; 
    
    // return list of groups and make loading = false
    case FETCH_GROUPS_SUCCESS:
      return { ...state, groupList: {groups: action.payload, error: null, loading: false}};
    
    // return error and make loading = false
    case FETCH_GROUPS_FAILURE:
      return { ...state, groupList: {groups: null, error: action.payload, loading: false}};
    
    // reset groupList to initial state
    case RESET_GROUPS:
      return { ...state, groupList: {groups: null, error:null, loading: false}};

    case FETCH_GROUP:
      return { ...state, activeGroup:{...state.activeGroup, loading: true}};
    
    case FETCH_GROUP_SUCCESS:
      return { ...state, activeGroup: {group: action.payload.data, error: null, loading: false}};
    
    case FETCH_GROUP_FAILURE:
      return { ...state, activeGroup: {group: null, error: action.payload.data, loading: false}};
    
    case RESET_ACTIVE_GROUP:
      return { ...state, activeGroup: {group: null, error: null, loading: false}};

    // create a new group
    case CREATE_GROUP:
      return {...state, newGroup: {...state.newGroup, loading: true}}
    
    // on successful creation, add new group to groups array
    case CREATE_GROUP_SUCCESS:
      state.groupList.groups.push(action.payload.data);
      state.groupList.error = null;
      state.groupList.loading = false;

      state = {...state, newGroup: {group: action.payload.data, error: null, loading: false}};
      return state;

    case CREATE_GROUP_FAILURE:
      return {...state, newGroup: {group: null, error: action.payload.data, loading: false}};
    
    case RESET_NEW_GROUP:
      return {...state,  newGroup: {group: null, error: null, loading: false}};

    case DELETE_GROUP:
      return {...state, deletedGroup: {...state.deletedGroup, loading: true}};
    
    case DELETE_GROUP_SUCCESS:
      state.groupList.groups.splice(action.payload.index, 1);
      state.error = null;
      state.loading = false;

      return {...state, deletedGroup: {group: action.payload, error: null, loading: false}};
    
    case DELETE_GROUP_FAILURE:
      return {...state, deletedGroup: {group: null, error: action.payload, loading: false}};

    // validate form fields when creating a group
    case VALIDATE_GROUP_FIELDS:
      return {...state, newGroup: {...state.newGroup, error: null, loading: true}};
    
    case VALIDATE_GROUP_FIELDS_SUCCESS:
      return {...state, newGroup: {...state.newGroup, error: null, loading: false}};
    
    case VALIDATE_GROUP_FIELDS_FAILURE:
      let error = {groupName: action.payload.data.groupName};

      return {...state, newGroup: {...state.newGroup, error: error, loading: false}};
    
    case RESET_GROUP_FIELDS:
      return {...state, newGroup: {...state.newGroup, error: null, loading: null}};
    
    default:
      return state;
  }
}
