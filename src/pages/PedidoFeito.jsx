import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../components/BaseComponents/Color";
import Header from "../components/Header/Header";

function PedidoFeito() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, []);
  return (
    <div
      style={{
        backgroundColor: `${COLORS.background}`,
        minHeight: "100vh",
        maxHeight: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <Header currentPage={"/overview"} />

      <Footer />
    </div>
  );
}

export default PedidoFeito;
