"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = resizeImage;
const sharp_1 = __importDefault(require("sharp"));
function resizeImage(req, res, next) {
    if (!req.file) {
        return next(console.log("No file uploaded"));
    }
    (0, sharp_1.default)(req.file.buffer)
        .resize(420, 340)
        .toBuffer((err, buffer) => {
        if (err) {
            return next(err);
        }
        req.file.buffer = buffer;
        next();
    });
}
