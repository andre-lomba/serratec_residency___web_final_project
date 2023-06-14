import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DivMain, DivBlock } from "./components/BaseComponents/Div";
import { Logo, Spin } from "./components/Logos/Logo";
import { BACKGROUND_IMAGES } from "./components/BaseComponents/Color";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("haPedido");
    const timer = setTimeout(() => {
      const user = localStorage.getItem("user");
      if (user) navigate("/home");
      else navigate("/login");
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <DivMain background_image={BACKGROUND_IMAGES.imagemApp}>
      <DivBlock>
        <Spin>
          <img src={Logo} alt="logomarca" />
        </Spin>
        <h1 style={{ fontFamily: "Alatsi" }}>SUMMARKET</h1>
        <h3 style={{ fontFamily: "Alatsi" }}>
          Faça chuva ou faça sol, nós somamos à sua leitura!
        </h3>
      </DivBlock>
    </DivMain>
  );
}

export default App;
