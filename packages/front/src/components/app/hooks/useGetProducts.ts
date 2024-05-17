import axios from "axios";
import { useEffect, useState } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface IUseGetProducts {
  restaurantId: number;
  limit: number;
}
const useGetProducts = ({ restaurantId, limit }: IUseGetProducts) => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  const [products, setProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const callAxios = (offsetCall: number) => {
    if (isFetching) return;
    setIsFetching(true);
    axios
      .get(
        `${process.env.REACT_APP_API_ENDPOINT}/products?limit=${limit}&offset=${offsetCall}&restaurantId=${restaurantId}`,
        { signal }
      )
      .then((resp) => {
        if (!signal.aborted)
          if (resp.data) {
            setOffset((value) => value + limit);
            setHasMore(resp.data.hasMore);
            setProducts((value) => [...value, ...resp.data.products]);
          }
      })
      .catch((err) => {
        if (!signal.aborted) console.error(err);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };
  const fetchNextPage = () => {
    console.log(" no es por esto");
    callAxios(offset);
  };

  useEffect(() => {
    callAxios(offset);
    return () => {
      // Cancel the request when the component unmounts
      abortController.abort();
    };
  }, []);

  return { products, hasMore, fetchNextPage, isFetching };
};

export default useGetProducts;
