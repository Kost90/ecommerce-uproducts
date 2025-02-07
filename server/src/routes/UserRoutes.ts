import Express, { Request, Response, NextFunction } from 'express';
import { AuthenticationMiddleware } from '../midlewares/authenticationMidleware';
import RequestMiddleware from '../midlewares/requestMidleware';
import { PrismaClient } from '@prisma/client';
import InjectionService from '../services/injectionServiceFactory';
import UserController from '../controllers/UserController';

const prisma = new PrismaClient();
const injectionService = new InjectionService(prisma);
const authenticationMiddleware = new AuthenticationMiddleware(injectionService.getUserService());
const userController = new UserController(injectionService.getUserService());
export const router = Express.Router();

router.get(
  '/',
  AuthenticationMiddleware.verifyApiKey,
  (req, res, next) => authenticationMiddleware.verifyAccesse(req, res, next),
  RequestMiddleware.validateRequest,
  (req: Request, res: Response, next: NextFunction) => userController.getUser(req, res, next),
);
