'use client';
import React, { useCallback, useState } from 'react';
import CheckoutForm from '../checkoutForm/CheckoutForm';
import MapComponent from '../mapComponent/MapComponent';
import { Separator } from '@/components/ui/separator';
import Title from '@/components/ui/title';
import { LoadScriptNext } from '@react-google-maps/api';
// import { useAppSelector } from '@/hooks/hooks';
// import { selectCostumerDetails } from '@/lib/redux/selectors/ordersSelectors';
import { Button } from '@/components/ui/button';

export type LocationParam = {
  lat: number;
  lng: number;
};

const googleMapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

function CheckoutWrapper(): React.JSX.Element {
  // const costumerDetails = useAppSelector(selectCostumerDetails);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [deliveryAdress, setDeliveryAddress] = useState<boolean>(false);
  const [mapKey, setMapKey] = useState<number>(0);

  const handelChandeLocation = useCallback((newlocation: LocationParam) => {
    setLocation(newlocation);
  }, []);

  const handelsetDeliveryAdress = useCallback(() => {
    setDeliveryAddress(!deliveryAdress);
    setMapKey((prev) => prev + 1);
  }, [deliveryAdress]);

  return (
    <>
      {deliveryAdress ? (
        <>
          <h1>Address is set</h1>
          <Button onClick={handelsetDeliveryAdress}>back</Button>
        </>
      ) : (
        <LoadScriptNext googleMapsApiKey={googleMapApiKey} libraries={['places']}>
          <div className="flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between md:h-screen gap-16">
            <div className="w-full flex justify-center flex-1 flex-col items-center">
              <Title text="Write delivery location" />
              <CheckoutForm onChangePlace={handelChandeLocation} onChangeAddress={handelsetDeliveryAdress} />
            </div>
            <Separator orientation="vertical" className="hidden h-2/3 lg:block" />
            <div className="w-full flex flex-col justify-center flex-1 items-center">
              <MapComponent key={mapKey} location={location} />
            </div>
          </div>
        </LoadScriptNext>
      )}
    </>
  );
}

export default CheckoutWrapper;
