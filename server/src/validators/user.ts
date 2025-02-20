import { checkSchema, Schema } from 'express-validator';

class UserActionValidators {
  static postAddress() {
    const schema: Schema = {
      userId: {
        in: ['params'],
        isString: {
          errorMessage: 'userId must be a string',
        },
        trim: true,
        escape: true,
        toLowerCase: true,
        notEmpty: {
          errorMessage: 'userId is required',
        },
      },
      address: {
        in: ['body'],
        isObject: {
          errorMessage: 'Address must be an object',
        },
        notEmpty: {
          errorMessage: 'Address is required',
        },
      },
      'address.city': {
        in: ['body'],
        isString: {
          errorMessage: 'City must be a string',
        },
        trim: true,
        notEmpty: {
          errorMessage: 'City is required',
        },
      },
      'address.street': {
        in: ['body'],
        isString: {
          errorMessage: 'Street must be a string',
        },
        trim: true,
        notEmpty: {
          errorMessage: 'Street is required',
        },
      },
      'address.number': {
        in: ['body'],
        toInt: true,
        isNumeric: true,
        errorMessage: 'Number must be a number',
        trim: true,
        notEmpty: {
          errorMessage: 'Number is required',
        },
      },
      'address.country': {
        in: ['body'],
        isString: {
          errorMessage: 'Country must be a string',
        },
        trim: true,
        notEmpty: {
          errorMessage: 'Country is required',
        },
      },
      'address.postalCode': {
        in: ['body'],
        isString: {
          errorMessage: 'Postal code must be a string',
        },
        trim: true,
        notEmpty: {
          errorMessage: 'Postal code is required',
        },
      },
    };

    return checkSchema(schema);
  }
}

export default UserActionValidators;
