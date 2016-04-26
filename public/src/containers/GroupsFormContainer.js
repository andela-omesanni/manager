import GroupsForm from '../components/GroupsForm.js';
import { createGroup, createGroupSuccess, createGroupFailure, resetNewGroup, validateGroupFields, validateGroupFieldsSuccess, validateGroupFieldsFailure } from '../actions/group_actions';
import { reduxForm } from 'redux-form';
import { notify } from 'react-notify-toast';

// Client side validation
function validate(values) {
  const errors = {};

  if(!values.groupName || values.groupName.trim() === '') {
    errors.groupName = 'Enter a name for the group';
  }

  return errors;
}

// For instant async server validation
const asyncValidate = (values, dispatch) => {

  return new Promise((resolve, reject) => {

    dispatch(validateGroupFields(values))
      .then((response) => {
        let data = response.payload.data;
        // if status is not 200 or group name already exists
        if(response.payload.status != 200 || data.groupName) {
          // let other components know of error by updating the redux state
          dispatch(validateGroupFieldsFailure(response.payload));

          //this is for redux-form itself
          reject(data); 
        } 
        else {
          // let other components know that everything is fine by updating the redux state
          dispatch(validateGroupFieldsSuccess(response.payload));

          //this is for redux-form itself
          resolve();
        }
      });
  });
};

// For any field errors upon submission (i.e. not instant check)
const validateAndCreateGroup = (values, dispatch) => {

  return new Promise((resolve, reject) => {

   dispatch(createGroup(values))
    .then((response) => {
        let data = response.payload.data;
        // if any one of these exist, then there is a field error 
        if(response.payload.status != 200) {
          dispatch(createGroupFailure(response.payload));
          reject(data); 
        } 
        else {
          notify.show('Success', 'success');
          dispatch(createGroupSuccess(response.payload)); 
          resolve();
        }
      });
  });
};

const mapDispatchToProps = (dispatch) => {
  return {
    createGroup: validateAndCreateGroup,
    resetMe: () => {
      dispatch(resetNewGroup());
    }
  }
}

function mapStateToProps(state, ownProps) {
  return { 
    newGroup: state.groups.newGroup
  };
}

export default reduxForm({
  form: 'groupForm', 
  fields: ['groupName'], 
  asyncValidate,
  asyncBlurFields: ['groupName'],
  validate 
}, mapStateToProps, mapDispatchToProps)(GroupsForm);
