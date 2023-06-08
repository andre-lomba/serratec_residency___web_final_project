import { useContext } from "react";
import { TokenContext } from "./context/TokenContext";

function Login() {
  const { token, setContext } = useContext(TokenContext);
  return <></>;
}

export default Login;
