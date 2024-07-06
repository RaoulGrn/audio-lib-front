import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import GlobalStyles from "./styles/GlobalStyles";
import PublicPage from "./pages/PublicPage";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthContextProvider } from "./utils/AuthContext";

const router = createBrowserRouter([
  {
    element: (
      <AuthContextProvider>
        <AppLayout />
      </AuthContextProvider>
    ),
    children: [
      { path: "/public", element: <PublicPage /> },
      {
        element: <PrivateRoute />,
        children: [{ path: "/", element: <Home /> }],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <GlobalStyles />
    </>
  );
}

export default App;
