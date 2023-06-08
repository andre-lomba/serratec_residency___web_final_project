import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, []);
  return <></>;
}

export default Home;
