import React, { Component } from 'react';
import Notifications from 'react-notify-toast'; 
import Header from '../components/header.js';
import CreationContainer from '../containers/CreationContainer.js';
import UsersListContainer from '../containers/UsersListContainer.js';
import GroupsListContainer from '../containers/GroupsListContainer.js';

class Index extends Component {
  render() {
    return (
      <div className='container'>
        <Notifications />
        <Header />
        <CreationContainer />
        <div id="lists-wrapper" className="spacer">
          <UsersListContainer />
          <GroupsListContainer />
        </div>
      </div>
    );
  }
}


export default Index;
