import axios from "axios";
import { useEffect, useState } from "react";

export interface Product {
  name: string;
  price: number;
}

const useGetProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/products").then((resp) => {
      if (resp.data) setProducts(resp.data);
    });
  }, []);
  return products;
};

export default useGetProducts;
