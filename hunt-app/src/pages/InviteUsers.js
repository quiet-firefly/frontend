import React from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';
import {Button, Icon, Row, Input, Col, Card} from 'react-materialize';

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
    console.log('rendering');
    return (
      <Row>
        <div>
          <h2> Invites </h2>
        </div>
        <Row>
          <Col m={6} s={12} class="auth-form">
            <Card>
              <h3> Send Invite </h3>
              <h6 className={"invite-subhead"}> for "hunt name goes here" </h6>
              <hr />
              <form id="inviteUser">
                <Input m={12} label="Name" id="name" type="text"/>
                <Input m={12} label="Email" id="email" type="text" />

                <Col m={12}>
                  <label> RSVP By:
                    <input id="rsvp_by" type="date" name="rsvp_by" />
                  </label>
                </Col>
                <div>
                  <button className={"btn invite-button"} onClick={this.inviteUser}> Invite User </button>
                  <span className={"push-down"}> or </span>
                    <button onClick={this.props.bar} className={"btn invite-button"}> Return to Hunt Page </button>
                </div>
              </form>
            </Card>
          </Col>

          <Col m={6} s={12} class="auth-form">
            <Card>
              <h3> Invited Users </h3>
              <hr />

            </Card>
          </Col>
        </Row>
      </Row>
    )
  };
}
