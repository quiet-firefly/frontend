import React from 'react';
import DocumentTitle from 'react-document-title';
import { LoginForm } from 'react-stormpath';
import {Button, Icon, Row, Input, Col, Card} from 'react-materialize';
import ToggleDisplay from 'react-toggle-display';

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
      <Row>
        <div>
          <h2> Account Access </h2>
        </div>
        <Row>
          <Col m={6} s={12} class="auth-form">
            <Card>
              <h3> Login </h3>
              <hr />
              <form id="signin-form">

                <p className="alert alert-danger" spIf="form.error"><span spBind="form.errorMessage" /></p>

                <Input m={12} label="First Name" />
                <Input m={12} type="email" label="Email" />
                <Input m={12} type="password" label="Password" />
                <div>
                  <Button node='a' waves='light'><Icon right>file_cloud</Icon>login button</Button>
                </div>
              </form>
            </Card>
          </Col>
          <Col m={6} s={12} class="auth-form">
            <Card>
              <h3> Sign Up </h3>
              <hr />
              <form id="signup-form">
                <Input m={12} type="text" label="First Name" />
                <Input m={12} type="email" label="Email" />
                <Input m={12} type="password" label="Password" />
                <div>
                  <Button node='a' waves='light' type="submit"><Icon right>file_cloud</Icon>Sign Up button</Button>
                </div>
              </form>
            </Card>
          </Col>
        </Row>
        <LoginForm onSubmit={this.onFormSubmit.bind(this)} />
      </Row>
    );
  }
}
