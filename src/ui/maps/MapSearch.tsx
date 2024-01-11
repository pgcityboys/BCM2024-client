'use client';
import { useState } from 'react';

//@ts-ignore
const MapSearch = ({getSearchResults}) => {
    const[ query, setQuery ] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        getSearchResults();
    }

  return (
    <form 
    className='search-form'
    onSubmit={ handleSubmit }>
        <input type='text' 
        className='search-input' 
        placeholder='Search courses...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}/>
        <button className='search-button' type='submit'>Search</button>
    </form>
  )
}

export default MapSearch