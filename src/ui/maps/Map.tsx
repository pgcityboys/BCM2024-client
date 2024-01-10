'use client'
import React, { FC } from 'react';
import GoogleMapReact from 'google-map-react';

export interface MapPropsTypes {
    center: {
        lat: number,
        lng: number,
    },
    zoom: number,
    api_key: string
}

const Map: FC<MapPropsTypes> = ({center, zoom, api_key}) => {

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: api_key }}
        defaultCenter={center}
        defaultZoom={zoom}
      />
    </div>
  )
}

export default Map
