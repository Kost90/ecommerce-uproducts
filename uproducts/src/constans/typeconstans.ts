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
  products: Product[];
  total: number;
}
