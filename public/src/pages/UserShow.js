import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Notifications from 'react-notify-toast'; 
import Header from '../components/header.js';
import UserDetailsContainer from '../containers/UserDetailsContainer.js';

class UserShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    return (
      <div className='container'>
        <Notifications />
        <Header />
        <UserDetailsContainer id={this.props.params.id} />
      </div>
    );
  }
}

export default UserShow;
