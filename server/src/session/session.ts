import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';
import { config } from '../config/default';
import getLogger from '../utils/logger';

const logger = getLogger('session');

const redisClient = createClient({
  url: config.redis,
});

redisClient.connect().catch(logger.error);

const redisStore = new RedisStore({
  client: redisClient,
  disableTouch: true,
});

const cookieParams: session.CookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
  secure: config.session.secureCookie,
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
