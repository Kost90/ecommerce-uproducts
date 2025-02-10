import AuthorizationService from '../services/authorizationService';
import UserService from '../services/userService';
import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/default';
import { ValidationHelper } from '../helpers/validationHelper';
import HttpCodesHelper from '../helpers/httpCodeHelper';
import ErrorWithContext from '../errors/errorWithContext';
import { User } from '@prisma/client';
import { UserResponseDTO } from '../dto/user/get';

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

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { validationErrors, matchedData } = ValidationHelper.validateRequest(req);

      if (validationErrors !== null) {
        const errorMessage: string = validationErrors.map((error) => error.msg).join(', ');
        return next(new ErrorWithContext({}, errorMessage, HttpCodesHelper.BAD, true));
      }

      const user = await this.userService.findOneByEmail(matchedData.email);

      const isPasswordCorrect = this.authorizationService.comparePassword(matchedData.password, user.password);

      if (!isPasswordCorrect) {
        return next(new ErrorWithContext({ userId: user.id }, 'Password incorrect', HttpCodesHelper.FORBIDDEN));
      }

      const token = jwt.sign({ userId: user.id }, config.session.secret, { expiresIn: '1d' });
      const loginedUser = new UserResponseDTO(user);

      req.session.jwt = token;

      return res.success(loginedUser, HttpCodesHelper.OK, 'User authenticated successfully');
    } catch (error) {
      next(new ErrorWithContext({}, `Error in AuthorizationController method signIn: ${error}`, HttpCodesHelper.BAD));
    }
  }

  async signOut(req: Request, res: Response) {
    req.session.destroy((err: unknown) => {
      if (err) {
        return res.status(HttpCodesHelper.SERVER_ERROR).send({ message: 'Error logging out' });
      }

      res.clearCookie(config.session.cookieName);
      res.status(HttpCodesHelper.OK).send({ message: 'Logged out successfully' });
    });
  }
}
