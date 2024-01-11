'use client'
import React, { FC, useEffect, useRef, useState } from 'react';
import { MevoStation } from '@/lib/types/mevoStation';
import axios from 'axios';
import { StationVehicles } from '@/lib/types/stationVehicles';
import RoutePoints from './RoutePoints';
import { Location } from '@/lib/types/location';
import StationInfo from './StationInfo';
import { WYPIERDALAJ_Z_TYMI_MAPAMI } from './jsontest';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

export interface MapPropsTypes {
    center: {
        lat: number,
        lng: number, 
    },
    zoom: number,
    api_key: string
}


const Map: FC<MapPropsTypes> = ({center, zoom, api_key}) => {
  const [mapKey, setMapKey] = useState<string>('initialVal');

  const [stations, setStations] = useState<MevoStation[]>([]);
  
  const [displayStationInfo, setDisplayInfo] = useState<Boolean>(false);
  const [displayedStation, setDisplayedStation] = useState<MevoStation>();
  const [displayedStationVehicles, setDisplayedStationVehicles] = useState<StationVehicles>();
  
  
  const [waypoints, setWaypoints] = useState<Location[]>([]);
  const [routeSource, setRouteSource] = useState<Location | undefined>();
  const [routeDestination, setRouteDestination] = useState<Location | undefined>()
  const [displayRoute, setDisplayRoute] = useState<Boolean>(false);

  const {isLoaded} = useLoadScript({
    googleMapsApiKey: api_key
  })

  const mapContainerStyle = {
    width: '100%',
    height: '100%',
  };

  useEffect(() => {
    const fetchStations = async () => {
      const response = await axios.get(`http://localhost:8080/api/stations`);
      const stations: MevoStation[] = response.data.data;
      setStations(stations);
      setMapKey('newKey')
    }
    fetchStations();
  }, [])

  useEffect(() => {
    const fetchVehicles = async () => {
      const response = await axios.get(`http://localhost:8080/api/vehicles/${displayedStation?.id}`);
      const vehicles: StationVehicles = response.data;
      setDisplayedStationVehicles(vehicles);
    }
    if(displayStationInfo)
      fetchVehicles();
  }, [displayedStation, displayStationInfo])

   const handleMarkerClick = (location: MevoStation) => {
    setDisplayedStation(location);
    setDisplayInfo(true);
  };

  const resetRoute = () => {
    setWaypoints([]); 
    setDisplayRoute(false); 
    setRouteDestination(undefined);
    setRouteSource(undefined);
  }

  if(!isLoaded) {
    return <div> loading </div>
  }

  return (
    <div className='h-full w-full flex items-start justify-center'>
      <GoogleMap
        zoom={zoom}
        center={center}
        mapContainerStyle={mapContainerStyle}
      >
        {stations.map((station) => {
          return <Marker
            position={{lat: station.coordinates.lat, lng: station.coordinates.lon}}
            icon={'../mevo32.png'}
            onClick={ () => handleMarkerClick(station)}
            key={station.id}
          />
        })}
      </GoogleMap>
        <span className='min-h-48 flex flex-col justify-start items-center'>
        {(displayStationInfo && displayedStation && displayedStationVehicles) && 
          <StationInfo
            displayedStation={displayedStation}
            displayedStationVehicles={displayedStationVehicles}
            waypoints={waypoints}
            setRouteSource={setRouteSource}
            setRouteDestination={setRouteDestination}
            setWaypoints={setWaypoints}
          />
        }

        {(waypoints) && 
          <RoutePoints 
            routeDestination={routeDestination} 
            routeSource={routeSource} 
            waypoints={waypoints}
            resetRoute={resetRoute}
            />
        }
      </span>
    </div>
  )
}

export default Map
