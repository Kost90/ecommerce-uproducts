import { API } from "../Api";
import { Product } from "@/constans/typeconstans";

const url = "http://localhost:3001";

// TODO: Create Intarface for param for AddProduct function

class ProductsApi extends API {
  constructor(baseurl: string) {
    super(baseurl);
  }

  async AddProduct(product: any) {
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
    } catch (error) {
      throw new Error(`Cant POST ${error}`);
    }
  }

  async getProducts() {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await this.fetch({ path: "products", signal });
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch data, ${error}`);
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
      throw new Error(`Failed to fetch single product, ${error}`);
    }
  }

  async updateProduct(data: Product) {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await this.fetch({
        path: "products/update",
        method: "PUT",
        body: JSON.stringify(data),
        signal,
      });
      return response;
    } catch (error) {
      throw new Error(`Can't update single product, ${error}`);
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
      throw new Error(`Can't remove product, ${error}`);
    }
  }
}

export default new ProductsApi(url);
