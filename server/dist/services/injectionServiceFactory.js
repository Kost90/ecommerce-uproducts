"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productsService_1 = __importDefault(require("./productsService"));
const productsRepository_1 = __importDefault(require("../repositories/productsRepository"));
class InjectionService {
    constructor(prisma) {
        this.prismaClient = prisma;
    }
    getProductsRepository() {
        return new productsRepository_1.default(this.prismaClient);
    }
    getProductsService() {
        return new productsService_1.default(this.getProductsRepository());
    }
}
exports.default = InjectionService;
