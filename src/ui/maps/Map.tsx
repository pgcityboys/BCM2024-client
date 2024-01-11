'use client'
import React, { FC, useEffect, useRef, useState } from 'react';
import { MevoStation } from '@/lib/types/mevoStation';
import axios from 'axios';
import { StationVehicles } from '@/lib/types/stationVehicles';
import RoutePoints from './RoutePoints';
import { Location } from '@/lib/types/location';
import StationInfo from './StationInfo';
import { WYPIERDALAJ_Z_TYMI_MAPAMI } from './jsontest';
import { GoogleMap, useLoadScript, Marker, Polyline, DirectionsRenderer } from '@react-google-maps/api';
import MapSearch from './MapSearch';
import { ShowMarkers } from '@/lib/types/showMarkers';
import { InfoType } from '@/lib/types/InfoType';
import PlaceInfo from './PlaceInfo';
import { Checkbox } from '@/components/ui/checkbox';
import LocationsVisibilityCheckBoxes from './LocationsVisibilityCheckBoxes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


export interface MapPropsTypes {
    center: {
        lat: number,
        lng: number, 
    },
    zoom: number,
    api_key: string
}


const Map: FC<MapPropsTypes> = ({center, zoom, api_key}) => {
  const [stations, setStations] = useState<MevoStation[]>([]);
  
  const [displayedStation, setDisplayedStation] = useState<MevoStation>();
  const [displayedPlace, setDisplayedPlace] = useState<Location>();
  const [displayedStationVehicles, setDisplayedStationVehicles] = useState<StationVehicles>();
  
  
  const [waypoints, setWaypoints] = useState<Location[]>([]);
  const [routeSource, setRouteSource] = useState<Location | undefined>();
  const [routeDestination, setRouteDestination] = useState<Location | undefined>()

  const [displayRoute, setDisplayRoute] = useState<Boolean>(false);
  
  let [route, setRoute] = useState({routes: [WYPIERDALAJ_Z_TYMI_MAPAMI]});

  const [places, setPlaces] = useState<Location[]>([]);

  const [showMarkers, setShowMarkers] = useState<ShowMarkers>({
    showMevo: false,
    showTier: false,
    showPlaces: false,
    showInfo: InfoType.NONE
  })


  const {isLoaded} = useLoadScript({
    googleMapsApiKey: api_key
  })

  const mapContainerStyle = {
    width: '70vw',
    height: '50vh',
  };

  let mapRef = useRef(null)

  useEffect(() => {
    const fetchStations = async () => {
      const response = await axios.get(`http://localhost:8080/api/stations`);
      const stations: MevoStation[] = response.data.data;
      setStations(stations);
    }
    fetchStations();
  }, [])



  useEffect(() => {
    const fetchVehicles = async () => {
      const response = await axios.get(`http://localhost:8080/api/vehicles/${displayedStation?.id}`);
      const vehicles: StationVehicles = response.data;
      setDisplayedStationVehicles(vehicles);
    }
    if(showMarkers.showInfo === InfoType.MEVO)
      fetchVehicles();
  }, [displayedStation, showMarkers.showInfo])

  const handleMevoClick = (location: MevoStation) => {
    setDisplayedStation(location);
    setShowMarkers({...showMarkers, showInfo: InfoType.MEVO});
  };

  const handlePlaceClick = (location: Location) => {
    console.log("click")
    setDisplayedPlace(location);
    setShowMarkers({...showMarkers, showInfo: InfoType.PLACE});
  };

  const resetRoute = () => {
    setWaypoints([]);  
    setRouteDestination(undefined);
    setRouteSource(undefined);
  }


  const searchPlaces = (places: Location[]) => {
    setPlaces(places);
    setShowMarkers({
      showMevo: false,
      showPlaces: true, 
      showTier: false,
      showInfo: InfoType.NONE
    })
  }

  if(!isLoaded) {
    return <div> loading </div>
  }
//
  return (
    <div className='flex flex-col items-center justify-center h-full w-full'>
      <MapSearch setPlaces={searchPlaces}/>
      <LocationsVisibilityCheckBoxes
        showMarkers={showMarkers}
        setShowMarkers={setShowMarkers}
      />
      <div className='h-[60vh] w-[70vw] flex items-start justify-center gap-12'>
        <GoogleMap
          zoom={zoom}
          center={center}
          mapContainerStyle={mapContainerStyle}
        >
          {showMarkers.showMevo && stations.map((station) => {
            return <Marker
              position={{lat: station.coordinates.lat, lng: station.coordinates.lon}}
              icon={'../mevo32.png'}
              onClick={ () => handleMevoClick(station)}
              key={station.id}
            />
          })}

          {showMarkers.showPlaces && places.map((place) => {
            return <Marker
              position={{lat: place.coordinates.lat, lng: place.coordinates.lon}}
              onClick={ () => handlePlaceClick(place)}
              key={place.id}
            />
          })}
        </GoogleMap>
          <span className='h-[60vh] w-[40vw] flex flex-col justify-start items-center bg-slate-600 rounded-xl'>
          <Tabs defaultValue='Point Info'>
            <TabsList>
              <TabsTrigger value='Point Info'> Marker </TabsTrigger>
              <TabsTrigger value='Mevo'> Mevo </TabsTrigger>
              <TabsTrigger value='Route'> Route </TabsTrigger>
            </TabsList>
            <TabsContent value='Mevo'>
              {(showMarkers.showInfo == InfoType.MEVO && displayedStation && displayedStationVehicles) && 
                <StationInfo
                  displayedStation={displayedStation}
                  displayedStationVehicles={displayedStationVehicles}
                  waypoints={waypoints}
                  setRouteSource={setRouteSource}
                  setRouteDestination={setRouteDestination}
                  setWaypoints={setWaypoints}
                />
              }
            </TabsContent>
            <TabsContent value='Point Info'>
              {(showMarkers.showInfo == InfoType.PLACE && displayedPlace) && 
                <PlaceInfo
                  displayedPlace={displayedPlace}
                  waypoints={waypoints}
                  setRouteSource={setRouteSource}
                  setRouteDestination={setRouteDestination}
                  setWaypoints={setWaypoints}
                />
              }   
            </TabsContent>
            <TabsContent value='Route'>
            {(waypoints) && 
              <RoutePoints 
                routeDestination={routeDestination} 
                routeSource={routeSource} 
                waypoints={waypoints}
                resetRoute={resetRoute}
                />
            }
            </TabsContent>
          </Tabs>
        </span>
      </div>
    </div>
  )
}

export default Map
