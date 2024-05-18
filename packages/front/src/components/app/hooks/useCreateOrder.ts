import { Product } from "./useGetProducts";
import { useCurrentOrderContext } from "../contexts/currentOrder/useCurrentOrderContext";
import axios from "axios";

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
  const { orderProducts, setOrderProducts, totalPrice, setTotalPrice } =
    useCurrentOrderContext();

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
      axios
        .post(
          `${process.env.REACT_APP_API_ENDPOINT}/createOrder`,
          {
            products: orderProducts,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: false,
          }
        )
        .then((resp) => {
          if (resp.data) setTotalPrice(resp.data.totalPrice);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  const resetFlow = () => {
    setOrderProducts([]);
    setTotalPrice(0);
  };

  return { alterProduct, createOrder, orderProducts, resetFlow, totalPrice };
};

export default useCreateOrder;
