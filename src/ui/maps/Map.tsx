'use client'
import React, { FC, useEffect, useRef, useState } from 'react';
import  GoogleMapReact  from 'google-map-react';
import { MevoStation } from '@/lib/types/mevoStation';
import axios from 'axios';
import { StationVehicles } from '@/lib/types/stationVehicles';
import MapSearch from './MapSearch';
import RoutePoints from './RoutePoints';
import { Location } from '@/lib/types/location';
import StationInfo from './StationInfo';

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
  }, [displayedStation])


  const renderMarkers = (map: any, maps: any) => {
    let markers: any[] = [];
    stations.map((location: any) => {
      const marker = 
        new maps.Marker({
          position: {lat: location.coordinates.lat, lng: location.coordinates.lon},
          map,
          icon: '../mevo32.png',
        })
      marker.addListener('click', () => handleMarkerClick(location));
      markers.push(marker);
    });
    return markers;
   };

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

  return (
    <div className='h-full w-full'>
      <MapSearch getSearchResults={() => console.log('dupa')}/>
      <GoogleMapReact
        key={mapKey}
        bootstrapURLKeys={{ key: api_key }}
        defaultCenter={center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
      >
      </GoogleMapReact>

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
    </div>
  )
}

export default Map
