import React, { Component, PropTypes } from 'react';
import ReactTags from 'react-tag-autocomplete';
import { Link } from 'react-router';

class UserDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.resetMe();
    this.props.fetchGroups();
  }

  componentDidMount() {
    this.props.fetchUser(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.activeUser.error) {
      alert('No such user');
      this.context.router.push('/');
    } 
  }

  handleDelete(index) {
    const { user } = this.props.activeUser;
    this.props.removeUserFromGroup(user, user.groups[index].id);
  }

  handleAddition(tag) {
    const { user } = this.props.activeUser;
    const { groupList: { groups } } = this.props.groups;

    const intersection = groups.find(function(group) {
      return group.name === tag.name;
    });

    // only allow groups which currently exist in the database
    if(!intersection) 
      return;

    this.props.addUserToGroup(user, tag);
  }

  render() {
    const { user } = this.props.activeUser;

    if(!user) {
      return <div className="spacer large details-loading">Loading...</div>;
    }

    const { groupList: { groups } } = this.props.groups;

    return (
      <div className="outer-layer">
        <div className="spacer">
          <Link style={{color:'black'}} className="uppercase" to="/">
            <span>Back</span>
          </Link>
        </div>
        <div className="details-wrapper spacer">
          <h3 className="uppercase">{user.name}</h3>
          <span className="header">Groups </span>
          <ReactTags
              tags={user.groups}
              placeholder="Add a new group tag"
              suggestions={groups}
              handleDelete={this.handleDelete.bind(this)}
              handleAddition={this.handleAddition.bind(this)} />
        </div>
      </div>
    );
  }
}

export default UserDetails;
