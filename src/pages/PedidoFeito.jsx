import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { COLORS } from "../components/BaseComponents/Color";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import BodyPedidoFeito from "../components/Principal/BodyPedidoFeito";
import api from "../api/api";

function PedidoFeito() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const user = localStorage.getItem("user");
  const haPedido = JSON.parse(localStorage.getItem("haPedido"));
  const [pedido, setPedido] = useState(false);

  useEffect(() => {
    if (!user || !haPedido || parseInt(haPedido) !== parseInt(id))
      navigate("/");
    else {
      getPedido();
      setLoading(false);
    }
  }, [navigate]);

  const getPedido = async () => {
    try {
      const response = await api.get(`/pedidos/${id}`);
      setPedido(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading || !pedido) return <></>;
  else
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
        <Header currentPage={"/overview"} />
        <BodyPedidoFeito pedido={pedido} />
        <Footer />
      </div>
    );
}

export default PedidoFeito;
