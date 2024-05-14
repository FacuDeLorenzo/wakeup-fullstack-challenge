import styled from "styled-components";
import useGetProducts from "./components/app/hooks/useGetProducts";

const App = () => {
  const products = useGetProducts();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Title>This is a title</Title>
      <div>{products.length > 0 && "hay productitos jeje"}</div>
      <img height={600} />
    </div>
  );
};

export default App;

const Title = styled.a`
  font-size: 2rem;
`;
