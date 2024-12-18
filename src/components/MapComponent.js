import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MapComponent = ({ borderRadius = '10px', marginBottom = '1rem' }) => {
  // Custom marker icons
  const indiaMarkerIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const londonMarkerIcon = new L.Icon({
    iconUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // Light map layer URL
  const lightModeTileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  // "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";

  return (
    <div
      className="z-10 overflow-hidden bg-white shadow-lg relative  border border-gray-100" // Tailwind base classes
      style={{
        borderRadius: borderRadius, // Dynamic border radius
        marginBottom: marginBottom, // Dynamic margin-bottom
      }}
    >
      <MapContainer
        center={[20.5937, 78.9629]} // Coordinates for India
        zoom={4} // Initial zoom level
        scrollWheelZoom={true}
        className="w-full h-[50vh] border-none outline-none" // Tailwind for map height, width, and outline
        minZoom={2} // Set minimum zoom level
        maxZoom={10} // Set maximum zoom level
      >
        {/* Light mode tile layer */}
        <TileLayer url={lightModeTileUrl} />

        {/* Custom Markers with Tailwind z-index */}
        <Marker position={[20.5937, 78.9629]} icon={indiaMarkerIcon}>
          <Popup className="z-10">India</Popup>
        </Marker>
        <Marker position={[51.5074, -0.1278]} icon={londonMarkerIcon}>
          <Popup className="z-20">London</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
