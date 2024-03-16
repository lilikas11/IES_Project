import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import MapOptions from "./mapOptions";

const DirectionsMap = ({ width, height }) => {
  const containerStyle = {
    width: width || "100%", // Use the provided width or default to 100%
    height: height || "67.5vh",
  };

  const center = {
    lat: 40.633,
    lng: -8.650,
  };

  return (
    <div className="DirectionsMap">
      <LoadScript googleMapsApiKey="AIzaSyCKQCPyNDaeSzTpxKGhmHP1noox2G_v6zc">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {/* Add any additional components like markers or info windows here */}
          <MapOptions />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default DirectionsMap;