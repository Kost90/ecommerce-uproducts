"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseHelper {
}
ResponseHelper.successResponse = (data, statusCode, message = null) => {
    return {
        status: statusCode,
        data,
        message,
    };
};
ResponseHelper.errorResponse = (message, statusCode) => {
    return {
        status: 'error',
        data: null,
        message,
        statusCode,
    };
};
exports.default = ResponseHelper;
