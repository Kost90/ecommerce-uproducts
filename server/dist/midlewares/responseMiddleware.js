"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseHelper_1 = __importDefault(require("../helpers/responseHelper"));
const httpCodeHelper_1 = __importDefault(require("../helpers/httpCodeHelper"));
const responseMiddleware = (req, res, next) => {
    res.success = (data, statusCode = httpCodeHelper_1.default.OK, message = null) => {
        res.json(responseHelper_1.default.successResponse(data, statusCode, message));
    };
    next();
};
exports.default = responseMiddleware;
