import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../components/BaseComponents/Color";
import Header from "../components/Header/Header";
import BodyCarrinho from "../components/Principal/BodyCarrinho";
import Footer from "../components/Footer/Footer";

function Carrinho() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, []);

  return (
    <div
      style={{
        backgroundColor: `${COLORS.background}`,
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        overflowX: "hidden",
      }}
    >
      <Header currentPage={"/checkout"} />
      <BodyCarrinho />
      <Footer />
    </div>
  );
}

export default Carrinho;
