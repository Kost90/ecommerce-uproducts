import AuthorizationService from 'services/authorizationService';
import UserService from 'services/userService';
import { Response, Request, NextFunction } from 'express';
import { config } from '../config/default';
import { ValidationHelper } from '../helpers/validationHelper';
import HttpCodesHelper from '../helpers/httpCodeHelper';
import ErrorWithContext from '../errors/errorWithContext';
import { User } from '@prisma/client';

export default class AuthorizationController {
  private authorizationService: AuthorizationService;
  private userService: UserService;

  constructor(authorizationService: AuthorizationService, userService: UserService) {
    this.authorizationService = authorizationService;
    this.userService = userService;
  }

  async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { validationErrors, matchedData } = ValidationHelper.validateRequest(req);

      if (validationErrors !== null) {
        const errorMessage: string = validationErrors.map((error) => error.msg).join(', ');
        return next(new ErrorWithContext({}, errorMessage, HttpCodesHelper.BAD, true));
      }

      ValidationHelper.checkForNullOrUndefined(matchedData, `matchedData`);

      const savedUser = await this.userService.save(matchedData as Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'addressId'>);

      return res.success(savedUser, HttpCodesHelper.OK, 'User registered successfully');
    } catch (error) {
      next(new ErrorWithContext({}, `Error in AuthorizationController method signUp: ${error}`, HttpCodesHelper.BAD));
    }
  }
}
