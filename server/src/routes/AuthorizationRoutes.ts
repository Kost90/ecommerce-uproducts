import Express, { Request, Response, NextFunction } from 'express';
import { AuthenticationMiddleware } from '../midlewares/authenticationMidleware';
import RequestMiddleware from '../midlewares/requestMidleware';
import AuthorizationValidator from '../validators/auth';
import { PrismaClient } from '@prisma/client';
import InjectionService from '../services/injectionServiceFactory';
import AuthorizationController from '../controllers/AuthorizationController';

const prisma = new PrismaClient();
const injectionService = new InjectionService(prisma);
const authorizationController = new AuthorizationController(injectionService.getAuthorizationService(), injectionService.getUserService());
export const router = Express.Router();

router.post(
  '/register',
  AuthenticationMiddleware.verifyApiKey,
  AuthorizationValidator.create(),
  RequestMiddleware.validateRequest,
  (req: Request, res: Response, next: NextFunction) => authorizationController.signUp(req, res, next),
);

router.post(
  '/login',
  AuthenticationMiddleware.verifyApiKey,
  AuthorizationValidator.login(),
  RequestMiddleware.validateRequest,
  (req: Request, res: Response, next: NextFunction) => authorizationController.signIn(req, res, next),
);

router.post('/logout', AuthenticationMiddleware.verifyApiKey, (req: Request, res: Response) => authorizationController.signOut(req, res));
