import { default as React, Component } from "react";
import { GoogleMap, Marker, SearchBox } from "react-google-maps";
import DocumentTitle from 'react-document-title';
import {Button, Icon, Row, Input} from 'react-materialize';
import { Link } from 'react-router';

// !!Need to retrieve Hunt ID and then update Hunt ID with clue data upon completion of form

export default class CreateClues extends Component {
  static inputStyle = {
      "border": `1px solid transparent`,
      "borderRadius": `1px`,
      "boxShadow": `0 2px 6px rgba(0, 0, 0, 0.3)`,
      "boxSizing": `border-box`,
      "MozBoxSizing": `border-box`,
      "fontSize": `14px`,
      "height": `32px`,
      "marginTop": `10px`,
      "outline": `none`,
      "padding": `0 12px`,
      "textOverflow": `ellipses`,
      "width": `400px`,
      "background-color": `white`,
    }

    static mapCenter = {
      lat: 47.598962,
      lng: -122.333799,
    }

  state = {
    bounds: null,
    center: CreateClues.mapCenter,
    markers: [],
  }

  handleBoundsChanged() {
     this.setState({
       bounds: this.refs.map.getBounds(),
       center: this.refs.map.getCenter(),
     });
   }

   handlePlacesChanged() {
     const places = this.refs.searchBox.getPlaces();
     const markers = [];
     var boundLatLow;
     var boundLatHigh;
     var boundLngLow;
     var boundLngHigh;

     // Add a marker for each place returned from search bar
     places.forEach(function (place) {
       markers.push({
         position: place.geometry.location,
       });
       console.log("Lat: " + place.geometry.location.lat());
       var placeLat = place.geometry.location.lat();
       console.log("Lng: " + place.geometry.location.lng());
       var placeLng = place.geometry.location.lng();
       console.log("Name: " + place.name);
       console.log(place);
     });

     this.setState({
       bounds: this.refs.map.getBounds(),
     });
     boundLatLow = this.refs.map.getBounds().H.H;
     boundLatHigh = this.refs.map.getBounds().H.j;
     console.log("Low: " + boundLatLow);
     console.log("High: " + boundLatHigh);
     boundLngLow = this.refs.map.getBounds().j.j;
     boundLngHigh = this.refs.map.getBounds().j.H;
     console.log("Low: " + boundLngLow);
     console.log("High: " + boundLngHigh);

     // Set markers; set map center to first search result
     const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;

     this.setState({
       center: mapCenter,
       markers,
     });
   }

   addClue(e) {
     e.preventDefault();
     console.log(this.state.bounds.H.H);
     var boundLatLow = this.state.bounds.H.H;
     var boundLatHigh = this.state.bounds.H.j;
     var boundLngLow = this.state.bounds.j.j;
     var boundLngHigh = this.state.bounds.j.H;
     var placeLat = this.state.center.lat();
     var placeLng = this.state.center.lng();
     this.state.markers = [];
     var location = $('#clueForm').find('input[name="location"]').val();
     var clue = $('#clueForm').find('input[name="clue"]').val();
     var hunt_id = $('#clueForm').find('input[name="hunt_id"]').val();
     $.ajax({
       type: 'POST',
       url: '/api/clues',
       data: {
         clue: clue,
         hunt_id: hunt_id,
         location: location,
         boundLatLow: boundLatLow,
         boundLatHigh: boundLatHigh,
         boundLngLow: boundLngLow,
         boundLngHigh: boundLngHigh,
         placeLat: placeLat,
         placeLng: placeLng
       }
     });
     $('#clue').val('');
     $('#location').val('');
     $('#searchBox').val('');
   }

   returnToHunt(e) {
     e.preventDefault();
   };

  render() {
    console.log(this.state.center);
    return (
      <div>
        <div className={"row"}>
          <div className={"row"}>
            <h3> Create Your Clues! </h3>
          </div>
          <div className={"row"}>
            <h5> Your Scavenger Hunt: (pull hunt name) </h5>
          </div>
          <div className={"col m10"}>
            <form id="clueForm">
              <div className={"row"}>
                <input type="hidden" name="hunt_id" value="1"/>
                <label className={"col m6 labelsize"}> Clue #1
                  <input id="clue" type="text" name="clue"/>
                </label>
                <label className={"col m4 offset-m1"}> Answer/Location
                  <input id="location" type="text" name="location"/>
                </label>
              </div>
              <div className={"row"}>
                <button className={"btn invite-button"} onClick={this.addClue.bind(this)}> Add Clue </button>
                <span> or </span>
                <Link to='/reviewhunt'>
                  <button className={"btn invite-button"}> Return to Hunt Page </button>
                </Link>
              </div>
            </form>
          </div>
        </div>

        <GoogleMap
          center={this.state.center}
          containerProps={{
            ...this.props,
            style: {
              height: `70vh`,
              width: `100vw`
            },
          }}
          defaultZoom={15}
          onBoundsChanged={::this.handleBoundsChanged}
          ref="map"
        >
          <SearchBox
            bounds={this.state.bounds}
            controlPosition={google.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={::this.handlePlacesChanged}
            ref="searchBox"
            placeholder="Enter Location"
            style={CreateClues.inputStyle}
          />
          {this.state.markers.map((marker, index) => (
            <Marker position={marker.position} key={index} />
          ))}
        </GoogleMap>
      </div>
    );
  }
}
