"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class ProductsValidator {
    static getAllProducts() {
        return (0, express_validator_1.checkSchema)({
            page: {
                in: ['query'],
                isString: {
                    errorMessage: 'page must be a string',
                },
                trim: true,
                escape: true,
            },
        });
    }
    static getProductsByCategory() {
        return (0, express_validator_1.checkSchema)({
            category: {
                in: ['params'],
                isString: {
                    errorMessage: 'Category must be a string',
                },
                trim: true,
                escape: true,
                toLowerCase: true,
                isLength: {
                    errorMessage: 'Category should be at least 3 chars long',
                    options: { min: 3 },
                },
            },
            page: {
                in: ['query'],
                isString: {
                    errorMessage: 'page must be a string',
                },
                trim: true,
                escape: true,
            },
        });
    }
    static getSingleProduct() {
        return (0, express_validator_1.checkSchema)({
            id: {
                in: ['params'],
                isString: true,
                trim: true,
                escape: true,
                isLength: {
                    errorMessage: 'Product ID should be at least 5 characters long',
                    options: { min: 5 },
                },
                errorMessage: 'Invalid product id',
            },
        });
    }
    static searchProducts() {
        return (0, express_validator_1.checkSchema)({
            name: {
                in: ['params'],
                isString: true,
                trim: true,
                escape: true,
                isLength: {
                    errorMessage: 'Name should be at least 3 chars long',
                    options: { min: 3 },
                },
            },
        });
    }
    static createProduct() {
        return (0, express_validator_1.checkSchema)({
            name: {
                in: ['body'],
                isString: true,
                trim: true,
                escape: true,
                toLowerCase: true,
                isLength: {
                    errorMessage: 'Name should be at least 3 chars long',
                    options: { min: 3 },
                },
            },
            priceInCents: {
                in: ['body'],
                toInt: true,
                isNumeric: true,
                errorMessage: 'Price should be a number',
            },
            imagePath: {
                in: ['body'],
                isString: true,
                trim: true,
                escape: true,
                isLength: {
                    errorMessage: 'Image path should be at least 3 chars long',
                    options: { min: 3 },
                },
            },
            imageKey: {
                in: ['body'],
                isString: true,
                trim: true,
                escape: true,
                isLength: {
                    errorMessage: 'Image key should be at least 3 chars long',
                    options: { min: 3 },
                },
            },
            description: {
                in: ['body'],
                isString: true,
                trim: true,
                escape: true,
                isLength: {
                    errorMessage: 'Description should be at least 10 chars long',
                    options: { min: 10 },
                },
            },
            categories: {
                in: ['body'],
                isString: true,
                trim: true,
                escape: true,
                toLowerCase: true,
                isLength: {
                    errorMessage: 'Categories should be at least 3 chars long',
                    options: { min: 3 },
                },
            },
        });
    }
    static updateProduct() {
        return (0, express_validator_1.checkSchema)({
            id: {
                in: ['body'],
                isString: true,
                trim: true,
                escape: true,
                isLength: {
                    errorMessage: 'Product ID should be at least 5 characters long',
                    options: { min: 5 },
                },
                errorMessage: 'Invalid product id',
            },
            name: {
                in: ['body'],
                isString: true,
                trim: true,
                escape: true,
                toLowerCase: true,
                isLength: {
                    errorMessage: 'Name should be at least 3 chars long',
                    options: { min: 3 },
                },
            },
            priceInCents: {
                in: ['body'],
                toInt: true,
                isNumeric: true,
                errorMessage: 'Price should be a number',
            },
            imagePath: {
                in: ['body'],
                isString: true,
                trim: true,
                escape: true,
                isLength: {
                    errorMessage: 'Image path should be at least 3 chars long',
                    options: { min: 3 },
                },
            },
            imageKey: {
                in: ['body'],
                isString: true,
                trim: true,
                escape: true,
                isLength: {
                    errorMessage: 'Image key should be at least 3 chars long',
                    options: { min: 3 },
                },
            },
            description: {
                in: ['body'],
                isString: true,
                trim: true,
                escape: true,
                isLength: {
                    errorMessage: 'Description should be at least 10 chars long',
                    options: { min: 10 },
                },
            },
            categories: {
                in: ['body'],
                isString: true,
                trim: true,
                escape: true,
                toLowerCase: true,
                isLength: {
                    errorMessage: 'Categories should be at least 3 chars long',
                    options: { min: 3 },
                },
            },
        });
    }
    static removeProduct() {
        return (0, express_validator_1.checkSchema)({
            id: {
                in: ['params'],
                isString: true,
                trim: true,
                escape: true,
                isLength: {
                    errorMessage: 'Product ID should be at least 5 characters long',
                    options: { min: 5 },
                },
                errorMessage: 'Invalid product id',
            },
        });
    }
}
exports.default = ProductsValidator;
