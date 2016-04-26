import React, { Component } from 'react';

let img = require('../../images/delete.png');

class GroupsList extends Component {

  renderGroups(groups) {
    return groups.map((group, index) => {
      return (
        <li className="list-group-item" key={index}>
          <div className="list-group-item__name-div">
            <a href={"groups/" + group.id}>{group.name}</a>
          </div>
          <img src={img} onClick={this.props.onDeleteClick.bind(this, group.id, index)}/>
        </li>
      );
    });
  }

  render() {
    const { groupList: { groups } } = this.props.groups;
    if(!this.props.loading && !groups.length) {
      return <div className="list"><h1>Groups</h1><span>No groups</span></div>      
    }

    return (
      <div className="list">
        <h1>Groups</h1>
        <ul className="list-group">
          {this.renderGroups(groups)}
        </ul>
      </div>
    );
  }
}


export default GroupsList;
