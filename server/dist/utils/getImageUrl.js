"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsUrl = getProductsUrl;
const dotenv_1 = __importDefault(require("dotenv"));
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const default_1 = require("../config/default");
dotenv_1.default.config();
const bucketName = default_1.config.awsBucket.name;
const s3Config = {
    region: default_1.config.awsBucket.region,
    credentials: {
        accessKeyId: default_1.config.awsBucket.accessKeyId,
        secretAccessKey: default_1.config.awsBucket.secretAccessKey,
    },
};
const s3 = new client_s3_1.S3Client(s3Config);
function getProductsUrl(key) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const params = {
                Bucket: bucketName,
                Key: key,
            };
            const command = new client_s3_1.GetObjectCommand(params);
            const seconds = 60;
            const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3, command, { expiresIn: seconds });
            if (!url) {
                throw new Error(`Can't fetch product url`);
            }
            return url;
        }
        catch (error) {
            throw new Error(`Error in getProductsUrl function: ${error}`);
        }
    });
}
