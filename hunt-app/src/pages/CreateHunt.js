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
    huntName: 'sample',
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
          <form id="huntForm" onSubmit={this.onSubmit.bind(this)} method="post">
            <Col m={6} s={12}>
              <label id="hunt-label"> Hunt Name
                <input class="hunt-input" type="text" name="hunt_name" />
              </label>
              <label id="hunt-label"> Start Time
                <input type="time" name="start_time"/>
              </label>
              <label id="hunt-label"> End Time
                <input type="time" name="end_time"/>
              </label>
            </Col>
            <Col m={6} s={12}>
              <label id="hunt-label"> Hunt Date
                <input class="hunt-input" type="date" name="date"/>
              </label>
              <label id="hunt-label"> Location
                <input type="text" name="location"/>
              </label>
              <label id="hunt-label"> Description
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
        <InviteUsers bar={ this.onToReview.bind(this) } asshat={ this.asshat }/>
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
