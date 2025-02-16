import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import ErrorWithContext from '../errors/errorWithContext';
import HttpCodesHelper from '../helpers/httpCodeHelper';
import ErrorHandler from '../helpers/errorHendler';

const errorHandlingMiddleware: ErrorRequestHandler = (err: Error | ErrorWithContext, req: Request, res: Response, next: NextFunction) => {
  const errorHandler = new ErrorHandler();

  if (err instanceof ErrorWithContext) {
    if (err.isValidation) {
      return errorHandler.validation(err.message, err.statusCode, res);
    } else {
      return errorHandler.standard(err, err.statusCode, res);
    }
  }

  return errorHandler.standard(err, HttpCodesHelper.SERVER_ERROR, res);
};

export default errorHandlingMiddleware;
