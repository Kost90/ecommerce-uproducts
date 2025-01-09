import { ValidationHelper } from '../helpers/validationHelper';
import { Request, Response, NextFunction } from 'express';
import ErrorWithContext from '../errors/errorWithContext';
import HttpCodesHelper from '../helpers/httpCodeHelper';

class RequestMiddleware {
  public static validateRequest(req: Request, res: Response, next: NextFunction) {
    const { matchedData, validationErrors } = ValidationHelper.validateRequest(req);

    if (validationErrors) {
      const errorMessage: string = validationErrors.map((error) => error.msg).join(', ');
      return next(new ErrorWithContext({}, errorMessage, HttpCodesHelper.BAD));
    }

    req.matchedData = matchedData;

    next();
  }
}

export default RequestMiddleware;
