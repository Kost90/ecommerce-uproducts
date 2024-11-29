'use client';
import React, { useCallback, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ButtonComponent from '@/components/button/Button';
import { Autocomplete } from '@react-google-maps/api';
import { LocationParam } from '../checkoutWrapper/CheckoutWrapper';
import { useDispatch } from 'react-redux';
import { addCostumerDetails } from '@/app/(clientFacing)/cart/actions/CartActions';
import { setCustomerDetails } from '@/lib/redux/reducers/orders/ordersSlice';
import { useRouter } from 'next/navigation';

interface IErrors {
  firstname?: string[];
  lastname?: string[];
  deliveryAdress?: string[];
  phone?: string[];
  email?: string[];
  global?: string[];
}

function CheckoutForm({ onChangePlace }: { onChangePlace: (location: LocationParam) => void }) {
  const dispatch = useDispatch();
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [erros, setErrors] = useState<IErrors>({});
  const router = useRouter();

  const handlePlaceChanged = useCallback((): void => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.geometry?.location) {
        const location: LocationParam = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        onChangePlace(location);
      }
    }
  }, []);

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const result = await addCostumerDetails(formData);
    if (!result.success) {
      if (result.errors) {
        setErrors(result.errors);
      }
    }

    if (result.success && result.data) {
      setErrors({});
      dispatch(setCustomerDetails(result.data));
      router.push('/');
    }
  };

  return (
    <form className="w-full flex justify-center flex-col gap-5" onSubmit={handelSubmit}>
      <Label htmlFor="firstname">First name:</Label>
      <Input type="text" className="w-full" name="firstname" placeholder="Your first name" />
      {erros.firstname ? <span className="text-red-600">{erros.firstname}</span> : null}
      <Label htmlFor="lastname">Last name:</Label>
      <Input type="text" className="w-full" name="lastname" placeholder="Your last name" />
      {erros.lastname ? <span className="text-red-600">{erros.lastname}</span> : null}
      <Label htmlFor="deliveryAdress">Adress:</Label>
      <Autocomplete onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)} onPlaceChanged={handlePlaceChanged}>
        <Input type="text" className="w-full" name="deliveryAdress" placeholder="Write deliveri adress" />
      </Autocomplete>
      {erros.deliveryAdress ? <span className="text-red-600">{erros.deliveryAdress}</span> : null}
      <Label htmlFor="phone">Telephone:</Label>
      <Input type="text" className="w-full" name="phone" placeholder="phone number" />
      {erros.phone ? <span className="text-red-600">{erros.phone}</span> : null}
      <Label htmlFor="email">Email:</Label>
      <Input type="text" className="w-full" name="email" placeholder="email" />
      {erros.email ? <span className="text-red-600">{erros.email}</span> : null}
      <ButtonComponent type="submit" text="Submit" className="max-w-28" />
    </form>
  );
}

export default CheckoutForm;
