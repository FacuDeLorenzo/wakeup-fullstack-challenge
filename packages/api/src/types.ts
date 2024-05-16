export interface CreateOrderRequest {
    products: Product[];
  }
  
  export interface Product {
    name: string;
    price: number;
  }
  
  export interface Order {
    products: Product[];
    totalPrice: number;
  }