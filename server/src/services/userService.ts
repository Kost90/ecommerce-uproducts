import { Address, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import UserRepository from '../repositories/userRepository';
import { UserCreatedResponseDTO } from '../dto/user/creat';
import { UserResponseDTO } from '../dto/user/get';
import { ValidationHelper } from '../helpers/validationHelper';
import HttpCodesHelper from '../helpers/httpCodeHelper';
import ErrorWithContext from '../errors/errorWithContext';
import getLogger from '../utils/logger';
import UserDTO from '../dto/user/get';
const logger = getLogger('ProductsService');

export default class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async save(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'addressId'>): Promise<UserResponseDTO> {
    try {
      ValidationHelper.checkForNullOrUndefined(userData, 'userData');

      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(userData.password, salt);

      const userForSave = {
        ...userData,
        password: hashedPass,
      };

      const createdUser = await this.userRepository.store(userForSave);

      ValidationHelper.checkForNullOrUndefined(createdUser, 'createdUser');
      logger.info(`New user with id: ${createdUser.id} is created`);

      const response = new UserResponseDTO(createdUser);
      return response;
    } catch (error) {
      logger.error(`Error saving new user in UserService method save:: ${error}`);
      throw new ErrorWithContext({}, `Error in UserService method save: ${error}`, HttpCodesHelper.BAD);
    }
  }

  async updateUserAddress(userId: string, address: Omit<Address, 'id'>): Promise<UserResponseDTO> {
    try {
      const updatedUser = await this.userRepository.updateUserAddress(userId, address);

      ValidationHelper.checkForNullOrUndefined(updatedUser, 'updatedUser');
      logger.info(`Address created or updated in user with id: ${userId}`);

      const response = new UserResponseDTO(updatedUser);
      return response;
    } catch (error) {
      logger.error(`Error update or create user address in UserService method updateUserAddress: ${error}`);
      throw new ErrorWithContext({}, `Error in UserService method updateUserAddress: ${error}`, HttpCodesHelper.BAD);
    }
  }

  async findOneByEmail(userEmail: string): Promise<UserDTO> {
    try {
      ValidationHelper.checkForNullOrUndefined(userEmail, `${this.constructor.name}: userEmail`);

      const user = await this.userRepository.findByEmail(userEmail);

      const userDTO = new UserDTO(user);

      return userDTO;
    } catch (error) {
      logger.error(`Error find user by email in UserService method findOneByEmail:: ${error}`);
      throw new ErrorWithContext({}, `Error in UserService method findOneByEmail: ${error}`, HttpCodesHelper.BAD);
    }
  }

  async findById(userId: string): Promise<UserResponseDTO> {
    try {
      ValidationHelper.checkForNullOrUndefined(userId, `${this.constructor.name}: userId`);

      const user = await this.userRepository.findById(userId);

      const userDTO = new UserResponseDTO(user);

      return userDTO;
    } catch (error) {
      logger.error(`Error find user by email in UserService method findById:: ${error}`);
      throw new ErrorWithContext({}, `Error in UserService method findById: ${error}`, HttpCodesHelper.BAD);
    }
  }
}
