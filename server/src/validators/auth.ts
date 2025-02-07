import { checkSchema, Schema } from 'express-validator';
import { ValidationHelper } from '../helpers/validationHelper';

export default class AuthorizationValidator {
  public static login() {
    return checkSchema({
      email: {
        in: ['body'],
        isEmail: true,
        trim: true,
        normalizeEmail: true,
        errorMessage: 'Invalid email format',
        notEmpty: {
          errorMessage: 'Email is required',
        },
      },
      password: {
        in: ['body'],
        isString: true,
        trim: true,
        escape: true,
        errorMessage: 'Password must be a string',
        notEmpty: {
          errorMessage: 'Password is required',
        },
      },
    });
  }

  public static create() {
    return checkSchema({
      firstname: {
        in: ['body'],
        isString: true,
        trim: true,
        escape: true,
        isLength: { options: { min: 3, max: 20 } },
        errorMessage: 'Firstname must be a string between 3 and 20 characters',
        notEmpty: {
          errorMessage: 'Firstname is required',
        },
      },
      lastname: {
        in: ['body'],
        isString: true,
        trim: true,
        escape: true,
        isLength: { options: { min: 2, max: 20 } },
        errorMessage: 'Lastname must be a string between 3 and 20 characters',
        notEmpty: {
          errorMessage: 'Lastname is required',
        },
      },
      email: {
        in: ['body'],
        isEmail: true,
        trim: true,
        normalizeEmail: true,
        errorMessage: 'Invalid email format',
        notEmpty: {
          errorMessage: 'Email is required',
        },
      },
      password: {
        in: ['body'],
        isString: true,
        trim: true,
        escape: true,
        errorMessage: 'Password must be a string',
        notEmpty: {
          errorMessage: 'Password is required',
        },
        custom: {
          options: (value) => {
            if (!ValidationHelper.isValidPassword(value)) {
              throw new Error(
                'Password must be at least 8 characters long and contain at least one letter, one number, one special character',
              );
            }
            return true;
          },
        },
      },
      telephone: {
        in: ['body'],
        isString: true,
        // isMobilePhone: {
        //   options: ['uk-UA', 'GB'],
        //   errorMessage: 'Telephone must be a valid phone number for Ukraine or the United Kingdom',
        // },
        trim: true,
        escape: true,
        errorMessage: 'Telephone must be a string',
        notEmpty: {
          errorMessage: 'Telephone is required',
        },
      },
      role: {
        in: ['body'],
        optional: true,
        isString: true,
        trim: true,
        escape: true,
        errorMessage: 'Role must be an admin or costumer',
      },
    });
  }
}
