export type Product = {
  id?: string;
  name: string;
  imagePath?: string | File;
  imageKey?: string;
  description: string;
  priceInCents: number;
  categories: string;
  total?: number;
};

export interface IProductsResponse {
  status: number;
  data: {
    products: Product[];
    total: number;
  };
  message: string;
  error?: {
    statusCode: number;
    message: string;
    type: string;
  };
}
