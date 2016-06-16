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
          <h2> Create a Scavenger Hunt </h2>
        </div>
        <Card>
          <h3>General Information</h3>
          <form id="huntForm" onSubmit={this.onSubmit} method="post">
            <Col m={6} s={12}>
              <label> Hunt Name
                <input type="text" name="hunt_name" />
              </label>
              <label> Start Time
                <input type="time" name="start_time"/>
              </label>
              <label> Location
                <input type="text" name="location"/>
              </label>
            </Col>
            <Col m={6} s={12}>
              <label> Hunt Date
                <input type="date" name="date"/>
              </label>
              <label> End Time
                <input type="time" name="end_time"/>
              </label>
              <label> Description
                <input type="text" name="description"/>
              </label>
            </Col>
            <button> Submit </button>
          </form>
        </Card>
      </Row>
    )
  };
}
