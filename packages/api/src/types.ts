export interface CreateOrderRequest {
  restaurantId: number;
  products: OrderProduct[];
}

export interface FinishOrderRequest {
  orderId: string;
  restaurantId: number;
}

export interface OrderProduct {
  product: ProductDTO;
  amount: number;
}

export interface ProductDTO {
  id: number;
  name: string;
  price: number;
}

export interface OrderDTO {
  id: string;
  products: OrderProduct[];
  totalPrice: number;
}

export interface Restaurant {
  id: number;
  name: string;
}

//DB Types
export interface Order {
  totalPrice: number;
  orderStatus: string;
  products: OrderProduct[];
  orderId: string;
  restaurantId: number;
}

export interface Product {
  restaurantId: number;
  productId: number;
  name: string;
  price: number;
}
