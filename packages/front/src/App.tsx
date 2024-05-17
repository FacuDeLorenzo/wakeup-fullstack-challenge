import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Products from "./pages/Products";
import { CurrentOrderProvider } from "./components/app/contexts/useCurrentOrderProvider";
import Restaurants from "./pages/Restaurant";

const App = () => {
  const routes = [
    <Route path="/" element={<Restaurants />} />,
    <Route path="/:restaurant/products/" element={<Products />} />,
  ];
  const router2 = createBrowserRouter(createRoutesFromElements(routes));

  return (
    <CurrentOrderProvider>
      <RouterProvider router={router2} />
    </CurrentOrderProvider>
  );
};

export default App;
