import React, { Component } from 'react';
import UsersFormContainer from './UsersFormContainer';
import GroupsFormContainer from './GroupsFormContainer';

class CreationContainer extends Component {
  componentWillMount() {
  }

  render() {

    return (
      <div id="creation-container" className="spacer">
        <UsersFormContainer/>
        <GroupsFormContainer/>
      </div>
    );
  }
}


export default CreationContainer;
