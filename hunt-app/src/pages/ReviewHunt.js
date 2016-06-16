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

  getGeneral (e) {
    e.preventDefault();
    $.ajax({
      type: 'GET',
      url: '/api/hunts',
      datatype: 'jsonp',
      success: data => {
        this.setState({data: data, page: 'hunts', name: data[0].hunt_name});
        console.log(data);
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
        console.log(data);
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
        console.log(data);
      }
    })
  };

  render() {
    return (
      <div className="content">
        <h2> Review Your Hunt </h2>
        <Row>
          <Col l={3} m={4} s={12}>
            <div className="card-panel teal lighten-2 waves-effect waves-light btn-large center-align" onClick={this.getGeneral.bind(this)} >General Information</div>
            <div className="card-panel teal lighten-2 waves-effect waves-light btn-large center-align" onClick={this.getClues.bind(this)}>Clues and Locations</div>
            <div className="card-panel teal lighten-2 waves-effect waves-light btn-large center-align" onClick={this.getInvites.bind(this)}>Invites</div>
          </Col>
          <If condition={ this.state.page === 'hunts' }>
            <Then>
              <Col l={9} m={8} s={12}>
                <Card className='large'
                  header={<CardTitle image='/css/party2.jpeg'>{this.state.data[0].hunt_name}</CardTitle>}
                  actions={[<a href='#'>Edit General Info</a>]}>
                  <div>Date: {this.state.data[0].date} </div>
                  <div>Starting Time: {this.state.data[0].start_time} </div>
                  <div>Ending Time: {this.state.data[0].end_time} </div>
                  <div>General Location: {this.state.data[0].location} </div>
                  <div>Description: {this.state.data[0].description} </div>
                </Card>
              </Col>
            </Then>
          </If>
          <If condition={ this.state.page === 'clues' }>
            <Then>
              <Col l={9} m={8} s={12}>
                <Card className='large'
                  header={<CardTitle image='/css/party2.jpeg'>{this.state.name}</CardTitle>} // insert map picture here
                  actions={[<a href='#'>Edit General Info</a>]}>
                  <div>Date: {this.state.data[0].date} </div>
                  <div>Starting Time: {this.state.data[0].start_time} </div>
                  <div>Ending Time: {this.state.data[0].end_time} </div>
                  <div>General Location: {this.state.data[0].location} </div>
                  <div>Description: {this.state.data[0].description} </div>
                </Card>
              </Col>
            </Then>
              </If>
          <If condition={ this.state.page === 'invites' }>
            <Then>
              <Col l={9} m={8} s={12}>
                <Card className='large'
                  header={<CardTitle image='/css/party2.jpeg'>{this.state.name}</CardTitle>} // insert map picture here
                  actions={[<a href='#'>Edit General Info</a>]}>
                  <div>Date: {this.state.data[0].date} </div>
                  <div>Starting Time: {this.state.data[0].start_time} </div>
                  <div>Ending Time: {this.state.data[0].end_time} </div>
                  <div>General Location: {this.state.data[0].location} </div>
                  <div>Description: {this.state.data[0].description} </div>
                </Card>
              </Col>
            </Then>
          </If>
        </Row>
      </div>
    );
  }
}
