import React from 'react';
import DocumentTitle from 'react-document-title';
import { LoginForm } from 'react-stormpath';
import {Button, Icon, Row, Input, Col, Card} from 'react-materialize';

export default class LoginPage extends React.Component {
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
                <Input m={12} label="First Name" />
                <Input m={12} type="email" label="Email" />
                <Input m={12} type="password" label="Password" />
                <div>
                  <Button node='a' waves='light'><Icon right>file_cloud</Icon>Sign Up button</Button>
                </div>
              </form>
            </Card>
          </Col>
        </Row>
      </Row>  
    );
  }
}
