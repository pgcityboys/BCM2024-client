'use client'
import React, { FC, Suspense, useEffect, useState } from 'react';
import  GoogleMapReact  from 'google-map-react';
import { MevoStation } from '@/lib/types/mevoStation';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { StationVehicles } from '@/lib/types/stationVehicles';
import { FaBicycle, FaParking } from "react-icons/fa"
import { TierVehicles } from '@/lib/types/tierVehicles';

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
  const [tierVehicles, setTierVehicles] = useState<TierVehicles>();
  const [mapKey, setMapKey] = useState<string>('initialVal');
  const [displayInfo, setDisplayInfo] = useState<Boolean>(false);
  const [displayedStation, setDisplayedStation] = useState<MevoStation>();
  const [displayedStationVehicles, setDisplayedStationVehicles] = useState<StationVehicles>();

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
      console.log(vehicles)
    }
    if(displayInfo)
      fetchVehicles();
  }, [displayedStation])

  useEffect(() => {
    const fetchVehicles = async () => {
      const response = await axios.get(`http://localhost:2222/api/vehicles`);
      const vehicles: TierVehicles = response.data;
      setTierVehicles(vehicles);
      console.log(tierVehicles)
    }
    fetchVehicles();
  }, [])

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
    if (tierVehicles) {
      tierVehicles.data.map((vehicle: any) => {
        const marker = 
          new maps.Marker({
            position: {lat: vehicle.coordinates.lat, lng: vehicle.coordinates.lon},
            map,
            icon: '../tier32.png',
          })
        //marker.addListener('click', () => handleMarkerClick(location));
        //markers.push(marker);
      });
    }
    return markers;
   };

   const handleMarkerClick = (location: MevoStation) => {
    setDisplayedStation(location);
    setDisplayInfo(true);
  };


  return (
    <div className='h-full w-full'>
      <GoogleMapReact
        key={mapKey}
        bootstrapURLKeys={{ key: api_key }}
        defaultCenter={center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
      >

      </GoogleMapReact>
      {(displayInfo && displayedStation && displayedStationVehicles) && 
        <Card>
        <CardHeader>
          <CardTitle>Mevo Station: {displayedStation.code}</CardTitle>
          <CardDescription>Address: {displayedStation.address}</CardDescription>
        </CardHeader>
        <CardContent>
          <span className='flex justify-start gap-2'><FaParking/>Parking slots available: {displayedStationVehicles.parking_slots_available}</span>
          {displayedStationVehicles.vehicles_avaiable.map((vehicle) =>(
            <span className='flex justify-start gap-2'><FaBicycle/>{vehicle.vehicle_type_id}: {vehicle.count}</span>
          ))}
        </CardContent>
      </Card>
      }
    </div>
  )
}

export default Map
