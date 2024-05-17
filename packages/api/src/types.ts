export interface CreateOrderRequest {
  products: Product[];
}
export interface OrderProduct {
  product: Product;
  amount: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface Order {
  products: Product[];
  totalPrice: number;
}

export interface Restaurant {
  id: number;
  name: string;
}
