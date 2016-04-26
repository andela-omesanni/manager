import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class GroupDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    this.props.fetchGroup(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.activeGroup.error) {
      alert('No such group');
      this.context.router.push('/');
    } 
  }

  renderChips(members) {
    
    return members.map(function(member, index) {
      return (
        <div key={index} className="chips">{member.name}</div>
      );
    });
  }

  render() {
    const { group } = this.props.activeGroup;

    if(!group) {
      return <div className="spacer large details-loading">Loading...</div>;
    }

    return (
      <div className="outer-layer">
        <div className="spacer">
          <Link style={{color:'black'}} className="uppercase" to="/">
            <span>Back</span>
          </Link>
        </div>
        <div className="details-wrapper spacer">
          <h3 className="uppercase">{group.name + ' group'}</h3>
          <span className="header">{group.members.length ? 'Members' : 'No Members'}</span>
          <div className="chips-container spacer">
            {this.renderChips(group.members)}
          </div>
        </div>
      </div>
    );
  }
}

export default GroupDetails;
