import { createContext, useContext } from "react";
import { OrderProduct } from "../hooks/useCreateOrder";

interface CurrentOrderContextType {
  orderProducts: OrderProduct[];
  setOrderProducts: React.Dispatch<React.SetStateAction<OrderProduct[]>>;
}
export const CurrentOrderContext = createContext<CurrentOrderContextType>({
  orderProducts: [],
  setOrderProducts: () => {},
} as CurrentOrderContextType);

export const useCurrentOrderContext = () => {
  return useContext(CurrentOrderContext);
};
