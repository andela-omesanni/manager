import UsersForm from '../components/UsersForm.js';
import { createUser, createUserSuccess, createUserFailure, resetNewUser } from '../actions/user_actions';
import { fetchGroups, fetchGroupsSuccess, fetchGroupsFailure } from '../actions/group_actions'
import { reduxForm } from 'redux-form';
import { notify } from 'react-notify-toast';

// Client side validation
function validate(values) {
  const errors = {};
  const groupSelect = document.getElementsByName('groupSelect')[0];
  let selectVal = null;

  selectVal = groupSelect ? groupSelect.value : selectVal;

  if(!values.userName || values.userName.trim() === '') {
    errors.userName = 'Enter the name of the user';
  }
  if(!selectVal || selectVal.trim() === '') {
    errors.groupSelect = 'User must belong to a group';
  }

  return errors;
}

// For any field errors upon submission (i.e. not instant check)
const validateAndCreateUser = (values, dispatch) => {

  return new Promise((resolve, reject) => {
    values.groupSelect = document.getElementsByName('groupSelect')[0].value;

   dispatch(createUser(values))
    .then((response) => {
      let data = response.payload.data;

      if(response.payload.status != 200) {
        // let other components know of error by updating the redux` state
        dispatch(createUserFailure(response.payload));

        // this is for redux-form itself
        reject(data); 
      } 
       else {
        notify.show('Success', 'success');
        // let other components know that everything is fine by updating the redux state
        dispatch(createUserSuccess(response.payload)); 

        // this is for redux-form itself
        resolve();
      }
    });
  });
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: validateAndCreateUser,
    fetchGroups: () => {
      dispatch(fetchGroups()).then((response) => {
        let data = response.payload.data ? response.payload.data : {data: 'Network Error'};
          !response.error ? dispatch(fetchGroupsSuccess(data)) : dispatch(fetchGroupsFailure(data));
        });
    },
    resetMe: () => {
      dispatch(resetNewUser());
    }
  }
}

function mapStateToProps(state, ownProps) {
  return { 
    newUser: state.users.newUser,
    groups: state.groups
  };
}

export default reduxForm({
  form: 'userForm', 
  fields: ['userName', 'groupSelect'], 
  validate 
}, mapStateToProps, mapDispatchToProps)(UsersForm);
