import React from 'react';
import Map from './Map';
require('dotenv').config()

const MapWrapper = () => {
    const defaultProps = {
        center: {
          lat: 54.4279049,
          lng: 18.5904457
        },
        zoom: 11,
        api_key: process.env.GOOGLE_MAPS_API_KEY || 'chuj'
      };
  return (
    <Map
      center={defaultProps.center}
      zoom={defaultProps.zoom}
      api_key={defaultProps.api_key}
    />
  )
}

export default MapWrapper
