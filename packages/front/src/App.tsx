import styled from "styled-components";

const App = () => {
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
      <img height={600}/>
    </div>
  );
};

export default App;

const Title = styled.a`
  font-size: 2rem;
`;
