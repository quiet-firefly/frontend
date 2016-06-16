import { MasterPage, IndexPage, LoginPage, RegistrationPage, ProfilePage, CreateHunt, CreateClues, InviteUsers, ReviewHunt, UserHunt } from './pages';
import ReactStormpath, { Router, LoginRoute, HomeRoute, AuthenticatedRoute } from 'react-stormpath';
import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Route } from 'react-router';
import { createHistory}  from 'history';


ReactStormpath.init();
ReactDOM.render(
  <Router history={createHistory()}>
    <HomeRoute path='/' component={MasterPage}>
    <LoginRoute path='/login' component={LoginPage} />
      <Route path='/createhunt' component={CreateHunt} />
      <Route path='/reviewhunt' component={ReviewHunt} />
      <HomeRoute path='/profile' component={ProfilePage} />
      <Route path='/register' component={RegistrationPage} />
      <Route path='/createclues' component={CreateClues} />
      <Route path='/userhunt' component={UserHunt} />
      <Route path='/inviteusers' component={InviteUsers} />
    </HomeRoute>
  </Router>,
  document.getElementById('app-container')
);
