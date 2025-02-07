import './types/express';
import express, { Express } from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router as productRoutes } from './routes/ProductRoutes';
import { router as authorizationRouter } from './routes/AuthorizationRoutes';
import { router as userRouter } from './routes/UserRoutes';
import { config } from './config/default';
import getLogger from './utils/logger';
import responseMiddleware from './midlewares/responseMiddleware';
import errorHandlingMiddleware from './midlewares/errorHandlingMidleware';
import sessionMiddleware from './session/session';

const { port } = config.server;
const logger = getLogger('Server');

// Express server
const app: Express = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(sessionMiddleware);
const server = http.createServer(app);

app.use(responseMiddleware);
app.use('/products', productRoutes);
app.use('/auth', authorizationRouter);
app.use('/user', userRouter);

app.use(errorHandlingMiddleware);

server.listen(port, () => {
  logger.info(`Server is running on port: ${port}`);
});
