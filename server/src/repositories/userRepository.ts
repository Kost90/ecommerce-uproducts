import { PrismaClient, User } from '@prisma/client';
import ErrorWithContext from '../errors/errorWithContext';
import HttpCodesHelper from '../helpers/httpCodeHelper';

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

  async findByEmail(userEmail: string): Promise<User> {
    try {
      const user = await this.prismaClient.user.findUnique({
        where: {
          email: userEmail,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw new ErrorWithContext({}, `Error in UserRepository method findByEmail: ${error}`, HttpCodesHelper.BAD);
    }
  }
}
