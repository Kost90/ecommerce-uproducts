import { API } from '@/api/Api';
import { Product } from '@/constans/typeconstans';

const url = 'http://localhost:3001';

// TODO:Make type of returns
class ProductsApi extends API {
  constructor(baseurl: string) {
    super(baseurl);
  }

  async AddProduct(product: Product) {
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

  async getProducts(page?: string) {
    const controller = new AbortController();
    const signal = controller.signal;
    let queryParams = `?page=${page}`;
    try {
      const response = await this.fetch({
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

  async updateProduct(data: Product) {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await this.fetch({
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

  async searchProducts(name: string) {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await this.fetch({
        path: `products/search/${name}`,
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
