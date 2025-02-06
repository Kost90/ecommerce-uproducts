import UserService from './userService';

export default class AuthorizationService {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }
}
