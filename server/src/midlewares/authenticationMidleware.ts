import { Request, Response, NextFunction } from 'express';
import { config } from '../config/default';
import HttpCodesHelper from '../helpers/httpCodeHelper';
import ErrorWithContext from '../errors/errorWithContext';

export class AuthenticationMiddleware {
  static verifyApiKey = function (req: Request, res: Response, next: NextFunction) {
    const authKey = req.header('x-auth-key');
    const authUser = req.header('x-auth-user');

    if (!(authKey == config.apiAuth.key && authUser == config.apiAuth.name)) {
      return next(new ErrorWithContext({}, 'Unathorized access is not allowed', HttpCodesHelper.UNATHORIZED, true));
    }
    next();
  };
}

module.exports = AuthenticationMiddleware;
