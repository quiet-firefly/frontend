import { default as React, Component } from "react";
import { GoogleMap, Marker, SearchBox, Circle, InfoWindow } from "react-google-maps";
import DocumentTitle from 'react-document-title';
import {Button, Icon, Row, Input, Col, Preloader} from 'react-materialize';
import { default as canUseDOM,} from "can-use-dom";
import { default as raf } from "raf";
import ToggleDisplay from 'react-toggle-display';

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
    hide: false,
  }

  checkIfHere() {
    var currentLat = this.state.center.lat();;
    var currentLng = this.state.center.lng();
    var boundLatLow = currentLat + .00040;
    var boundLatHigh = currentLat - .00040;
    var boundLngLow = currentLng - .00040;
    var boundLngHigh = currentLng + .00040;

    if (boundLatLow <= currentLat <= boundLatHigh && boundLngLow <= currentLng && currentLng <= boundLngHigh) {
      console.log("true");
    }
    else {
      console.log("false");
    }
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
      console.log("Map loaded");
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
    //
    if (center) {
      contents = contents.concat([
        (<InfoWindow key="info" position={center} content={content} />),
        // (<Circle key="circle" center={center} radius={radius} options={{
        //   fillColor: `red`,
        //   fillOpacity: 0.20,
        //   strokeColor: `red`,
        //   strokeOpacity: 1,
        //   strokeWeight: 1,
        // }}
        // />),
      ]);
    }

    return (
      <div>
        <Button waves='light' onClick={this.checkIfHere.bind(this)}>Check if here</Button>
        <ToggleDisplay show={this.state.hide}>
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
        </ToggleDisplay>
      </div>
    );
  }
}
