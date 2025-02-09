import { API } from '@/api/Api';
import { IResponse } from '@/types/typeconstans';
import { Product, IProductsResponse } from '@/types/productTypes';

const url = process.env.NEXT_PUBLIC_URL;

class ProductsApi extends API {
  constructor(baseurl: string) {
    super(baseurl);
  }

  async AddProduct(product: Product): Promise<IResponse<Product>> {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response: IResponse<Product> = await this.fetch({
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
      throw new Error(`Failed to fetch data ${error}`);
    }
  }

  async getSingleProduct(id: string): Promise<IResponse<Product>> {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response: Promise<IResponse<Product>> = await this.fetch({
        path: `products/edit/${id}`,
        signal,
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch single product, ${error}`);
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
      throw new Error(`Can't update single product, ${error}`);
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
      throw new Error(`Failed to search products, ${error}`);
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
      throw new Error(`Failed to fetch products by category, ${error}`);
    }
  }

  async removeProduct(id: string): Promise<IResponse<Product>> {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response: IResponse<Product> = await this.fetch({
        path: `products/${id}`,
        method: 'DELETE',
        signal,
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to remove product, ${error}`);
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProductsApi(url!);
