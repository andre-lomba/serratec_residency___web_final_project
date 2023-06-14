import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { COLORS } from "../components/BaseComponents/Color";
import Header from "../components/Header/Header";
import BodyCarrinho from "../components/Principal/BodyCarrinho";
import Footer from "../components/Footer/Footer";

function Carrinho() {
  const navigate = useNavigate();
  const usuario = localStorage.getItem("user");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.removeItem("haPedido");
    if (!usuario) navigate("/");
    else setLoading(false);
  }, [navigate]);

  if (loading) {
    return <></>;
  } else
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
