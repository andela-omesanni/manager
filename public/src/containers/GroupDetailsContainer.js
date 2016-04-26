import GroupDetails from '../components/GroupDetails.js';
import { fetchGroup, fetchGroupSuccess, fetchGroupFailure, resetActiveGroup } from '../actions/group_actions';
import { connect } from 'react-redux';
import { notify } from 'react-notify-toast';



function mapStateToProps(state, ownProps) {
  return { 
    activeGroup: state.groups.activeGroup,
    loading: state.groups.activeGroup.loading
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchGroup: (id) => {
      dispatch(fetchGroup(id))
        .then((response) => {
          !response.error ? dispatch(fetchGroupSuccess(response.payload)) : dispatch(fetchGroupFailure(response.payload));
        }) 
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetails);
