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
      setLoading(false);
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

  if (loading) {
    return <div></div>;
  } else {
    return (
      <div
        style={{
          backgroundColor: `${COLORS.background}`,
          minHeight: "100vh",
          maxHeight: "100%",
          width: "100%",
          display: "flex",
        }}
      >
        <div
          style={{
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Header currentPage={"/home"} />
          <Body />
        </div>
      </div>
    );
  }
}

export default Home;
