import { useLocation, useRoutes } from "react-router-dom";
import Form from "./pages/Form";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { Container } from "@mui/material";

export default function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <Form />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/dashboard/:id",
      element: <Dashboard />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  const location = useLocation();

  if (!element) return null;
  return (
    <React.Fragment>
      {React.cloneElement(element, { key: location.pathname })}
    </React.Fragment>
  );
}
