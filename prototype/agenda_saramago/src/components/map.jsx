import React from 'react';
import DirectionsMap from './directionsMap.jsx'; // Assuming MapComponent is your Google Map logic

const Map = ({ width, height }) => {
  const mapStyle = {
    width: width || '100%', // Default to 100% if width prop is not provided
    height: height || '400px', // Default to 400px if height prop is not provided
  };

  return (
    <div className="flex flex-col items-center">
        <DirectionsMap width={width} height={height} />
    </div>
  );
};

export default Map;
