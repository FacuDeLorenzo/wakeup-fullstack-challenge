import styled from "@mui/material/styles/styled";
import useGetProducts from "../components/app/hooks/useGetProducts";
import ProductItem from "../components/business/ProductItem";
import MuiPaper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import useCreateOrder from "../components/app/hooks/useCreateOrder";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { Waypoint } from "react-waypoint";
import Loading from "../components/styled/Loading";

const Products = () => {
  let params = useParams();
  const restaurantId = Number(params.restaurant);
  const { products, hasMore, fetchNextPage, isFetching } = useGetProducts({
    restaurantId,
    limit: 7,
  });
  const navigate = useNavigate();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const { alterProduct, createOrder, orderProducts, resetFlow, totalPrice } =
    useCreateOrder();

  const onCreateOrder = () => {
    createOrder({ restaurantId });
    setIsSuccessModalOpen(true);
  };

  return (
    <Body>
      <Paper>
        <Topbar>
          <Title>Make your order</Title>
        </Topbar>
        <ProductsContainer>
          {products.length === 0 && <Loading />}
          {products.length > 0 &&
            products.map((product) => (
              <ProductItem
                key={`product-${product.id}`}
                product={product}
                onAmountChange={alterProduct}
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
        </ProductsContainer>
        <CreateOrderButton
          variant="contained"
          disabled={orderProducts.length === 0}
          onClick={onCreateOrder}
        >
          Create order
        </CreateOrderButton>
        <SuccessModal
          totalPrice={totalPrice}
          onSuccessClick={() => {
            navigate(0);
          }}
          open={isSuccessModalOpen}
        />
      </Paper>
    </Body>
  );
};
export default Products;

interface ISuccessModal {
  totalPrice: number;
  open: boolean;
  onSuccessClick(): void;
}
const SuccessModal = ({ totalPrice, open, onSuccessClick }: ISuccessModal) => {
  return (
    <Modal open={open}>
      <Paper>
        <ModalBody>
          {!totalPrice && <Loading />}
          {!!totalPrice && (
            <>
              <Typography style={{ marginBottom: "16px" }}>
                The order was successfully placed!
              </Typography>
              <Typography style={{ marginBottom: "16px" }}>
                Total price is ${totalPrice}
              </Typography>
              <Button variant="contained" onClick={onSuccessClick}>
                Cool!
              </Button>
            </>
          )}
        </ModalBody>
      </Paper>
    </Modal>
  );
};

const Topbar = styled("div")({
  display: "flex",
  flexDirection: "row",
  marginBottom: "1rem",
  justifyContent: "center",
});

const StyledProgress = styled("div")({
  width: 60,
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: "16px",
  marginTop: "16px",
});

const ModalBody = styled("div")({
  textAlign: "center",
});

const Title = styled("a")({
  top: 0,
  position: "sticky",
  fontSize: "2rem",
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
const ProductsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
});

const CreateOrderButton = styled(Button)({
  bottom: 0,
  position: "sticky",
  height: "64px",
});
