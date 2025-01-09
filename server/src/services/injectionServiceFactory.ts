import { PrismaClient } from '@prisma/client';
import ProductsService from './productsService';
import ProductsRepository from '../repositories/productsRepository';

class InjectionService {
  private prismaClient: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prismaClient = prisma;
  }

  getProductsRepository() {
    return new ProductsRepository(this.prismaClient);
  }

  getProductsService() {
    return new ProductsService(this.getProductsRepository());
  }
}

export default InjectionService;
