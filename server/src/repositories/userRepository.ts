import { Address, PrismaClient, User } from '@prisma/client';
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

  async updateUserAddress(userId: string, address: Omit<Address, 'id'>): Promise<User & { address: Address | null }> {
    try {
      await this.prismaClient.address.upsert({
        where: { userId },
        update: {
          city: address.city,
          street: address.street,
          number: address.number,
          country: address.country,
          postalCode: address.postalCode,
        },
        create: {
          ...address,
          userId: userId,
          user: { connect: { id: userId } },
        },
      });

      const updatedUserWithAddress = await this.prismaClient.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
        include: { address: true },
      });

      return updatedUserWithAddress;
    } catch (error) {
      throw new ErrorWithContext({}, `Error in UserRepository method updateUserAddress: ${error}`, HttpCodesHelper.BAD);
    }
  }

  async findByEmail(userEmail: string): Promise<User> {
    try {
      const user = await this.prismaClient.user.findUnique({
        where: {
          email: userEmail,
        },
        include: { address: true },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw new ErrorWithContext({}, `Error in UserRepository method findByEmail: ${error}`, HttpCodesHelper.BAD);
    }
  }

  async findById(userId: string): Promise<User> {
    try {
      const user = await this.prismaClient.user.findUnique({
        where: {
          id: userId,
        },
        include: { address: true },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw new ErrorWithContext({}, `Error in UserRepository method findById: ${error}`, HttpCodesHelper.BAD);
    }
  }
}
