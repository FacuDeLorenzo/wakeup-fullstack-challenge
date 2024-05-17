import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => (
  <div
    style={{
      display: "flex",
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <CircularProgress />
  </div>
);

export default Loading;
