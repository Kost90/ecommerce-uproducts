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
const validationHelper_1 = require("../helpers/validationHelper");
const getImageUrl_1 = require("../utils/getImageUrl");
const httpCodeHelper_1 = __importDefault(require("../helpers/httpCodeHelper"));
const errorWithContext_1 = __importDefault(require("../errors/errorWithContext"));
const logger_1 = __importDefault(require("../utils/logger"));
const logger = (0, logger_1.default)('ProductsService');
class ProductsService {
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    getAllProducts(_a) {
        return __awaiter(this, arguments, void 0, function* ({ offset = 0, limit = 6 }) {
            try {
                logger.info(`Fetching products with offset ${offset} and limit ${limit}`);
                const { products, total } = yield this.productsRepository.getAllProducts({ offset, limit });
                validationHelper_1.ValidationHelper.checkForNullOrUndefined(products, `${this.constructor.name}: products`);
                validationHelper_1.ValidationHelper.checkForNullOrUndefined(total, `${this.constructor.name}: total`);
                logger.info(`Fetched ${products.length} products out of ${total}`);
                const updatedProducts = yield this.enrichProductData(products);
                return { products: updatedProducts, total };
            }
            catch (error) {
                logger.error(`Error fetching products in ProductsService method getAllProducts:: ${error}`);
                throw new errorWithContext_1.default({}, `Error in ProductsService method getAllProducts: ${error}`, httpCodeHelper_1.default.BAD);
            }
        });
    }
    getProductsByCategory(_a) {
        return __awaiter(this, arguments, void 0, function* ({ offset = 0, limit = 6, category }) {
            try {
                logger.info(`Fetching products with offset ${offset} and limit ${limit}`);
                const { products, total } = yield this.productsRepository.getByCategory({ offset, limit, category });
                validationHelper_1.ValidationHelper.checkForNullOrUndefined(products, `${this.constructor.name}: products`);
                validationHelper_1.ValidationHelper.checkForNullOrUndefined(total, `${this.constructor.name}: total`);
                logger.info(`Fetched ${products.length} products out of ${total}`);
                const updatedProducts = yield this.enrichProductData(products);
                return { products: updatedProducts, total };
            }
            catch (error) {
                logger.error(`Error fetching products in ProductsService method getAllProducts:: ${error}`);
                throw new errorWithContext_1.default({}, `Error in ProductsService method getAllProducts: ${error}`, httpCodeHelper_1.default.BAD);
            }
        });
    }
    findProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.productsRepository.findById(id);
                validationHelper_1.ValidationHelper.checkForNullOrUndefined(product, 'product');
                product.imagePath = yield (0, getImageUrl_1.getProductsUrl)(product === null || product === void 0 ? void 0 : product.imageKey);
                return product;
            }
            catch (error) {
                logger.error(`Error fetching products in ProductsService method findProductById:: ${error}`);
                throw new errorWithContext_1.default({}, `Error in ProductsService method findProductById: ${error}`, httpCodeHelper_1.default.BAD);
            }
        });
    }
    serchByProductName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger.info(`Fetching products by name ${name}`);
                const { products, total } = yield this.productsRepository.searchByName(name);
                validationHelper_1.ValidationHelper.checkForNullOrUndefined(products, `${this.constructor.name}: products`);
                validationHelper_1.ValidationHelper.checkForNullOrUndefined(total, `${this.constructor.name}: total`);
                const updatedProducts = yield this.enrichProductData(products);
                return { products: updatedProducts, total };
            }
            catch (error) {
                logger.error(`Error fetching products in ProductsService method serchByProductName:: ${error}`);
                throw new errorWithContext_1.default({}, `Error in ProductsService method serchByProductName: ${error}`, httpCodeHelper_1.default.BAD);
            }
        });
    }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                validationHelper_1.ValidationHelper.checkForNullOrUndefined(product, 'product param');
                logger.info(`Saving product ${product} to db`);
                const savedProduct = yield this.productsRepository.createProduct(product);
                validationHelper_1.ValidationHelper.checkForNullOrUndefined(savedProduct, 'savedProduct');
                return savedProduct;
            }
            catch (error) {
                logger.error(`Error saving product in ProductsService method createProduct:: ${error}`);
                throw new errorWithContext_1.default({}, `Error in ProductsService method createProduct: ${error}`, httpCodeHelper_1.default.BAD);
            }
        });
    }
    updateProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                validationHelper_1.ValidationHelper.checkForNullOrUndefined(product, 'product param');
                logger.info(`Updating product ${product} to db`);
                const updatedProduct = yield this.productsRepository.update(product);
                validationHelper_1.ValidationHelper.checkForNullOrUndefined(updatedProduct, 'updatedProduct');
                return updatedProduct;
            }
            catch (error) {
                logger.error(`Error saving product in ProductsService method updateProduct:: ${error}`);
                throw new errorWithContext_1.default({}, `Error in ProductsService method updateProduct: ${error}`, httpCodeHelper_1.default.BAD);
            }
        });
    }
    removeProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                validationHelper_1.ValidationHelper.checkForNullOrUndefined(id, 'id param');
                const removedProduct = yield this.productsRepository.deleteProduct(id);
                validationHelper_1.ValidationHelper.checkForNullOrUndefined(removedProduct, 'removedProduct');
                return removedProduct;
            }
            catch (error) {
                logger.error(`Error saving product in ProductsService method removeProduct:: ${error}`);
                throw new errorWithContext_1.default({}, `Error in ProductsService method removeProduct: ${error}`, httpCodeHelper_1.default.BAD);
            }
        });
    }
    enrichProductData(products) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(products.map((product) => __awaiter(this, void 0, void 0, function* () {
                return (Object.assign(Object.assign({}, product), { imagePath: yield (0, getImageUrl_1.getProductsUrl)(product.imageKey).catch(() => '') }));
            })));
        });
    }
}
exports.default = ProductsService;
