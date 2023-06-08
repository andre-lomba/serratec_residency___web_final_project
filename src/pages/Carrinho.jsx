import { useContext } from "react";
import { TokenContext } from "./context/TokenContext";

function Carrinho() {
  const { token, setToken } = useContext(TokenContext);
  return <></>;
}

export default Carrinho;
