"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./types/express");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const ProductRoutes_1 = require("./routes/ProductRoutes");
const default_1 = require("./config/default");
const logger_1 = __importDefault(require("./utils/logger"));
const responseMiddleware_1 = __importDefault(require("./midlewares/responseMiddleware"));
const errorHandlingMidleware_1 = __importDefault(require("./midlewares/errorHandlingMidleware"));
const session_1 = __importDefault(require("session/session"));
const { port } = default_1.config.server;
const logger = (0, logger_1.default)('Server');
// Express server
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(session_1.default);
const server = http_1.default.createServer(app);
app.use(responseMiddleware_1.default);
app.use('/products', ProductRoutes_1.router);
app.use(errorHandlingMidleware_1.default);
server.listen(port, () => {
    logger.info(`Server is running on port: ${port}`);
});
