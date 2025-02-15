import { matchedData, validationResult } from 'express-validator';
import { Request } from 'express';

export class ValidationHelper {
  static checkForNullOrUndefined(variable: any, errorMessage: string = 'Not handled variable'): void | Error {
    if (variable === null || variable === undefined) {
      throw new Error(errorMessage + ' is null or undefined');
    }
  }

  static validateRequest(req: Request) {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return {
        validationErrors: validationErrors.array(),
        matchedData: null,
      };
    }
    return {
      validationErrors: null,
      matchedData: matchedData(req),
    };
  }

  static isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  }
}
