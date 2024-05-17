import { Product } from "./useGetProducts";
import { useCurrentOrderContext } from "../contexts/useCurrentOrderContext";

export interface Order {
  products: OrderProduct[];
  totalPrice: number;
}
export interface OrderProduct {
  product: Product;
  amount: number;
}
export interface CreateOrderRequest {
  products: OrderProduct[];
}

const useCreateOrder = () => {
  const { orderProducts, setOrderProducts } = useCurrentOrderContext();

  const alterProduct = ({ product, amount }: OrderProduct) => {
    let productToAdd: OrderProduct | undefined = undefined;
    if (amount !== 0) productToAdd = { product, amount };
    setOrderProducts((value) => [
      ...value
        .filter((x) => x.product.id !== product.id)
        .concat(productToAdd ? [productToAdd] : []),
    ]);
  };
  const createOrder = () => {
    if (orderProducts.length > 0) {
      console.log("order products: ", orderProducts);
      //Execute create order
    }
  };
  const resetFlow = () => {
    setOrderProducts([]);
  };

  return { alterProduct, createOrder, orderProducts, resetFlow };
};

export default useCreateOrder;
