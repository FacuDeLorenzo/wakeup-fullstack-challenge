import axios from "axios";
import { useEffect, useState } from "react";
import RestaurantItem from "../components/business/RestaurantItem";
import styled from "@mui/material/styles/styled";
import MuiPaper from "@mui/material/Paper";
import useGetRestaurants from "../components/app/hooks/useGetRestaurants";

export interface Restaurant {
  id: number;
  name: string;
}

const Restaurants = () => {
  const {restaurants, isFetching} = useGetRestaurants();

  return (
    <Body>
      <Paper>
        <Title>Choose your restaurant</Title>
        <RestaurantsContainer>
          {restaurants.length === 0 && <div> Loading restaurants :)</div>}
          {restaurants.length > 0 &&
            restaurants.map((restaurant) => (
              <RestaurantItem
                key={`restaurant-${restaurant.id}`}
                restaurant={restaurant}
              />
            ))}
        </RestaurantsContainer>
      </Paper>
    </Body>
  );
};
export default Restaurants;

const Title = styled("a")({
  top: 0,
  position: "sticky",
  fontSize: "2rem",
  marginBottom: "1rem",
  textAlign: "center",
  backgroundColor: "#FFFFFF",
});
const Body = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minHeight: "100vh",
  backgroundColor: "#EEEFF1",
  justifyContent: "start",
  alignItems: "center",
});
const Paper = styled(MuiPaper)({
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});
const RestaurantsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
});
