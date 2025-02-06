"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorWithContext extends Error {
    constructor(context, message, statusCode, isValidation = false) {
        super(message);
        this.context = context || {};
        this.statusCode = statusCode || 500;
        this.isValidation = isValidation;
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.default = ErrorWithContext;
