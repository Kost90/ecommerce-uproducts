import React, { memo, useCallback, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ButtonComponent from '@/components/button/Button';
import { Autocomplete } from '@react-google-maps/api';
import { LocationParam } from '../checkoutWrapper/CheckoutWrapper';
import { useDispatch } from 'react-redux';
import { addCostumerDetails } from '@/app/(clientFacing)/actions/CheckoutActions';
import { setCustomerDetails } from '@/lib/redux/reducers/orders/ordersSlice';
import { parseAddress } from '@/lib/helpers/helpers';
import { IAdress } from '@/lib/helpers/types';
import useErrorsManageHook from '@/hooks/errorsManageHook';
import { InputCheckout } from './checkoutInput/CheckoutInput';
import { getFieldLable } from '@/lib/helpers/helpers';
import { motion } from 'motion/react';
import { animations } from '@/lib/animations/animations';

export interface IErrors {
  firstname?: string;
  lastname?: string;
  deliveryAdress?: IAdress;
  phone?: string;
  email?: string;
}

const MotionInputCompoenent = motion.create(InputCheckout);

export interface IAddressForm {
  places: IAdress | null;
  errors: IErrors['deliveryAdress'];
  handlePlaceChanged: () => void;
  autocompleteRef: React.MutableRefObject<google.maps.places.Autocomplete | null>;
}

export type AddressFields = keyof IAdress;
export type ErrorFields = keyof IErrors;

// eslint-disable-next-line react/display-name
const AddressForm = memo(({ places, errors, handlePlaceChanged, autocompleteRef }: IAddressForm): React.JSX.Element => {
  if (!places) {
    return (
      <Autocomplete onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)} onPlaceChanged={handlePlaceChanged}>
        <Input type="text" className="w-full" name="deliveryAdress" placeholder="Write delivery address" />
      </Autocomplete>
    );
  }

  return (
    <>
      {(['street_number', 'route', 'postal_town', 'country', 'postal_code'] as AddressFields[]).map((field, i) => (
        <MotionInputCompoenent
          key={field + i + places?.[field]}
          name={field}
          label={getFieldLable(field)}
          placeholder={`Enter ${getFieldLable(field)}}`}
          defaultValue={places[field] || ''}
          error={errors?.[field]}
          {...animations.slideUpd}
        />
      ))}
    </>
  );
});

function CheckoutForm({ onChangePlace }: { onChangePlace: (location: LocationParam) => void }): React.JSX.Element {
  const dispatch = useDispatch();
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [places, setPlaces] = useState<IAdress | null>(null);
  const { errors, setErrors } = useErrorsManageHook<IErrors>();

  const handlePlaceChanged = useCallback((): void => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.geometry?.location) {
        const location: LocationParam = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        const addressComponents = place.address_components!;
        const adressPlaces = parseAddress(addressComponents);
        setPlaces(adressPlaces);
        onChangePlace(location);
      }
    }
  }, [onChangePlace]);

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const customerData = {
      firstname: formData.get('firstname') as string,
      lastname: formData.get('lastname') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      deliveryAdress: {
        street_number: formData.get('street_number') as string,
        route: formData.get('route') as string,
        postal_town: formData.get('postal_town') as string,
        country: formData.get('country') as string,
        postal_code: formData.get('postal_code') as string,
      },
    };

    const result = await addCostumerDetails(customerData);

    if (result.success && result.data) {
      setErrors({});
      dispatch(setCustomerDetails(result.data));
    } else if (result.errors) {
      setErrors(result.errors);
    }
  };

  return (
    <form className="w-full flex flex-col gap-5" onSubmit={handelSubmit}>
      {(['firstname', 'lastname', 'phone', 'email'] as ErrorFields[]).map((field, i) => (
        <InputCheckout
          key={field + i}
          label={field.replace('_', ' ').toUpperCase()}
          name={field}
          placeholder={`Enter ${field}`}
          error={errors?.[field] as string}
        />
      ))}
      <Label htmlFor="deliveryAdress">ADDRESS:</Label>
      <AddressForm
        places={places}
        errors={errors.deliveryAdress}
        handlePlaceChanged={handlePlaceChanged}
        autocompleteRef={autocompleteRef}
      />
      <ButtonComponent type="submit" text="Submit" className="max-w-28" />
    </form>
  );
}

export default CheckoutForm;
