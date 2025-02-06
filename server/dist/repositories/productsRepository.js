"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorWithContext_1 = __importDefault(require("../errors/errorWithContext"));
const httpCodeHelper_1 = __importDefault(require("../helpers/httpCodeHelper"));
class ProductsRepository {
    constructor(prisma) {
        this.prismaClient = prisma;
    }
    getAllProducts(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [products, countProducts] = yield Promise.all([
                    this.prismaClient.product.findMany({
                        skip: pagination.offset,
                        take: pagination.limit,
                    }),
                    this.prismaClient.product.count(),
                ]);
                return {
                    products: products,
                    total: countProducts,
                };
            }
            catch (error) {
                throw new errorWithContext_1.default({}, `Error in ProductsRepository method getAllProducts: ${error}`, httpCodeHelper_1.default.BAD);
            }
        });
    }
    getByCategory(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [products, countProducts] = yield Promise.all([
                    this.prismaClient.product.findMany({
                        skip: params.offset,
                        take: params.limit,
                        where: { categories: params.category },
                    }),
                    this.prismaClient.product.count({
                        where: {
                            categories: params.category,
                        },
                    }),
                ]);
                return {
                    products: products,
                    total: countProducts,
                };
            }
            catch (error) {
                throw new errorWithContext_1.default({}, `Error in ProductsRepository method getAllProducts: ${error}`, httpCodeHelper_1.default.BAD);
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.prismaClient.product.findUnique({ where: { id: id } });
                return product;
            }
            catch (error) {
                throw new errorWithContext_1.default({}, `Error in ProductsRepository method findById: ${error}`, httpCodeHelper_1.default.BAD);
            }
        });
    }
    searchByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [products, countProducts] = yield Promise.all([
                    this.prismaClient.product.findMany({
                        where: {
                            name: { contains: name, mode: 'insensitive' },
                        },
                    }),
                    this.prismaClient.product.count({
                        where: {
                            name: {
                                contains: name,
                                mode: 'insensitive',
                            },
                        },
                    }),
                ]);
                return {
                    products: products,
                    total: countProducts,
                };
            }
            catch (error) {
                throw new errorWithContext_1.default({}, `Error in ProductsRepository method searchByName: ${error}`, httpCodeHelper_1.default.BAD);
            }
        });
    }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.prismaClient.product.create({ data: product });
                return result;
            }
            catch (error) {
                throw new errorWithContext_1.default({}, `Error in ProductsRepository method createProduct: ${error}`, httpCodeHelper_1.default.BAD);
            }
        });
    }
    update(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedProduct = yield this.prismaClient.product.update({
                    where: {
                        id: product.id,
                    },
                    data: {
                        name: product.name,
                        description: product.description,
                        priceInCents: product.priceInCents,
                        imageKey: product.imageKey,
                        imagePath: product.imagePath,
                        categories: product.categories,
                    },
                });
                return updatedProduct;
            }
            catch (error) {
                throw new errorWithContext_1.default({}, `Error in ProductsRepository method update: ${error}`, httpCodeHelper_1.default.BAD);
            }
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = this.prismaClient.product.delete({ where: { id: id } });
                return result;
            }
            catch (error) {
                throw new errorWithContext_1.default({}, `Error in ProductsRepository method deleteProduct: ${error}`, httpCodeHelper_1.default.BAD);
            }
        });
    }
}
exports.default = ProductsRepository;
