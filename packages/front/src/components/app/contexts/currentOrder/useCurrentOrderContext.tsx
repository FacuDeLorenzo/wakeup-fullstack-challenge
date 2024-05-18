import { createContext, useContext } from "react";
import { OrderProduct } from "../../hooks/useCreateOrder";

interface CurrentOrderContextType {
  orderProducts: OrderProduct[];
  setOrderProducts: React.Dispatch<React.SetStateAction<OrderProduct[]>>;
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}
export const CurrentOrderContext = createContext<CurrentOrderContextType>({
  orderProducts: [],
  setOrderProducts: () => {},
  totalPrice: 0,
  setTotalPrice: () => {},
} as CurrentOrderContextType);

export const useCurrentOrderContext = () => {
  return useContext(CurrentOrderContext);
};
