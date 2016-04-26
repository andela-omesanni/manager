import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';
import { deleteUser, deleteUserSuccess, deleteUserFailure, fetchUsers, fetchUsersSuccess, fetchUsersFailure } from '../actions/user_actions';
import UsersList from '../components/UsersList';


const mapStateToProps = (state) => {
  return { 
    users: state.users,
    loading: state.users.usersList.loading
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => {
      dispatch(fetchUsers()).then((response) => {
      		let data = response.payload.data ? response.payload.data : {data: 'Network Error'};
            !response.error ? dispatch(fetchUsersSuccess(data)) : dispatch(fetchUsersFailure(data));
          });
    },
    onDeleteClick: (userId, index) => {
      dispatch(deleteUser(userId))
        .then((response) => {
          let data = response.payload.data;

          if(response.error) {
            notify.show(data, 'error');
            return dispatch(deleteUserFailure(data));
          }

          data.index = index;
          dispatch(deleteUserSuccess(data));
        });
    }
  }
}


const UsersListContainer = connect(mapStateToProps, mapDispatchToProps)(UsersList);

export default UsersListContainer;
