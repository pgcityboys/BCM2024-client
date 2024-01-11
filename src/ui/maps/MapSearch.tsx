'use client';
import axios from 'axios';
import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { Location } from '@/lib/types/location';

const MapSearch = ({setPlaces}: {
  setPlaces: (arg: Location[]) => void
}) => {
    const [ query, setQuery ] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setQuery(e.target.value);
        if(!query)
          return
        const response = await axios.get(`http://localhost:8081/api/places?q=${query}`)
        const places = response.data.places;
        console.log(places);
        setPlaces(places);
    }

  return (
    <div className='flex justify-center text-center rounded-xl gap-8 p-4 bg-slate-700'>
        <Input 
          type="text" 
          placeholder="search for objects" 
          value={query}
          onChange={(e) => {setQuery(e.target.value); console.log(query)}}
          />
        <Button 
          variant='default' 
          onClick={handleSubmit} 
          >
            Search
        </Button>
    </div>
  )
}

export default MapSearch
