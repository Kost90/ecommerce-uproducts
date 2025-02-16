import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';
import { config } from '../config/default';
import getLogger from '../utils/logger';

const logger = getLogger('session');

const redisClient = createClient({
  url: config.redis,
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 100, 3000),
  },
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
  prefix: 'sess:',
  ttl: 86400,
});

const cookieParams: session.CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: true,
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
