import { NextFunction, Response, Request } from 'express';
import UserService from '../services/userService';
import { ValidationHelper } from '../helpers/validationHelper';
import ErrorWithContext from '../errors/errorWithContext';
import HttpCodesHelper from '../helpers/httpCodeHelper';

export default class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = req?.user;
      ValidationHelper.checkForNullOrUndefined(user, 'user');

      return res.success(user, HttpCodesHelper.OK, 'User information fetched successfully');
    } catch (error) {
      next(new ErrorWithContext({}, `Error in UserController method getUser: ${error}`, HttpCodesHelper.BAD));
    }
  }

  async postAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { validationErrors, matchedData } = ValidationHelper.validateRequest(req);

      if (validationErrors !== null) {
        const errorMessage: string = validationErrors.map((error) => error.msg).join(', ');
        return next(new ErrorWithContext({}, errorMessage, HttpCodesHelper.BAD, true));
      }

      const { userId, address } = matchedData;

      ValidationHelper.checkForNullOrUndefined(address, 'address');

      const updateUser = await this.userService.updateUserAddress(userId, address);

      return res.success(updateUser, HttpCodesHelper.OK, 'User address set successfully');
    } catch (error) {
      next(new ErrorWithContext({}, `Error in UserController method postAddress: ${error}`, HttpCodesHelper.BAD));
    }
  }

  async updateUserAddress(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { validationErrors, matchedData } = ValidationHelper.validateRequest(req);

      if (validationErrors !== null) {
        const errorMessage: string = validationErrors.map((error) => error.msg).join(', ');
        return next(new ErrorWithContext({}, errorMessage, HttpCodesHelper.BAD, true));
      }

      const { userId, address } = matchedData;

      ValidationHelper.checkForNullOrUndefined(address, 'address');

      const updateUser = await this.userService.updateUserAddress(userId, address);

      return res.success(updateUser, HttpCodesHelper.OK, 'User address set successfully');
    } catch (error) {
      next(new ErrorWithContext({}, `Error in UserController method updateUserAddress: ${error}`, HttpCodesHelper.BAD));
    }
  }
}
