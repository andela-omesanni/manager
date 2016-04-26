import axios from 'axios';

// Group list
export const FETCH_GROUPS = 'FETCH_GROUPS';
export const FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS';
export const FETCH_GROUPS_FAILURE = 'FETCH_GROUPS_FAILURE';
export const RESET_GROUPS = 'RESET_GROUPS';

// Create new group
export const CREATE_GROUP = 'CREATE_GROUP';
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS';
export const CREATE_GROUP_FAILURE = 'CREATE_GROUP_FAILURE';
export const RESET_NEW_GROUP = 'RESET_NEW_GROUP';

// Validate group fields like Title, Categries on the server
export const VALIDATE_GROUP_FIELDS = 'VALIDATE_GROUP_FIELDS';
export const VALIDATE_GROUP_FIELDS_SUCCESS = 'VALIDATE_GROUP_FIELDS_SUCCESS';
export const VALIDATE_GROUP_FIELDS_FAILURE = 'VALIDATE_GROUP_FIELDS_FAILURE';
export const RESET_GROUP_FIELDS = 'RESET_GROUP_FIELDS';

// Fetch group
export const FETCH_GROUP = 'FETCH_GROUP';
export const FETCH_GROUP_SUCCESS = 'FETCH_GROUP_SUCCESS';
export const FETCH_GROUP_FAILURE = 'FETCH_GROUP_FAILURE';
export const RESET_ACTIVE_GROUP = 'RESET_ACTIVE_GROUP';

// Delete group
export const DELETE_GROUP = 'DELETE_GROUP';
export const DELETE_GROUP_SUCCESS = 'DELETE_GROUP_SUCCESS';
export const DELETE_GROUP_FAILURE = 'DELETE_GROUP_FAILURE';
export const RESET_DELETED_GROUP = 'RESET_DELETED_GROUP';


const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';


export function fetchGroups() {
  const request = axios.get(`${ROOT_URL}/groups`);

  return {
    type: FETCH_GROUPS,
    payload: request
  };
}

export function fetchGroupsSuccess(groups) {
  return {
    type: FETCH_GROUPS_SUCCESS,
    payload: groups
  };
}

export function fetchGroupsFailure(error) {
  return {
    type: FETCH_GROUPS_FAILURE,
    payload: error
  };
}

export function validateGroupFields(props) {
  const request = axios.post(`${ROOT_URL}/validateGroupFields`, props);

  return {
    type: VALIDATE_GROUP_FIELDS,
    payload: request
  };
}

export function validateGroupFieldsSuccess() {
  return {
    type: VALIDATE_GROUP_FIELDS_SUCCESS
  };
}

export function validateGroupFieldsFailure(error) {
  return {
    type: VALIDATE_GROUP_FIELDS_FAILURE,
    payload: error
  };
}

export function resetGroupFields() {
  return {
    type: RESET_GROUP_FIELDS
  }
};


export function createGroup(props) {
  const request = axios.post(`${ROOT_URL}/groups`, props);

  return {
    type: CREATE_GROUP,
    payload: request
  };
}

export function createGroupSuccess(newGroup) {
  return {
    type: CREATE_GROUP_SUCCESS,
    payload: newGroup
  };
}

export function createGroupFailure(error) {
  return {
    type: CREATE_GROUP_FAILURE,
    payload: error
  };
}

export function resetNewGroup() {
  return {
    type: RESET_NEW_GROUP
  }
};

export function resetDeletedGroup() {
  return {
    type: RESET_DELETED_GROUP
  }
};

export function fetchGroup(id) {
  const request = axios.get(`${ROOT_URL}/groups/${id}`);

  return {
    type: FETCH_GROUP,
    payload: request
  };
}


export function fetchGroupSuccess(activeGroup) {
  return {
    type: FETCH_GROUP_SUCCESS,
    payload: activeGroup
  };
}

export function fetchGroupFailure(error) {
  return {
    type: FETCH_GROUP_FAILURE,
    payload: error
  };
}

export function resetActiveGroup() {
  return {
    type: RESET_ACTIVE_GROUP
  }
};

export function deleteGroup(id) {
  const request = axios.delete(`${ROOT_URL}/groups/${id}`);

  return {
    type: DELETE_GROUP,
    payload: request
  };
}

export function deleteGroupSuccess(deletedGroup) {
  return {
    type: DELETE_GROUP_SUCCESS,
    payload: deletedGroup
  };
}

export function deleteGroupFailure(response) {
  return {
    type: DELETE_GROUP_FAILURE,
    payload: response
  };
}