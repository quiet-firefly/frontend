import React from 'react';
import DocumentTitle from 'react-document-title';
import { LoginForm } from 'react-stormpath';
import {Button, Icon, Row, Input, Col, Card} from 'react-materialize';
import LoginPage from './LoginPage';


export default class Landing extends React.Component {
  render() {
    return (
      <div>
        <div id="index-banner" className="parallax-container">
          <div className="parallax">
            <div id="banner">
              <div className="wrap-center">
                <div className="banner-centered valign-wrapper" id="banner-text">
                  <h1 className="banner valign">If you created your own adventure...</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section cardcolor">
          <div className="row container">
            <p className="placeholder">Where would you go?</p>
          </div>
        </div>
        <div id="index-banner" className="parallax-container">
          <div className="parallax2">
            <LoginPage />
          </div>
        </div>
      </div>
    );
  }
}
