"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getEnvVar(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is not defined`);
    }
    return value;
}
exports.config = {
    server: {
        port: parseInt(process.env.PORT || '3001', 10),
    },
    apiAuth: {
        key: getEnvVar('API_KEY'),
        name: getEnvVar('API_NAME'),
    },
    limits: {
        products: {
            paginationsLimit: parseInt(getEnvVar('PRODUCTS_PER_PAGE')),
        },
    },
    awsBucket: {
        name: getEnvVar('AWS_BUCKET_NAME'),
        region: getEnvVar('AWS_BUCKET_REGION'),
        accessKeyId: getEnvVar('AWS_ACCESS_KEY') || '',
        secretAccessKey: getEnvVar('AWS_SECRET_ACCESS_KEY') || '',
    },
    session: {
        secureCookie: getEnvVar('NODE_ENV') === 'production',
        cookieName: 'sid',
        secret: getEnvVar('SESSION_SECRET'),
    },
    redis: getEnvVar('REDIS_URL'),
};
