import React from 'react';
import Map from '../components/map.jsx';
import { useState } from "react";
import { SearchBar } from "../components/SearchBar.jsx";
import { SearchResultsList } from "../components/SearchResultsList.jsx";
import Carousel from '../components/carousel.jsx';
import Carousel_companies from '../components/carousel_companies.jsx';
import Carousel_tags from '../components/carousel_tags.jsx';

function Home() {

  const [results, setResults] = useState([]);
   const userId = localStorage.getItem('user_id') || 0;
   const endpoint = import.meta.env.VITE_API_URL+`/events/${userId}/all_event_pref`;
   console.log(endpoint)

  return (
    <div>
      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
      </div>
      {console.log(endpoint)}
        <Carousel data={endpoint} />
      
    </div>
  );
}

export default Home;