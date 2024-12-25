import { AddressFields } from '@/components/checkout/checkoutForm/CheckoutForm';
import { IAdress } from './types';
import { ICostumerData } from '../lib/redux/reducers/orders/ordersSlice';

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

export const getFieldLable = (field: AddressFields): string => {
  const fileds: Record<AddressFields, string> = {
    postal_code: 'Postal Code',
    route: 'Street Name',
    postal_town: 'City/Town',
    country: 'Country',
    street_number: 'Street Number',
  };

  return fileds[field] || field.replace('_', ' ');
};

export const getErrorForAddresInput = (filed: string, errors: string[]): string => {
  let word = filed.replace('_', ' ');

  switch (filed) {
    case 'route':
      word = 'address';
      break;
    case 'street_number':
      word = 'number';
      break;
    case 'postal_town':
      word = 'city';
      break;
    default:
      break;
  }
  if (!Array.isArray(errors)) {
    return '';
  }
  const result = errors.filter((error) => {
    return error.toLowerCase().includes(word.toLowerCase());
  });
  if (result.length !== 0) {
    return result[0];
  }

  return '';
};

export const setFirstLetterUppercase = (string: string): string => {
  const firstLetter = string[0].toUpperCase();
  const otherLetters = string.slice(1);

  return `${firstLetter}${otherLetters}`;
};

export const formatDeliveryAddress = (address?: ICostumerData['deliveryAdress']): string | null => {
  if (!address) return null;

  const { street_number, route, postal_town, country, postal_code } = address;

  return [street_number, route, postal_town, country, postal_code].filter(Boolean).join(', ');
};

export const isEmptyObject = (obj: object): boolean => Object.keys(obj).length === 0;

export type { IAdress };
