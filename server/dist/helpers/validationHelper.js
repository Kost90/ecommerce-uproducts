"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationHelper = void 0;
const express_validator_1 = require("express-validator");
class ValidationHelper {
    static checkForNullOrUndefined(variable, errorMessage = 'Not handled variable') {
        if (variable === null || variable === undefined) {
            throw new Error(errorMessage + ' is null or undefined');
        }
    }
    static validateRequest(req) {
        const validationErrors = (0, express_validator_1.validationResult)(req);
        if (!validationErrors.isEmpty()) {
            return {
                validationErrors: validationErrors.array(),
                matchedData: null,
            };
        }
        return {
            validationErrors: null,
            matchedData: (0, express_validator_1.matchedData)(req),
        };
    }
    static isValidPassword(password) {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    }
}
exports.ValidationHelper = ValidationHelper;
