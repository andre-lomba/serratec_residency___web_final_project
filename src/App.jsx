import { useContext, useEffect } from "react";
import { TokenContext } from "./context/TokenContext";
import { useNavigate } from "react-router-dom";

function App() {
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (token) navigate("/home");
      else navigate("/login");
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  return <></>;
}

export default App;
