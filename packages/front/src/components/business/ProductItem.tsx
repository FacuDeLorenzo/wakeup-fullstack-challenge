import styled from "@mui/material/styles/styled";
import MuiCard from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { OrderProduct } from "../app/hooks/useCreateOrder";
import { Product } from "../app/hooks/useGetProducts";

export interface IProductItem {
  product: Product;
  onAmountChange(product: OrderProduct): void;
}

const ProductItem = ({ product, onAmountChange }: IProductItem) => {
  const [amount, setAmount] = useState(0);
  const [touched, setTouched] = useState(false);
  const onAdd = () => {
    setTouched(true);
    setAmount((prev) => prev + 1);
  };
  const onRemove = () => {
    setAmount((prev) => prev - 1);
  };

  useEffect(() => {
    if (!amount && !touched) return;
    touched && onAmountChange({ product, amount });
  }, [amount]);

  return (
    <Card>
      <RemoveButton disabled={amount <= 0} onClick={onRemove}>
        -
      </RemoveButton>
      <Description>
        <Typography>{product.name}</Typography>
        <Typography variant="h6">$ {product.price}</Typography>
      </Description>
      {!!amount && <Amount>{amount}x</Amount>}
      <AddButton onClick={onAdd}>+</AddButton>
    </Card>
  );
};

export default ProductItem;
const Amount = styled("div")({
  alignSelf: "center",
});

const RemoveButton = styled(Button)({
  borderRadius: "30% 0% 0% 30% / 50% 50% 50% 50%",
  minWidth: "32px",
  backgroundImage:
    "linear-gradient(to right, rgba(255, 50, 20, 0.7), rgba(255, 50, 20, 0.2),  rgba(255, 255, 255, 0))",
});
const AddButton = styled(Button)({
  borderRadius: "0% 30% 30% 0% / 50% 50% 50% 50%",
  backgroundImage:
    "linear-gradient(to left, rgba(168, 235, 18, 0.7), rgba(168, 235, 18, 0.2), rgba(255, 255, 255, 0))",
  minWidth: "32px",
});

const Card = styled(MuiCard)({
  boxShadow: "0px 0px 1px -1px rgba(0,0,0,0.2)",
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
  marginBottom: "8px",
  // height: "74px",
  height: "120px",
});

const Description = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  flexGrow: 1,
});
