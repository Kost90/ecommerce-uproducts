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
}
