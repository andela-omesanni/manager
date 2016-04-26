import React, { Component } from 'react';
import { Link } from 'react-router';

let img = require('../../images/delete.png');

class UsersList extends Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  componentWillReceiveProps(nextProps) {
    
  }

  renderUsers(users) {
    return users.map((user, index) => {
      return (
        <li className="list-group-item" key={index}>
          <div className="list-group-item__name-div">
            <a href={"/users/" + user.id}>{user.name}</a>
          </div>
          <img src={img} onClick={this.props.onDeleteClick.bind(this, user.id, index)} />
        </li>
      );
    });
  }

  render() {
    const { usersList: { users } } = this.props.users;
    if(!this.props.loading && !users.length) {
      return <div className="list"><h1>Users</h1><span>No users</span></div>      
    }

    return (
      <div className="list">
        <h1>Users</h1>
        <ul className="list-group">
          {this.renderUsers(users)}
        </ul>
      </div>
    );
  }
}


export default UsersList;
