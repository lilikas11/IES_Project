import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../assets/css/SearchBar.css';



export const SearchBar = ({ setResults, allEvents }) => {
  const [input, setInput] = useState('');


  const fetchData = (value) => {
    const results = allEvents.filter((event) =>
      event.name.toLowerCase().includes(value.toLowerCase())
    );
    setResults(results);
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const getPost = async () => {
    const response = await fetch('http://localhost:3001/events');
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        onSubmit={getPost()}
        placeholder="Expande os teus horizontes..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
