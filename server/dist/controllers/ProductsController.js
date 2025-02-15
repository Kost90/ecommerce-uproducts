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
const default_1 = require("../config/default");
const validationHelper_1 = require("../helpers/validationHelper");
const httpCodeHelper_1 = __importDefault(require("../helpers/httpCodeHelper"));
const errorWithContext_1 = __importDefault(require("../errors/errorWithContext"));
class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    getAllProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const matchedData = req === null || req === void 0 ? void 0 : req.matchedData;
                validationHelper_1.ValidationHelper.checkForNullOrUndefined(matchedData, `matchedData`);
                const limit = default_1.config.limits.products.paginationsLimit;
                const page = Number(matchedData.page) || 1;
                const offset = (page - 1) * limit;
                const { products, total } = yield this.productsService.getAllProducts({
                    offset: offset,
                    limit: limit,
                });
                const result = {
                    products: products,
                    total: total,
                };
                return res.success(result, httpCodeHelper_1.default.OK, 'Products fetched successfully');
            }
            catch (error) {
                next(new errorWithContext_1.default({}, `Error in ProductsController method getAllProducts: ${error}`, httpCodeHelper_1.default.BAD));
            }
        });
    }
    getProductsByCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category, page = 1 } = req === null || req === void 0 ? void 0 : req.matchedData;
                validationHelper_1.ValidationHelper.checkForNullOrUndefined(category, 'category params');
                const limit = default_1.config.limits.products.paginationsLimit;
                const offset = (page - 1) * limit;
                const { products, total } = yield this.productsService.getProductsByCategory({
                    offset: offset,
                    limit: limit,
                    category,
                });
                const result = {
                    products: products,
                    total: total,
                };
                return res.success(result, httpCodeHelper_1.default.OK, 'Products by category fetched successfully');
            }
            catch (error) {
                next(new errorWithContext_1.default({}, `Error in ProductsController method getProductsByCategory: ${error}`, httpCodeHelper_1.default.BAD));
            }
        });
    }
    getSingleProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.matchedData;
                validationHelper_1.ValidationHelper.checkForNullOrUndefined(id, 'id');
                const product = yield this.productsService.findProductById(id);
                validationHelper_1.ValidationHelper.checkForNullOrUndefined(product, 'product');
                return res.success(product, httpCodeHelper_1.default.OK, 'Product by id fetched successfully');
            }
            catch (error) {
                next(new errorWithContext_1.default({}, `Error in ProductsController method getSingleProduct: ${error}`, httpCodeHelper_1.default.BAD));
            }
        });
    }
    serchByProductName(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.matchedData;
                validationHelper_1.ValidationHelper.checkForNullOrUndefined(name, 'name');
                const { products, total } = yield this.productsService.serchByProductName(name);
                const result = {
                    products: products,
                    total: total,
                };
                return res.success(result, httpCodeHelper_1.default.OK, 'Products by name fetched successfully');
            }
            catch (error) {
                next(new errorWithContext_1.default({}, `Error in ProductsController method serchByProductName: ${error}`, httpCodeHelper_1.default.BAD));
            }
        });
    }
    createProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataForSave = req.matchedData;
                validationHelper_1.ValidationHelper.checkForNullOrUndefined(dataForSave, 'dataForSave');
                const savedProduct = yield this.productsService.createProduct(dataForSave);
                return res.success(savedProduct, httpCodeHelper_1.default.OK, 'Products saved successfully');
            }
            catch (error) {
                next(new errorWithContext_1.default({}, `Error in ProductsController method createProduct: ${error}`, httpCodeHelper_1.default.BAD));
            }
        });
    }
    updateProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dataForUpdate = req.matchedData;
                validationHelper_1.ValidationHelper.checkForNullOrUndefined(dataForUpdate, 'dataForUpdate');
                const updatedProduct = yield this.productsService.updateProduct(dataForUpdate);
                return res.success(updatedProduct, httpCodeHelper_1.default.OK, 'Product updated successfully');
            }
            catch (error) {
                next(new errorWithContext_1.default({}, `Error in ProductsController method updateProduct: ${error}`, httpCodeHelper_1.default.BAD));
            }
        });
    }
    removeProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.matchedData;
                validationHelper_1.ValidationHelper.checkForNullOrUndefined(id, 'id');
                const removedProduct = yield this.productsService.removeProduct(id);
                return res.success(removedProduct, httpCodeHelper_1.default.OK, 'Product removed successfully');
            }
            catch (error) {
                next(new errorWithContext_1.default({}, `Error in ProductsController method removeProduct: ${error}`, httpCodeHelper_1.default.BAD));
            }
        });
    }
}
exports.default = ProductsController;
