import { Route, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [{ path: "/", element: <Home /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
