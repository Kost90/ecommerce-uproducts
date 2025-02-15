"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validationHelper_1 = require("../helpers/validationHelper");
const errorWithContext_1 = __importDefault(require("../errors/errorWithContext"));
const httpCodeHelper_1 = __importDefault(require("../helpers/httpCodeHelper"));
class RequestMiddleware {
    static validateRequest(req, res, next) {
        const { matchedData, validationErrors } = validationHelper_1.ValidationHelper.validateRequest(req);
        if (validationErrors) {
            const errorMessage = validationErrors.map((error) => error.msg).join(', ');
            return next(new errorWithContext_1.default({}, errorMessage, httpCodeHelper_1.default.BAD));
        }
        req.matchedData = matchedData;
        next();
    }
}
exports.default = RequestMiddleware;
