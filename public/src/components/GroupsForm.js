import React, { Component, PropTypes } from 'react';

class GroupsForm extends Component {

  componentWillMount() {
    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.newGroup.group) { 
      nextProps.resetMe();
      nextProps.initializeForm({'groupName': ''});
    }
  }

  render() {
    const { asyncValidating, fields: { groupName }, handleSubmit, submitting } = this.props;

    return (
      <div id="group-form-wrapper">
        <form name="groupForm" onSubmit={ handleSubmit(this.props.createGroup.bind(this)) }>
          <div className={`form-group ${groupName.touched && groupName.invalid ? 'has-error' : ''}`}>
            <label> Name </label>
            <input name="groupName" type="text" {...groupName} />
            <div className="help-block">
              {groupName.touched ? groupName.error : ''}
            </div>
            <div className="help-block">
              {asyncValidating === 'groupName'? 'validating..': ''}
            </div>
          </div>
          <button type="submit" disabled={submitting || groupName.invalid}>Create Group</button>
        </form>
      </div>
    );
  }
}

export default GroupsForm;