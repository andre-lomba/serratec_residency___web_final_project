import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./context/UserContext.jsx";
import { ProdutosProvider } from "./context/ProdutosContext.jsx";
import { CarrinhoProvider } from "./context/CarrinhoContext.jsx";
import { PesquisaProvider } from "./context/PesquisaContext.jsx";
import { ClickProvider } from "./context/ClickContext.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Carrinho from "./pages/Carrinho.jsx";
import PedidoFeito from "./pages/PedidoFeito.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProdutoPage from "./pages/ProdutoPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>404 PÁGINA NÃO ENCONTRADA</h1>,
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
    path: "/register",
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
    element: <ProdutoPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <ClickProvider>
        <ProdutosProvider>
          <PesquisaProvider>
            <CarrinhoProvider>
              <RouterProvider router={router} />
            </CarrinhoProvider>
          </PesquisaProvider>
        </ProdutosProvider>
      </ClickProvider>
    </UserProvider>
  </React.StrictMode>
);
