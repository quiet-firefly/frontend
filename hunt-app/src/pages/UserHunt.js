import { default as React, Component } from "react";
import { GoogleMap, Marker, SearchBox, Circle, InfoWindow } from "react-google-maps";
import DocumentTitle from 'react-document-title';
import {Button, Icon, Row, Input} from 'react-materialize';
import { default as canUseDOM,} from "can-use-dom";
import { default as raf } from "raf";

const geolocation = (
  canUseDOM && navigator.geolocation || {
    getCurrentPosition: (success, failure) => {
      failure(`Your browser doesn't support geolocation.`);
    },
  }
);

export default class UserHunt extends Component {
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

  checkIfHere() {
    console.log("Clicked");
  };

  componentDidMount() {
    var currentLat;
    var currentLng;
    var boundLatLow;
    var boundLatHigh;
    var boundLngLow;
    var boundLngHigh;
    geolocation.getCurrentPosition((position) => {
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        content: `Your Current Location`,
      });

      currentLat = position.coords.latitude;
      currentLng = position.coords.longitude;
      console.log("Current Lat: " + currentLat);
      console.log("Current Lng: " + currentLng);

      this.setState({
        bounds: this.refs.map.getBounds(),
        center: this.refs.map.getCenter(),
      });
      boundLatLow = this.refs.map.getBounds().H.H;
      boundLatHigh = this.refs.map.getBounds().H.j;
      console.log("Low: " + boundLatLow);
      console.log("High: " + boundLatHigh);
      boundLngLow = this.refs.map.getBounds().j.j;
      boundLngHigh = this.refs.map.getBounds().j.H;
      console.log("Low: " + boundLngLow);
      console.log("High: " + boundLngHigh);

      if (boundLatLow <= currentLat <= boundLatHigh && boundLngLow <= currentLng && currentLng <= boundLngHigh) {
        console.log("true");
      }
      else {
        console.log("false");
      }

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
  //  console.log(this.refs.map.getBounds().H);
  //  console.log(this.refs.map.getBounds().j);
  //  boundLat = this.refs.map.getBounds().H.H;
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
      console.log("Lng: " + place.geometry.location.lng());
      console.log("Name: " + place.name);
    });

    // Set markers; set map center to first search result
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;

    this.setState({
      center: mapCenter,
      markers,
    });
  }

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
        <Button waves='light'>Check if here</Button>
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
          center={center}
          onBoundsChanged={::this.handleBoundsChanged}
          ref="map"
        >
          {contents}
          <SearchBox
            bounds={this.state.bounds}
            controlPosition={google.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={::this.handlePlacesChanged}
            ref="searchBox"
            placeholder="Enter Location"
            style={UserHunt.inputStyle}
          />
          {this.state.markers.map((marker, index) => (
            <Marker position={marker.position} key={index} />
          ))}
        </GoogleMap>
      </div>
    );
  }
}
