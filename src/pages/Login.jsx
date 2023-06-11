import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logos/Logo";
import { DivMain, DivBlock } from "../components/BaseComponents/Div";
import { BACKGROUND_IMAGES } from "../components/BaseComponents/Color";
import LoginCard from "../components/LoginCard";
import { Col } from "antd";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/");
  }, []);
  return (
    <DivMain background_image={BACKGROUND_IMAGES.imagemLoginCad}>
      <Col>
        <img src={Logo} alt="logomarca" />
        <h1 style={{ fontFamily: "Alatsi" }}>SUMMARKET</h1>
      </Col>
      <Col>
        <LoginCard />
      </Col>
    </DivMain>
  );
}

export default Login;
