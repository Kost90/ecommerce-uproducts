"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const safe_1 = require("colors/safe");
function getLogger(moduleName, loggerConfig = { colorsEnabled: true }) {
    if (!loggerConfig.colorsEnabled) {
        (0, safe_1.disable)();
    }
    return {
        info: (...args) => console.log((0, safe_1.bgBlue)(`${moduleName}`), ':', ...args),
        warn: (...args) => console.warn((0, safe_1.bgYellow)(`${moduleName}`), ':', ...args),
        error: (...args) => console.error((0, safe_1.bgRed)(`${moduleName}`), ':', ...args),
    };
}
exports.default = getLogger;
