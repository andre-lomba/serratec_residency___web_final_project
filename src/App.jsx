import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { useNavigate } from "react-router-dom";

function App() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) navigate("/home");
      else navigate("/login");
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  return <></>;
}

export default App;
