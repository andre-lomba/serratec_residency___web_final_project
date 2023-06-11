import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Body from "../components/Principal/Body";
import { DivMain } from "../components/BaseComponents/Div";
import { COLORS } from "../components/BaseComponents/Color";
import api from "../api/api";
import { ProdutosContext } from "../context/ProdutosContext";

function Home() {
  const navigate = useNavigate();
  const { produtos, setProdutos } = useContext(ProdutosContext);
  const [loading, setLoading] = useState(true);
  const user = localStorage.getItem("user");
  const search = localStorage.getItem("search");

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (search) {
      setProdutos(JSON.parse(search));
      localStorage.removeItem("search");
      setLoading(false);
    } else {
      getLivros();
    }
  }, [navigate]);

  const getLivros = async () => {
    try {
      const response = await api.get("/produtos");
      setProdutos(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loading === false) console.log(produtos);
  }, [produtos]);

  if (loading) {
    return <div></div>;
  } else {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: `${COLORS.background}`,
        }}
      >
        <Header currentPage={"/home"} />
        <Body />
      </div>
    );
  }
}

export default Home;
