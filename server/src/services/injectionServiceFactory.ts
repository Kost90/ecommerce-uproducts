import { PrismaClient } from '@prisma/client';
import ProductsService from './productsService';
import UserService from './userService';
import AuthorizationService from './authorizationService';
import ProductsRepository from '../repositories/productsRepository';
import UserRepository from '../repositories/userRepository';

class InjectionService {
  private prismaClient: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prismaClient = prisma;
  }

  getProductsRepository() {
    return new ProductsRepository(this.prismaClient);
  }

  getUserRepository() {
    return new UserRepository(this.prismaClient);
  }

  getProductsService() {
    return new ProductsService(this.getProductsRepository());
  }

  getUserService() {
    return new UserService(this.getUserRepository());
  }

  getAuthorizationService() {
    return new AuthorizationService(this.getUserService());
  }
}

export default InjectionService;
