import React from 'react';
import DocumentTitle from 'react-document-title';
import { LoginForm } from 'react-stormpath';
import {Button, Icon, Row, Input, Col, Card} from 'react-materialize';
import ToggleDisplay from 'react-toggle-display';
import { Link } from 'react-router';

export default class LoginPage extends React.Component {
  onFormSubmit(e, next) {
       var data = e.data;

      // Require passwords to be at least 10 characters.
      if (data.password.length < 10) {
        return next(new Error('Password must be at least 10 characters long.'));
      }

      // Force usernames to be in lowercase.
      data.username = data.username.toLowerCase();

      next(null, data);
    }



  render() {
    return (
      <Row className="parallax2">
        <Row>
          <div>
            <h2> Start Your Adventure Here! </h2>
          </div>
        </Row>
        <Row>
          <Col m={6} s={12} class="auth-form">
            <Card>
              <h3> Login </h3>
              <hr/>
                <LoginForm onSubmit={this.onFormSubmit.bind(this)} />
                <Link to="/createhunt">
                  <a className="transparent">QQQQQQQQQQQ</a>
                </Link>
            </Card>
          </Col>
          <Col m={6} s={12} class="auth-form">
            <Card>
              <h3> Sign Up </h3>
              <hr/>
              <form id="signup-form">
                <p className="alert alert-danger" spIf="form.error"><span spBind="form.errorMessage" /></p>
                <Input m={12} type="text" label="First Name" />
                <Input m={12} type="email" label="Email" />
                <Input m={12} type="password" label="Password" />
                <div>
                  <Link to="/createhunt">
                    <Button node='a' waves='light'><Icon right>file_cloud</Icon>Sign Up button</Button>
                  </Link>
                </div>
              </form>
            </Card>
          </Col>
        </Row>
      </Row>
    );
  }
}
