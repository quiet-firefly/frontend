import React from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';

export default class InviteUsers extends React.Component {

  inviteUser(e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/api/invites',
      data: $('#inviteUser').serialize()
    });
    $('#name').val('');
    $('#email').val('');
  };

  render () {
    return (
      <div className={"row"}>
        <div>
          <h4 className={"red-text"}> Invite Users </h4>
          <h6 className={"invite-subhead"}> for "hunt name goes here" </h6>
        </div>
        <div className={"row"}>
          <form id="inviteUser">
            <input type="hidden" name="hunt_id" value="1"/>
            <div className={"row"}>
              <div className={"col m3"}>
                <label> RSVP By:
                  <input id="rsvp_by" type="date" name="rsvp_by"/>
                </label>
              </div>
            </div>
            <div className={"col m3"}>
              <label> Name
                <input id="name" type="text" name="name"/>
              </label>
            </div>
            <div className={"col m3 md-offset-1"}>
              <label> Email
                <input id="email" type="email" name="email"/>
              </label>
            </div>
            <div>
              <button className={"btn invite-button"} onClick={this.inviteUser}> Invite User </button>
              <span className={"push-down"}> or </span>
              <Link to='/reviewhunt'>
                <button className={"btn invite-button"}> Return to Hunt Page </button>
              </Link>
            </div>
          </form>
        </div>
        <h3> Invited Users </h3>
      </div>
    )
  };
}
