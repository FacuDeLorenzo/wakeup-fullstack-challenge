import axios from "axios";
import { useEffect, useState } from "react";
import { Restaurant } from "../../../pages/Restaurant";

export interface IUseGetRestaurants {
  limit: number;
}
const useGetRestaurants = ({ limit }: IUseGetRestaurants) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const callAxios = () => {
    if (isFetching) return;
    setIsFetching(true);

    axios
      .get(
        `${process.env.REACT_APP_API_ENDPOINT}/restaurants?limit=${limit}&offset=${offset}`
      )
      .then((resp) => {
        if (resp.data) {
          setOffset((value) => value + limit);
          setHasMore(resp.data.hasMore);
          setRestaurants((value) => [...value, ...resp.data.restaurants]);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const fetchNextPage = () => {
    callAxios();
  };

  useEffect(() => {
    callAxios();
  }, []);

  return { restaurants, hasMore, fetchNextPage, isFetching };
};

export default useGetRestaurants;
