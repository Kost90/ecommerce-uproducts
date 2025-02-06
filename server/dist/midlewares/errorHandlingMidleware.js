"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorWithContext_1 = __importDefault(require("../errors/errorWithContext"));
const httpCodeHelper_1 = __importDefault(require("../helpers/httpCodeHelper"));
const errorHendler_1 = __importDefault(require("../helpers/errorHendler"));
const errorHandlingMiddleware = (err, req, res, next) => {
    const errorHandler = new errorHendler_1.default();
    if (err instanceof errorWithContext_1.default) {
        if (err.isValidation) {
            return errorHandler.validation(err.message, err.statusCode, res);
        }
        else {
            return errorHandler.standard(err, err.statusCode, res);
        }
    }
    return errorHandler.standard(err, httpCodeHelper_1.default.SERVER_ERROR, res);
};
exports.default = errorHandlingMiddleware;
