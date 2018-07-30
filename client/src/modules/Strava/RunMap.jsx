import React, {Component} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Polyline } from 'react-google-maps';
import './Strava.css';

class RunMap extends Component {

  fitMapToPolyline = bounds => {
    const map = this.refs.runMap;
    map.fitBounds(bounds);
  }

  calculateBoundsFromPath = path => {
    const bounds = new window.google.maps.LatLngBounds();
    path.forEach(point => {
      bounds.extend(point);
    });
    return bounds;
  }

  render() {
    var RunPolyline = null;
    var zoom = 0;
    if (this.props.polyline) {
      const path = window.google.maps.geometry.encoding.decodePath(this.props.polyline);
      RunPolyline = (
        <Polyline 
          className='route-line'
          path={path}
        />
      )
      const bounds = this.calculateBoundsFromPath(path);
      this.fitMapToPolyline(bounds);
    }
    return (
      <GoogleMap
        ref='runMap'
        defaultOptions={{
          defaultZoom: zoom,
          scrollwheel: false,
          scaleControl: false,
          draggable: false,
          panContorl: false,
          zoomControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
        }}
      >
        {RunPolyline}
      </GoogleMap>
    )
  }
} 



export default withScriptjs(withGoogleMap(RunMap));

  