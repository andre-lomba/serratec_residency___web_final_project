import { useContext } from "react";
import { TokenContext } from "./context/TokenContext";
import { useNavigate } from "react-router-dom";

function Produto() {
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/");
  }, []);
  return <></>;
}

export default Produto;
