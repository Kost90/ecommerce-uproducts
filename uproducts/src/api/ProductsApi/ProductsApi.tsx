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
      if (!response.ok) {
        throw new Error("Cant POST");
      }
      return response;
    } catch (error) {
      return console.error(error);
    }
  }

  async getProducts() {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await this.fetch({ path: "products", signal });
      if (!response.ok) {
        throw new Error("Cant fetch Products");
      }
      return response;
    } catch (error) {
      return console.error(error);
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
      return console.error(error);
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
      return console.error("Can't update single product");
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
      if (!response.ok) {
        throw new Error("Cant DELETE");
      }
      return response;
    } catch (error) {
      return console.error(error);
    }
  }
}

export default new ProductsApi(url);
