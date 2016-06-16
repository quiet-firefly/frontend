import { default as React, Component } from "react";
import { GoogleMap, Marker, SearchBox, InfoWindow, Circle } from "react-google-maps";
import DocumentTitle from 'react-document-title';
import {Button, Icon, Row, Input} from 'react-materialize';
import { Link } from 'react-router';
import { default as canUseDOM,} from "can-use-dom";
import { default as raf } from "raf";

// !!Need to retrieve Hunt ID and then update Hunt ID with clue data upon completion of form

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

    static mapCenter = {
      lat: 47.598962,
      lng: -122.333799,
    }

  state = {
    bounds: null,
    center: CreateClues.mapCenter,
    markers: [],
    radius: 6000,
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
     });

     this.setState({
       bounds: this.refs.map.getBounds(),
     });
     boundLatLow = this.refs.map.getBounds().H.H;
     boundLatHigh = this.refs.map.getBounds().H.j;
     boundLngLow = this.refs.map.getBounds().j.j;
     boundLngHigh = this.refs.map.getBounds().j.H;
     console.log(boundLatLow);

     const tick = () => {
       this.setState({ radius: Math.max(this.state.radius - 20, 0) });

       if (this.state.radius > 200) {
         raf(tick);
       }
     };
     raf(tick);
     (reason) => {
       this.setState({
         center: {
           lat: 60,
           lng: 105,
         },
         content: `Error: The Geolocation service failed (${ reason }).`,
       });
     }


     // Set markers; set map center to first search result
     const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;

     this.setState({
       center: mapCenter,
       markers,
     });
   }

   addClue(e) {
     e.preventDefault();
     console.log(this.state.center.lat());
     console.log(this.state.center.lng());
     $.ajax({
       type: 'POST',
       url: '/api/clues',
       data: $('#clueForm').serialize()
     });
     $('#clue').val('');
     $('#location').val('');
   }

   returnToHunt(e) {
     e.preventDefault();
   };

  render() {
    const { center, content, radius } = this.state;
    let contents = [];

    if (center) {
      contents = contents.concat([
        (<InfoWindow key="info" position={center} content={content} />),
        (<Circle key="circle" center={center} radius={radius} options={{
          fillColor: `red`,
          fillOpacity: 0.20,
          strokeColor: `red`,
          strokeOpacity: 1,
          strokeWeight: 1,
        }}
        />),
      ]);
    }

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
                <button className={"btn invite-button"} onClick={this.addClue.bind(this)}> Add Another Clue </button>
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
