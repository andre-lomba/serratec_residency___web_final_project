import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { TokenProvider } from "./context/TokenContext.jsx";
import { ProdutoProvider } from "./context/ProdutoContext.jsx";
import { CarrinhoProvider } from "./context/CarrinhoContext.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Carrinho from "./pages/Carrinho.jsx";
import PedidoFeito from "./pages/PedidoFeito.jsx";
import Produto from "./pages/Produto.jsx";
import { RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create",
    element: <Cadastro />,
  },
  {
    path: "/checkout",
    element: <Carrinho />,
  },
  {
    path: "/overview",
    element: <PedidoFeito />,
  },
  {
    path: "/product/:id",
    element: <Produto />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TokenProvider>
      <ProdutoProvider>
        <CarrinhoProvider>
          <RouterProvider router={router} />
        </CarrinhoProvider>
      </ProdutoProvider>
    </TokenProvider>
  </React.StrictMode>
);
