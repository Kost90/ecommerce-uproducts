import { API } from '@/api/Api';
import { Product, IProductsResponse } from '@/constans/typeconstans';

const url = 'http://localhost:3001';

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
        cache: 'no-store',
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch data, ${error}`);
    }
  }

  async getSingleProduct(id: string): Promise<Product> {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response: Promise<Product> = await this.fetch({
        path: `products/edit/${id}`,
        signal,
        cache: 'no-cache',
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

  async searchProducts(name: string): Promise<Product | Product[]> {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response: Product | Product[] = await this.fetch({
        path: `products/search/${name}`,
        cache: 'no-store',
        signal,
      });
      return response;
    } catch (error) {
      throw new Error(`Products doesn't exists, ${error}`);
    }
  }

  async getProductsByCategory(category: string, page: string): Promise<IProductsResponse> {
    const controller = new AbortController();
    const signal = controller.signal;
    const queryParams = `?page=${page}`;
    try {
      const response: IProductsResponse = await this.fetch({
        path: `products/${category}${queryParams}`,
        cache: 'no-store',
        signal,
      });
      return response;
    } catch (error) {
      throw new Error(`Products doesn't exists, ${error}`);
    }
  }

  async removeProduct(id: string) {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await this.fetch({
        path: `products/${id}`,
        method: 'DELETE',
        signal,
      });
      return response;
    } catch (error) {
      throw new Error(`Can't remove product, ${error}`);
    }
  }
}

export default new ProductsApi(url);
