import { MasterPage, IndexPage, LoginPage, RegistrationPage, ProfilePage, CreateHunt, CreateClues, InviteUsers, ReviewHunt, UserHunt, Landing } from './pages';
import ReactStormpath, { Router, LoginRoute, HomeRoute, AuthenticatedRoute } from 'react-stormpath';
import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Route } from 'react-router';
import { createHistory}  from 'history';


ReactStormpath.init();
ReactDOM.render(
  <Router history={createHistory()}>
    <HomeRoute path='/' component={MasterPage}>
    <IndexRoute component={Landing}>
      <LoginRoute path='/login' component={LoginPage} />
    </IndexRoute>
      <Route path='/createhunt' component={CreateHunt}>
        <Route path='/createclues' component={CreateClues} />
        <Route path='/inviteusers' component={InviteUsers} />
        <Route path='/reviewhunt/:huntname' component={ReviewHunt} />
      </Route>
      <LoginRoute path='/login' component={LoginPage} />
      <Route path='/profile' component={ProfilePage} />
      <Route path='/register' component={RegistrationPage} />
      <Route path='/userhunt' component={UserHunt} />
    </HomeRoute>
  </Router>,
  document.getElementById('app-container')
);
