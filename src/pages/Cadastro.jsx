import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logos/Logo";
import { DivMain, DivBlock } from "../components/BaseComponents/Div";
import { BACKGROUND_IMAGES } from "../components/BaseComponents/Color";
import RegisterCard from "../components/RegisterCard";
import { Col } from "antd";

function Cadastro() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.email) navigate("/");
  }, []);
  return (
    <DivMain background_image={BACKGROUND_IMAGES.imagemLoginCad}>
      <Col>
        <img src={Logo} alt="logomarca" />
        <h1 style={{ fontFamily: "Alatsi" }}>SUMMARKET</h1>
      </Col>
      <Col>
        <RegisterCard />
      </Col>
    </DivMain>
  );
}

export default Cadastro;
