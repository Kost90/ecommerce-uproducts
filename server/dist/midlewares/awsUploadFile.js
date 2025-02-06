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
exports.default = addImage;
const dotenv_1 = __importDefault(require("dotenv"));
const client_s3_1 = require("@aws-sdk/client-s3");
dotenv_1.default.config();
const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
const s3Config = {
    region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY || "",
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
    },
};
//S3 client instance
const s3 = new client_s3_1.S3Client(s3Config);
function uploadFileToS3(file, fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileBuffer = file;
        const params = {
            Bucket: bucketName,
            Key: `${fileName}`,
            Body: fileBuffer,
            ContentType: "image/jpg",
        };
        const command = new client_s3_1.PutObjectCommand(params);
        yield s3.send(command);
        return fileName;
    });
}
function addImage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const file = req.file;
        const imageName = req.body.imageKey;
        const buffer = Buffer.from(yield file.buffer);
        const fileName = yield uploadFileToS3(buffer, imageName);
        next();
    });
}
