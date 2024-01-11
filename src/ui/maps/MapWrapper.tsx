import React from 'react';
import Map from './Map';
require('dotenv').config()

const MapWrapper = () => {
    const defaultProps = {
        center: {
          lat: 54.35475441815699,
          lng: 18.593608199444553
        },
        zoom: 15,
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
