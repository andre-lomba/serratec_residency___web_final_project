import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../components/BaseComponents/Color";
import Header from "../components/Header/Header";

function Carrinho() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, []);
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: `${COLORS.background}`,
      }}
    >
      <Header currentPage={"/checkout"} />
    </div>
  );
}

export default Carrinho;
