import React from 'react';
import { Link } from 'react-router';
import { LoginLink, LogoutLink, Authenticated, NotAuthenticated } from 'react-stormpath';
import {Button, Icon, Row, Input, Col, Card, CardTitle, Navbar, NavItem} from 'react-materialize';

export default class Header extends React.Component {
  render() {
    return (
      <Navbar brand="logo" left>
        <Authenticated>
          <NavItem href='/profile'> Profile </NavItem>
          <NavItem href='/createhunt'> Create Hunt </NavItem>
          <NavItem href='/userhunt'> User Hunt </NavItem>
          <NavItem href='/'> Logout </NavItem>
        </Authenticated>
        <NotAuthenticated>
          <NavItem href='/'> Home </NavItem>
          <NavItem href='/login'> Login | Sign Up </NavItem>
        </NotAuthenticated>
      </Navbar>
    );
  }
}
