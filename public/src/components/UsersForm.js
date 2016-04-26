import React, { Component } from 'react';

class UsersForm extends Component {
  componentWillMount() {
    this.props.fetchGroups();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.newUser.user) { 
      nextProps.resetMe();
      nextProps.initializeForm({'userName': ''});
    }
  }

  displayOptions() {
    if(this.props.groups.groupList.groups.length) {
      return this.props.groups.groupList.groups.map(function(group, index) {
        return (
          <option key={index} value={group.id}>{group.name}</option>
        )
      });
    }
    return (<option value="none"> none</option>);
  }

  render() {

    const { fields: { userName, groupSelect }, handleSubmit, submitting } = this.props;

    return (
      <div id="user-form-wrapper">
        <form name="userForm" onSubmit={ handleSubmit(this.props.createUser.bind(this)) }>
          <div className={`form-group ${userName.touched && userName.invalid ? 'has-error' : ''}`}>
            <label> Name </label>
            <input name="userName" type="text" {...userName} />
            <div className="help-block">
              {userName.touched ? userName.error : ''}
            </div>
          </div>

          <div className={`form-group ${groupSelect.touched && groupSelect.invalid ? 'has-error' : ''}`}>
            <label> Group </label>
            <select name="groupSelect" ref="selectInput" {...groupSelect} >
              {this.displayOptions()}     
            </select>
            <div className="help-block">
              {groupSelect.touched ? groupSelect.error : ''}
            </div>
          </div>
          <button type="submit" disabled={submitting || userName.invalid || !this.props.groups.groupList.groups.length}>Create User</button>
        </form>
      </div>
    );
  }
}

export default UsersForm;