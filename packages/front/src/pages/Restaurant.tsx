import RestaurantItem from "../components/business/RestaurantItem";
import styled from "@mui/material/styles/styled";
import MuiPaper from "@mui/material/Paper";
import useGetRestaurants from "../components/app/hooks/useGetRestaurants";
import Loading from "../components/styled/Loading";
import { Waypoint } from "react-waypoint";
import { LinearProgress } from "@mui/material";

export interface Restaurant {
  id: number;
  name: string;
}

const Restaurants = () => {
  const { restaurants, isFetching, hasMore, fetchNextPage } = useGetRestaurants(
    { limit: 5 }
  );

  return (
    <Body>
      <Paper>
        <Title>Choose your restaurant</Title>
        <RestaurantsContainer>
          {restaurants.length === 0 && isFetching && <Loading />}
          {restaurants.length > 0 &&
            restaurants.map((restaurant) => (
              <RestaurantItem
                key={`restaurant-${restaurant.id}`}
                restaurant={restaurant}
              />
            ))}
          {hasMore && (
            <Waypoint
              onEnter={() => !isFetching && fetchNextPage()}
              bottomOffset={"-30%"}
            >
              <StyledProgress>
                <LinearProgress
                  variant="buffer"
                  value={0}
                  valueBuffer={0}
                  title="Cargando"
                />
              </StyledProgress>
            </Waypoint>
          )}
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

const StyledProgress = styled("div")({
  width: 60,
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: "16px",
  marginTop: "16px",
});
