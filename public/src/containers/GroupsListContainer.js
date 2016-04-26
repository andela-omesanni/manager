import { connect } from 'react-redux'
import { notify } from 'react-notify-toast';
import { deleteGroup, deleteGroupSuccess, deleteGroupFailure, fetchGroups, fetchGroupsSuccess, fetchGroupsFailure } from '../actions/group_actions';
import GroupsList from '../components/GroupsList';


const mapStateToProps = (state) => {
  return { 
    groups: state.groups,
    loading: state.groups.groupList.loading
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteClick: (groupId, index) => {
      dispatch(deleteGroup(groupId))
        .then((response) => {
          let data = response.payload.data;

          if(response.error) {
            notify.show(data, 'error');
            return dispatch(deleteGroupFailure(data));
          }

          data.index = index;
          dispatch(deleteGroupSuccess(data));
        });
    }
  }
}


const GroupsListContainer = connect(mapStateToProps, mapDispatchToProps)(GroupsList);

export default GroupsListContainer;
