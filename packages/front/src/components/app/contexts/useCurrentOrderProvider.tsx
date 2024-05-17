import { ReactNode, useState } from "react";
import { CurrentOrderContext } from "./useCurrentOrderContext";
import { OrderProduct } from "../hooks/useCreateOrder";

export interface ICurrentOrderProvider {
  children: ReactNode;
}

export const CurrentOrderProvider = ({ children }: ICurrentOrderProvider) => {
  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([]);

  return (
    <CurrentOrderContext.Provider value={{ orderProducts, setOrderProducts }}>
      {children}
    </CurrentOrderContext.Provider>
  );
};
