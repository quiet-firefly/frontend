import React from 'react';
import DocumentTitle from 'react-document-title';
import {Button, Icon, Row, Input, Col, Card} from 'react-materialize';

export default class CreateHunt extends React.Component {

  onSubmit (e) {
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/api/hunts',
      data: $('#huntForm').serialize()
    });
  };

  render () {
    return (
      <Row>
        <div>
          <h3>Create a Scavenger Hunt</h3>
        </div>
        <Card>
          <form id="huntForm" onSubmit={this.onSubmit} method="post">
            <label> Hunt Name
              <input type="text" name="hunt_name" />
            </label>
            <label> Hunt Date
              <input type="date" name="date"/>
            </label>
            <label> Start Time
              <input type="time" name="start_time"/>
            </label>
            <label> End Time
              <input type="time" name="end_time"/>
            </label>
            <label> Location
              <input type="text" name="location"/>
            </label>
            <label> Description
              <input type="text" name="description"/>
            </label>
            <button> Submit </button>
          </form>
        </Card>
      </Row>
    )
  };
}
