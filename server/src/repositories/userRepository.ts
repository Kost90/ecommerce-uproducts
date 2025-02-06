import { PrismaClient, User } from '@prisma/client';
import ErrorWithContext from 'errors/errorWithContext';
import HttpCodesHelper from 'helpers/httpCodeHelper';

export default class UserRepository {
  private prismaClient: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prismaClient = prisma;
  }

  async store(data: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'addressId'>): Promise<User> {
    try {
      const result = await this.prismaClient.user.create({ data: data });
      return result;
    } catch (error) {
      throw new ErrorWithContext({}, `Error in UserRepository method store: ${error}`, HttpCodesHelper.BAD);
    }
  }
}
