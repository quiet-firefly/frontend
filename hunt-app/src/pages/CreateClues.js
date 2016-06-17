import { default as React, Component } from "react";
import { GoogleMap, Marker, SearchBox, Circle, InfoWindow } from "react-google-maps";
import DocumentTitle from 'react-document-title';
import {Button, Icon, Row, Input, } from 'react-materialize';
import { default as canUseDOM,} from "can-use-dom";
import { default as raf } from "raf";
import { Link } from 'react-router';
import { If, Then, Else } from 'react-if';

const geolocation = (
  canUseDOM && navigator.geolocation || {
    getCurrentPosition: (success, failure) => {
      failure(`Your browser doesn't support geolocation.`);
    },
  }
);

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

  state = {
    bounds: null,
    center: null,
    content: null,
    radius: 60,
    markers: [],
  }

  componentDidMount() {
    geolocation.getCurrentPosition((position) => {
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        content: `Your Current Location`,
      });

      this.setState({
        bounds: this.refs.map.getBounds(),
        center: this.refs.map.getCenter(),
      });

      const tick = () => {
        this.setState({ radius: Math.max(this.state.radius - 20, 0) });

        if (this.state.radius > 200) {
          raf(tick);
        }
      };
      raf(tick);
    }, (reason) => {
      this.setState({
        center: {
          lat: 60,
          lng: 105,
        },
        content: `Error: The Geolocation service failed (${ reason }).`,
      });
    });
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

     const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;

     this.setState({
       center: mapCenter,
       markers,
     });
   }

  addClue(e) {
     e.preventDefault();
     var boundLatLow = this.state.center.lat() + .00040;
     var boundLatHigh = this.state.center.lat() - .00040;
     var boundLngLow = this.state.center.lng() - .00040;
     var boundLngHigh = this.state.center.lng() + .00040;
     var placeLat = this.state.center.lat();
     var placeLng = this.state.center.lng();
     this.state.markers = [];
     var location = $('#clueForm').find('input[name="location"]').val();
     var clue = $('#clueForm').find('input[name="clue"]').val();
     var hunt_name = $('#clueForm').find('input[name="hunt_name"]').val();

     $.ajax({
       type: 'POST',
       url: '/api/clues',
       data: {
         clue: clue,
         hunt_name: hunt_name,
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

  render () {
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
                <input type="hidden" name="hunt_name" value="1"/>
                <label className={"col m6 labelsize"}> Clue #1
                  <input id="clue" type="text" name="clue"/>
                </label>
                <label className={"col m4 offset-m1"}> Answer/Location
                  <input id="location" type="text" name="location" />
                </label>
              </div>
              <div className={"row"}>
                <button className={"btn invite-button"} onClick={this.addClue.bind(this)}> Add Clue </button>
                <span> or </span>
                  <button className={"btn invite-button"} onClick={this.props.foo}> On to Invites </button>
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
          defaultZoom={18}
          // center={center}
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
