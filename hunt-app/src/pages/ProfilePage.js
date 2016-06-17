import React from 'react';
import DocumentTitle from 'react-document-title';
import { UserProfileForm } from 'react-stormpath';

export default class ProfilePage extends React.Component {
  render() {
    return (
      <div>
        <div className={"row"}>
          <h2>My Profile</h2>
          <hr />
        </div>
        <div className={"row"}>
          <div className={"chip"}>
            <img src="/css/adrienne.png" alt="Adrienne"/>
            Adrienne
          </div>
        </div>
        <div className={"row"}>
          <div className={"col m2 profile-label"}>
            <div> Name </div>
          </div>
          <div className={"col m8 profile-info"}>
            <div> Adrienne </div>
          </div>
        </div>
        <div className={"row"}>
          <div className={"col m2 profile-label"}>
            <div> Email </div>
          </div>
          <div className={"col m8 profile-info"}>
            <div> AwesomeAdrienne@gmail.com </div>
          </div>
        </div>
      </div>
    )
  }
}
