import React from 'react';
import { Link } from 'react-router';
import { LoginLink } from 'react-stormpath';
import DocumentTitle from 'react-document-title';
import {Button, Icon, Row, Input, Col, Card} from 'react-materialize';

import Header from './Header';


export default class is extends React.Component {
  render() {
    return (
      <DocumentTitle title="Scaveng'r">
        <div className='MasterPage'>
          <Header />
          { this.props.children }
        </div>
      </DocumentTitle>
    );
  }
}
