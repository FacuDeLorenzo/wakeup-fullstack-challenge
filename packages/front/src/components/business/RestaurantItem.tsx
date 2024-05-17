import styled from "@mui/material/styles/styled";
import MuiCard from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Restaurant } from "../../pages/Restaurant";

export interface IRestaurantItem {
  restaurant: Restaurant;
}

const RestaurantItem = ({ restaurant }: IRestaurantItem) => {
  return (
    <Link to={`/${restaurant.id}/products`} style={{ textDecoration: "none" }}>
      <Card>
        <Typography>{restaurant.name}</Typography>
      </Card>
    </Link>
  );
};

export default RestaurantItem;

const Card = styled(MuiCard)({
  alignItems:"center",
  justifyContent:"center",
  boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2)",
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
  marginBottom: "8px",
  height: "240px",
});
