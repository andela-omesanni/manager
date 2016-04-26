import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Notifications from 'react-notify-toast'; 
import Header from '../components/header.js';
import GroupDetailsContainer from '../containers/GroupDetailsContainer.js';

class GroupShow extends Component {

  render() {
    return (
      <div className='container'>
        <Notifications />
        <Header />
        <GroupDetailsContainer id={this.props.params.id} />
      </div>
    );
  }
}

export default GroupShow;
