import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';
import { config } from '../config/default';
import getLogger from '../utils/logger';

const logger = getLogger('session');

const redisClient = createClient({
  url: config.redis,
});

redisClient
  .connect()
  .then(() => {
    logger.info('Redis connected');
  })
  .catch((err) => {
    logger.error('Redis connection error:', err);
  });

const redisStore = new RedisStore({
  client: redisClient,
});

const cookieParams: session.CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: false,
  maxAge: 24 * 60 * 60 * 1000,
};

const sessionMiddleware = session({
  store: redisStore,
  secret: config.session.secret,
  name: config.session.cookieName,
  resave: false,
  saveUninitialized: false,
  cookie: cookieParams,
});

export default sessionMiddleware;
