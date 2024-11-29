import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { LocationParam } from '../checkoutWrapper/CheckoutWrapper';

interface IMapComponentProps {
  location: LocationParam | null;
}

function MapComponent({ location }: IMapComponentProps) {
  return (
    <div className="w-full h-72 md:h-96">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={location || { lat: 40.73061, lng: -73.935242 }}
        zoom={location ? 15 : 10}
      >
        {location && <Marker position={location} />}
      </GoogleMap>
    </div>
  );
}

export default MapComponent;
