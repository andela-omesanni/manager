import UserDetails from '../components/UserDetails.js';
import { fetchGroups, fetchGroupsSuccess, fetchGroupsFailure } from '../actions/group_actions';
import { fetchUser, fetchUserSuccess, fetchUserFailure, resetActiveUser, updateUserDetails, updateUserDetailsSuccess, updateUserDetailsFailure } from '../actions/user_actions';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';



function mapStateToProps(state, ownProps) {
  return { 
    activeUser: state.users.activeUser,
    groups: state.groups
  };
}

function findIndex(groups, groupId) {
  return groups.findIndex(function(group) {
    return group.id === groupId;
  });
}

function dispatchEvents(dispatch, userId, group, action, cb) {
  let payload = { groupId: group.id || group, action: action };

  dispatch(updateUserDetails(userId, payload))
    .then((response) => {
      const data = response.payload.data;

      if(response.error) {
        notify.show(data, 'error');
        return dispatch(updateUserDetailsFailure(data));
      }

      if(action == 'addToGroup') {
        return cb();
      }
      dispatch(updateUserDetailsSuccess(data));
    }); 
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchGroups: () => {
      dispatch(fetchGroups()).then((response) => {
        let data = response.payload.data ? response.payload.data : {data: 'Network Error'};
          !response.error ? dispatch(fetchGroupsSuccess(data)) : dispatch(fetchGroupsFailure(data));
        });
    },
    fetchUser: (id) => {
      dispatch(fetchUser(id))
        .then((response) => {
          !response.error ? dispatch(fetchUserSuccess(response.payload)) : dispatch(fetchUserFailure(response.payload));
        }) 
    },
    removeUserFromGroup: (user, groupId) => {
      const index = findIndex(user.groups, groupId);

      if(index > -1) {
        dispatchEvents(dispatch, user.id, groupId, 'removeFromGroup');
      } 
      else {
        notify.show('User does not currently belong to this group', 'error');
      }

    },
    addUserToGroup: (user, group) => {
      const index = findIndex(user.groups, group.id);

      if(index === -1) {
        dispatchEvents(dispatch, user.id, group, 'addToGroup', function() {
          user.groups.push(group);
          dispatch(updateUserDetailsSuccess(user));
        });
      }
      else {
        notify.show('User already belongs to this group', 'error');
      }
    },
    resetMe: () => {
      dispatch(resetActiveUser());
   }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
