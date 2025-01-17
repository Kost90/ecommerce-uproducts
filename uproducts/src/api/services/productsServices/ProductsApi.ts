import { API } from '@/api/Api';
import { Product, IProductsResponse, IProductResponse } from '@/constans/typeconstans';

// TODO: Remove it to the env
const url = process.env.NEXT_PUBLIC_URL;

// TODO:Make type of returns
class ProductsApi extends API {
  constructor(baseurl: string) {
    super(baseurl);
  }

  async AddProduct(product: Product): Promise<unknown> {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await this.fetch({
        path: `products/add`,
        signal,
        method: 'POST',
        body: JSON.stringify(product),
      });
      return response;
    } catch (error) {
      throw new Error(`Cant POST ${error}`);
    }
  }

  async getProducts(page?: string): Promise<IProductsResponse> {
    const controller = new AbortController();
    const signal = controller.signal;
    const queryParams = `?page=${page}`;
    try {
      const response: IProductsResponse = await this.fetch({
        path: `products${queryParams}`,
        signal,
      });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch data, ${error.message}`);
      } else throw new Error('An unknown error occurred during fetching data.');
    }
  }

  async getSingleProduct(id: string): Promise<IProductResponse> {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response: Promise<IProductResponse> = await this.fetch({
        path: `products/edit/${id}`,
        signal,
      });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch single product, ${error.message}`);
      } else throw new Error('An unknown error occurred during fetching data.');
    }
  }

  async updateProduct(data: Product): Promise<Product> {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response: Product = await this.fetch({
        path: 'products/update',
        method: 'PUT',
        body: JSON.stringify(data),
        signal,
      });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Can't update single product, ${error.message}`);
      } else throw new Error('An unknown error occurred during fetching data.');
    }
  }

  async searchProducts(name: string): Promise<IProductsResponse> {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response: IProductsResponse = await this.fetch({
        path: `products/search/${name}`,
        signal,
      });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Products doesn't exists, ${error.message}`);
      } else throw new Error('An unknown error occurred during fetching data.');
    }
  }

  async getProductsByCategory(category: string, page: string = '1'): Promise<IProductsResponse> {
    const controller = new AbortController();
    const signal = controller.signal;
    const queryParams = `?page=${page}`;
    try {
      const response: IProductsResponse = await this.fetch({
        path: `products/category/${category}${queryParams}`,
        signal,
      });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Products doesn't exists, ${error.message}`);
      } else throw new Error('An unknown error occurred during fetching data.');
    }
  }

  async removeProduct(id: string): Promise<IProductResponse> {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response: IProductResponse = await this.fetch({
        path: `products/${id}`,
        method: 'DELETE',
        signal,
      });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`PCan't remove product, ${error.message}`);
      } else throw new Error('An unknown error occurred during fetching data.');
    }
  }
}

export default new ProductsApi(url!);
