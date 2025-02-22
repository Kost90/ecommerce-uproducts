'use client';
import React, { useCallback, useState } from 'react';
import CheckoutForm from '../checkoutForm/CheckoutForm';
import MapComponent from '../mapComponent/MapComponent';
import { Separator } from '@/components/ui/separator';
import { LoadScriptNext } from '@react-google-maps/api';
import TypographyH1 from '@/components/typography/TypographyH1';
import { selectCostumerDetails } from '@/lib/redux/selectors/ordersSelectors';
import { useAppSelector } from '@/hooks/hooks';
import { isEmptyObject } from '@/helpers/helpers';
import { clearCostumerDetails } from '@/lib/redux/reducers/orders/ordersSlice';
import { useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';
import { selectCartData } from '@/lib/redux/selectors/cartSelectors';
import { useRouter } from 'next/navigation';
import { useGetUserQuery } from '@/lib/redux/apiSlice/apiSlice';
// import Link from 'next/link';

export type LocationParam = {
  lat: number;
  lng: number;
};

const googleMapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

function CheckoutWrapper(): React.JSX.Element {
  const router = useRouter();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const dispatch = useDispatch();
  const [mapKey, setMapKey] = useState<number>(0);
  const customerDetails = useAppSelector(selectCostumerDetails);
  const { items } = useAppSelector(selectCartData);
  const { data } = useGetUserQuery();

  if (isEmptyObject(items)) {
    router.push('/');
  }

  const handelChandeLocation = useCallback((newlocation: LocationParam) => {
    setLocation(newlocation);
  }, []);

  const handelsetDeliveryAdress = useCallback(() => {
    setMapKey((prev) => prev + 1);
    dispatch(clearCostumerDetails());
  }, [dispatch]);

  if (!isEmptyObject(customerDetails) || data?.data?.address) {
    const LazyShowOrderDetails = dynamic(() => import('../showOrderDetails/ShowOrderDetails'), { ssr: false });
    return <LazyShowOrderDetails onClick={handelsetDeliveryAdress} />;
  }

  return (
    <LoadScriptNext googleMapsApiKey={googleMapApiKey} libraries={['places']}>
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between gap-16 mb-8">
        <div className="w-full flex justify-center flex-1 flex-col items-center gap-8">
          <TypographyH1 text="Write delivery location" />
          {/* <span className="text-sm">
            If you have account -{' '}
            <Link href={'/login'} className="text-black hover:text-orange">
              sign in{' '}
            </Link>
            or{' '}
            <Link href={'/register'} className="text-black hover:text-orange">
              register
            </Link>
          </span> */}
          <CheckoutForm onChangePlace={handelChandeLocation} />
        </div>
        <Separator orientation="vertical" className="hidden h-2/3 lg:block" />
        <div className="w-full flex flex-col justify-center flex-1 items-center">
          <MapComponent key={mapKey} location={location} />
        </div>
      </div>
    </LoadScriptNext>
  );
}

export default CheckoutWrapper;
