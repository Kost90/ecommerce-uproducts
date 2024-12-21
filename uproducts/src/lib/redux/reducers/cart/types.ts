export interface CartItem {
  productId: string;
  productName: string;
  priceInCents: number;
  quantity: number;
  picture: string;
}

export interface CartState {
  items: Record<string, CartItem>;
  totalQuantity: number;
  totalPrice: number;
  discountInCents?: number;
  taxInCents?: number;
}
