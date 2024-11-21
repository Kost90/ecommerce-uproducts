export interface CartItem {
  productId: string;
  productName: string;
  priceInCents: number;
  quantity: number;
}

export interface CartState {
  items: Record<string, CartItem>;
  totalQuantity: number;
  totalPriceInCents: number;
  discountInCents?: number;
  taxInCents?: number;
}
