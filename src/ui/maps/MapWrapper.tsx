'use server'
import React, { FC } from 'react';
import Map from './Map';
require('dotenv').config()

const MapWrapper = () => {
    const defaultProps = {
        center: {
          lat: 10.99835602,
          lng: 77.01502627
        },
        zoom: 11,
        api_key: process.env.GOOGLE_MAPS_API_KEY || 'chuj'
      };
      console.log(defaultProps.api_key);
  return (
    <Map
      center={defaultProps.center}
      zoom={defaultProps.zoom}
      api_key={defaultProps.api_key}
    />
  )
}

export default MapWrapper
