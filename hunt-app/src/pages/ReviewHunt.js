import React from 'react';
import DocumentTitle from 'react-document-title';
import { If, Then, Else } from 'react-if';
import {Button, Icon, Row, Input, Col, Card, CardTitle, Navbar} from 'react-materialize';

export default class ReviewHunt extends React.Component {

  state = {
    data: [{}],
    page: "",
    name: ""
  };

  componentDidMount(){
    $.ajax({
      type: 'GET',
      url: '/api/hunts/',
      datatype: 'jsonp',
      success: data => {
        this.setState({data: data, page: 'hunts', name: data[0].hunt_name});
      }
    })
  };

  getGeneral (e) {
    e.preventDefault();
    $.ajax({
      type: 'GET',
      url: '/api/hunts',
      datatype: 'jsonp',
      success: data => {
        this.setState({data: data, page: 'hunts', name: data[0].hunt_name});
      }
    })
  };
  getClues (e) {
    e.preventDefault();
    $.ajax({
      type: 'GET',
      url: '/api/clues',
      datatype: 'jsonp',
      success: data => {
        this.setState({data: data, page: 'clues'});
      }
    })
  };
  getInvites (e) {
    e.preventDefault();
    $.ajax({
      type: 'GET',
      url: '/api/invites',
      datatype: 'jsonp',
      success: data => {
        this.setState({data: data, page: 'invites'});
      }
    })
  };

  render() {
    return (
      <Row>
        <div>
          <h2> Review Your Scavenger Hunt </h2>
        </div>
        <Card>
          <h3> Click on cards to review your Scavenger Hunt </h3>
          <h5> Click Submit to send invites, or Edit to alter details </h5>
          <Col m={4} s={12}>
            <div className="review-card card-panel teal lighten-2 waves-effect waves-light btn-large center-align" onClick={this.getGeneral.bind(this)} >General Information</div>
          </Col>
          <Col m={4} s={12}>
            <div className="review-card card-panel teal lighten-2 waves-effect waves-light btn-large center-align" onClick={this.getClues.bind(this)}>Clues and Locations</div>
          </Col>
          <Col m={4} s={12}>
            <div className="review-card card-panel teal lighten-2 waves-effect waves-light btn-large center-align" onClick={this.getInvites.bind(this)}>Invites</div>
          </Col>
          <Col m={8} s={12}>
            <If condition={ this.state.page === 'hunts' }>
              <Then>
                <Card className='large'
                  header={<CardTitle image='/css/party2.jpeg'>{this.state.data[0].hunt_name}</CardTitle>}
                  actions={[<a href='#'>Edit General Info</a>]}>
                  <div>Date: {this.state.data[0].date} </div>
                  <div>Starting Time: {this.state.data[0].start_time} </div>
                  <div>Ending Time: {this.state.data[0].end_time} </div>
                  <div>General Location: {this.state.data[0].location} </div>
                  <div>Description: {this.state.data[0].description} </div>
                </Card>
              </Then>
            </If>
            <If condition={ this.state.page === 'clues' }>
              <Then>
                <Card className='large'
                  header={<CardTitle image='/css/party2.jpeg'>{this.state.name}</CardTitle>} // insert map picture here
                  actions={[<a href='#'>Edit General Info</a>]}>
                  <div>Date: {this.state.data[0].date} </div>
                  <div>Starting Time: {this.state.data[0].start_time} </div>
                  <div>Ending Time: {this.state.data[0].end_time} </div>
                  <div>General Location: {this.state.data[0].location} </div>
                  <div>Description: {this.state.data[0].description} </div>
                </Card>
              </Then>
            </If>
            <If condition={ this.state.page === 'invites' }>
              <Then>
                <Card className='large'
                  header={<CardTitle image='/css/party2.jpeg'>{this.state.name}</CardTitle>} // insert map picture here
                  actions={[<a href='#'>Edit Invites</a>]}>
                  <div>Date: {this.state.data[0].date} </div>
                  <div>Starting Time: {this.state.data[0].start_time} </div>
                  <div>Ending Time: {this.state.data[0].end_time} </div>
                  <div>General Location: {this.state.data[0].location} </div>
                  <div>Description: {this.state.data[0].description} </div>
                </Card>
              </Then>
            </If>
          </Col>
        </Card>
      </Row>
    );
  }
}
