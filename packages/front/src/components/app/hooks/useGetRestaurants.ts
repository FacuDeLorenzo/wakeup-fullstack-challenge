import axios from "axios";
import { useEffect, useState } from "react";
import { Restaurant } from "../../../pages/Restaurant";

export interface Product {
  id: number;
  name: string;
  price: number;
}

const useGetRestaurants = () => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const callAxios = () => {
    if (isFetching) return;
    setIsFetching(true);

    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/restaurants`, { signal })
      .then((resp) => {
        if (!signal.aborted) if (resp.data) setRestaurants(resp.data);
      })
      .catch((err) => {
        if (!signal.aborted) console.error(err);
      });
  };

  useEffect(() => {
    callAxios();
    return () => {
      // Cancel the request when the component unmounts
      abortController.abort();
    };
  }, []);

  return { restaurants, isFetching };
};

export default useGetRestaurants;
