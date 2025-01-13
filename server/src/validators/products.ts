import { checkSchema } from 'express-validator';

class ProductsValidator {
  public static getProductsByCategory() {
    return checkSchema({
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

  public static getSingleProduct() {
    return checkSchema({
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

  public static searchProducts() {
    return checkSchema({
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

  public static createProduct() {
    return checkSchema({
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

  public static updateProduct() {
    return checkSchema({
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

  public static removeProduct() {
    return checkSchema({
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

export default ProductsValidator;
