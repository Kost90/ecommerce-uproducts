import { API } from "../Api";
import { Product } from "@/constans/typeconstans";

const url = "http://localhost:3001";

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
        method: "POST",
        body: JSON.stringify(product),
      });
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to add product ${error.message}`);
      }
      throw new Error(`Unexpected error in AddProduct method: ${error}`);
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
        // cache: "no-store",
      });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get products ${error.message}`);
      }
      throw new Error(`Unexpected error in getProducts method: ${error}`);
    }
  }

  async getSingleProduct(id: string) {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await this.fetch({
        path: `products/edit/${id}`,
        signal,
      });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get single product ${error.message}`);
      }
      throw new Error(`Unexpected error in getSingleProduct method: ${error}`);
    }
  }

  async updateProduct(data: Product) {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await this.fetch({
        path: "products/update",
        method: "PATCH",
        body: JSON.stringify(data),
        signal,
      });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update product ${error.message}`);
      }
      throw new Error(`Unexpected error in updateProduct method: ${error}`);
    }
  }

  async searchProducts(name: string) {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await this.fetch({
        path: `products/search/${name}`,
        cache: "no-store",
        signal,
      });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to search products ${error.message}`);
      }
      throw new Error(`Unexpected error in searchProducts method: ${error}`);
    }
  }

  async removeProduct(id: string) {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await this.fetch({
        path: `products/${id}`,
        method: "DELETE",
        signal,
      });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to remove products ${error.message}`);
      }
      throw new Error(`Unexpected error in removeProduct method: ${error}`);
    }
  }
}

export default new ProductsApi(url);
