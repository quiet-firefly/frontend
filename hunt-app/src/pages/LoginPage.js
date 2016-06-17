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
      <Row className="parallax2">
        <Form schema={modelSchema} defaultValue={modelSchema.default()}>
          <div>
            <label>Name</label>

            <Form.Field name='name.first' placeholder='First name'/>
            <Form.Field name='name.last' placeholder='Surname'/>

            <Form.Message for={['name.first', 'name.last']}/>
          </div>

          <label>Date of Birth</label>
          <Form.Field name='dateOfBirth'/>
          <Form.Message for='dateOfBirth'/>

          <label>Favorite Color</label>
          <Form.Field name='colorId' type='select'>
            <option value={null}>Select a color...</option>
            <option value={0}>Red</option>
            <option value={1}>Yellow</option>
            <option value={2}>Blue</option>
            <option value={3}>other</option>
          </Form.Field>
          <Form.Message for='colorId'/>

        <Form.Button type='submit'>Submit</Form.Button>
      </Form>

      <Row>
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
              <form id="signin-form">
                <p className="alert alert-danger" spIf="form.error"><span spBind="form.errorMessage" /></p>

                <Input m={12} label="First Name" />
                <Input m={12} type="email" label="Email" />
                <Input m={12} type="password" label="Password" />
                <div>
                  <Link to="/createhunt">
                    <Button node='a' waves='light'><Icon right>perm_identity</Icon>login button</Button>
                  </Link>
                </div>
              </form>
            </Card>
          </Col>
          <Col m={6} s={12} class="auth-form">
            <Card>
              <h3> Sign Up </h3>
              <hr/>
              <form id="signup-form">
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
        <LoginForm onSubmit={this.onFormSubmit.bind(this)} />
      </Row>
    );
  }
}
