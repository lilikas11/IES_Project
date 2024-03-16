import React from 'react';
import '../assets/css/SearchResult.css';

export const SearchResult = ({ result, onSelect }) => {
  return (
    <div
      className="search-result"
      onClick={() => onSelect(result)}
    >
      {result.name}
    </div>
  );
};
