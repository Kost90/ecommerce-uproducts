'use client';
import React, { useCallback, useState } from 'react';
import CheckoutForm from '../checkoutForm/CheckoutForm';
import MapComponent from '../mapComponent/MapComponent';
import { Separator } from '@/components/ui/separator';
import Title from '@/components/ui/title';
import { LoadScript } from '@react-google-maps/api';

export type LocationParam = {
  lat: number;
  lng: number;
};

const googleMapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

function CheckoutWrapper() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handelChandeLocation = useCallback((newlocation: LocationParam) => {
    setLocation(newlocation);
  }, []);

  return (
    <LoadScript googleMapsApiKey={googleMapApiKey} libraries={['places']}>
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between md:h-screen gap-16">
        <div className="w-full flex justify-center flex-1 flex-col items-center">
          <Title text="Write delivery location" />
          <CheckoutForm onChangePlace={handelChandeLocation} />
        </div>
        <Separator orientation="vertical" className="hidden h-2/3 lg:block" />
        <div className="w-full flex flex-col justify-center flex-1 items-center">
          <MapComponent location={location} />
        </div>
      </div>
    </LoadScript>
  );
}

export default CheckoutWrapper;
