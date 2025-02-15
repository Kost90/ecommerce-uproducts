"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpCodesHelper {
    constructor(name) {
        this.name = name;
    }
}
HttpCodesHelper.OK = 200;
HttpCodesHelper.CREATED = 201;
HttpCodesHelper.BAD = 400;
HttpCodesHelper.UNATHORIZED = 401;
HttpCodesHelper.FORBIDDEN = 403;
HttpCodesHelper.NOT_FOUND = 404;
HttpCodesHelper.ENTITY_TOO_LARGE = 413;
HttpCodesHelper.UNSUPORTED_MEDIA_TYPE = 415;
HttpCodesHelper.SERVER_ERROR = 500;
exports.default = HttpCodesHelper;
