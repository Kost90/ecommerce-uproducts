"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = require("connect-redis");
const redis_1 = require("redis");
const default_1 = require("../config/default");
const logger_1 = __importDefault(require("utils/logger"));
const logger = (0, logger_1.default)('session');
const redisClient = (0, redis_1.createClient)({
    url: default_1.config.redis,
    legacyMode: true,
});
redisClient.connect().catch(logger.error);
const redisStore = new connect_redis_1.RedisStore({
    client: redisClient,
    disableTouch: true,
});
const cookieParams = {
    httpOnly: true,
    sameSite: 'strict',
    secure: default_1.config.session.secureCookie,
    maxAge: 24 * 60 * 60 * 1000,
};
const sessionMiddleware = (0, express_session_1.default)({
    store: redisStore,
    secret: default_1.config.session.secret,
    name: default_1.config.session.cookieName,
    resave: false,
    saveUninitialized: false,
    cookie: cookieParams,
});
exports.default = sessionMiddleware;
