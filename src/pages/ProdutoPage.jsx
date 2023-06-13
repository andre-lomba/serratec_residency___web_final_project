import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { COLORS } from "../components/BaseComponents/Color";
import Header from "../components/Header/Header";
import BodyProduto from "../components/Principal/BodyProduto";
import api from "../api/api";
import { ProdutoContext } from "../context/ProdutoContext";

function ProdutoPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { produto, setProduto } = useContext(ProdutoContext);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
    } else {
      getLivro();
    }
  }, []);

  const getLivro = async () => {
    try {
      const response = await api.get(`/produtos/${id}`);
      if (response.data.quantidade === 0) {
        navigate("/home");
      }
      setProduto(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        backgroundColor: `${COLORS.background}`,
        minHeight: "100vh",
        maxHeight: "100%",
        width: "100%",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Header currentPage={"/product/:id"} />
      <BodyProduto />
    </div>
  );
}

export default ProdutoPage;
