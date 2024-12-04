import { AddressFields } from '@/components/checkout/checkoutForm/CheckoutForm';
import { IAdress } from './types';

export const parseAddress = (arr: { types: string[]; long_name: string }[]): IAdress => {
  let address: IAdress = {
    street_number: '',
    route: '',
    postal_code: '',
    country: '',
    postal_town: '',
  };

  arr.forEach((el) => {
    if (['street_number', 'route', 'postal_town', 'country', 'postal_code'].includes(el.types[0])) {
      address = {
        ...address,
        [el.types[0]]: el.long_name,
      };
    }
  });

  return address;
};

export const getFieldLable = (field: AddressFields) => {
  const fileds: Record<AddressFields, string> = {
    postal_code: 'Postal Code',
    route: 'Street Name',
    postal_town: 'City/Town',
    country: 'Country',
    street_number: 'Street Number',
  };

  return fileds[field] || field.replace('_', ' ');
};

export { IAdress };
