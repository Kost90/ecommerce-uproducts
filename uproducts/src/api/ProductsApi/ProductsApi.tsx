import { API } from "../Api";

const url = "http://localhost:3001";

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
}

export default new ProductsApi(url);
