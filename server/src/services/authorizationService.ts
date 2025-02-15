import { ValidationHelper } from '../helpers/validationHelper';
import UserService from './userService';
import bcrypt from 'bcrypt';

export default class AuthorizationService {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  comparePassword(password: string, userPassword: string): boolean {
    ValidationHelper.checkForNullOrUndefined(password, `${this.constructor.name}: password`);
    ValidationHelper.checkForNullOrUndefined(userPassword, `${this.constructor.name}: userPassword`);

    return bcrypt.compareSync(password, userPassword);
  }
}
