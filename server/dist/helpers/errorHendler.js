"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler {
    // TODO: Make error handling for multer
    validation(message, statusCode, res) {
        res.status(statusCode).json({
            error: {
                type: 'Validation Error',
                message,
                statusCode,
            },
        });
    }
    standard(err, statusCode, res) {
        res.status(statusCode).json({
            error: {
                type: 'Standard Error',
                message: err.message,
                statusCode,
            },
        });
    }
}
exports.default = ErrorHandler;
