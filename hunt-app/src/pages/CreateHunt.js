import React from 'react';
import DocumentTitle from 'react-document-title';
import {Button, Icon, Row, Input, Col, Card} from 'react-materialize';
import { GoogleMap, Marker, SearchBox } from "react-google-maps";
import CreateClues from './CreateClues';
import InviteUsers from './InviteUsers';
import ReviewHunt from './ReviewHunt';
import { If, Then, Else } from 'react-if';


export default class CreateHunt extends React.Component {

  state = {
    huntName: '',
    page: "CreateHunt"
  };

  onSubmit (e) {
    e.preventDefault();
    var huntInput = $('#huntForm').find('input[name="hunt_name"]').val();
    console.log("This is the huntInput variable:" + huntInput);
    this.setState({huntName: huntInput});
    console.log(this.state.huntName);
    $.ajax({
      type: 'POST',
      url: '/api/hunts',
      data: $('#huntForm').serialize()
    });
    this.setState({page: "CreateClues"})
  };

  onToInvites (e) {
    e.preventDefault();
    this.setState({page: 'InviteUsers'});
  };

  onToReview (e) {
    e.preventDefault();
    this.setState({page: 'ReviewHunt'});
  };

  render () {
    return (
      <div>
      <If condition={ this.state.page === 'CreateHunt' }>
        <Then>
      <Row>
        <div>
          <h2> Create a Scavenger Hunt </h2>
        </div>
        <Card>
          <h3> General Information </h3>
          <form id="huntForm" onSubmit={this.onSubmit.bind(this)} method="post">
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
            <button type="submit" className={"btn-large"}> Create Your Hunt! </button>
          </form>
        </Card>
        </Row>
      </Then>
    </If>
    <If condition={ this.state.page === 'CreateClues' }>
      <Then>
        <CreateClues foo={ this.onToInvites.bind(this) }/>
      </Then>
    </If>
    <If condition={ this.state.page === 'InviteUsers' }>
      <Then>
        <InviteUsers bar={ this.onToReview.bind(this) }/>
      </Then>
    </If>
    <If condition={ this.state.page === 'ReviewHunt' }>
      <Then>
        <ReviewHunt />
      </Then>
    </If>
    </div>
    )
  };
}
