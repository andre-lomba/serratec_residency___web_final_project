import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../components/BaseComponents/Color";
import Header from "../components/Header/Header";
import produtoStyle from "../components/Principal/produtoStyle";

function ProdutoPage() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const search = localStorage.getItem("search");
    //if (!user) {
    //   navigate("/");
    //  }
  }, []);
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: `${COLORS.background}`,
      }}
    >
      {/* <Header currentPage={"/product/:id"} /> */}
      <produtoStyle />
    </div>
  );
}

export default ProdutoPage;