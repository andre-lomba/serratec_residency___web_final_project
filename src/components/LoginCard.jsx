import { ButtonLogCad } from "./Buttons/ButtonLogCad";
import { useContext, useEffect, useState } from "react";
import { Input, Label, DivInterna, A } from "./Input+Label/InputLabel";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Col, Row } from "antd";
import { COLORS } from "./BaseComponents/Color";

const LoginCard = () => {
  const [typePass, setTypePass] = useState("password");
  const [eye, setEye] = useState("fa fa-eye-slash");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState(" ");
  const [msgColor, setMsgColor] = useState("");
  const navigate = useNavigate();

  const changeEye = () => {
    setEye(eye === "fa fa-eye" ? "fa fa-eye-slash" : "fa fa-eye");
    setTypePass(typePass === "password" ? "text" : "password");
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeSenha = (e) => {
    setSenha(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      const response = await api.post("/login", {
        email: email,
        password: senha,
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      setMsgColor("green");
      setMensagem("Login efetuado!");

      const timer = setTimeout(() => {
        navigate("/");
      }, 1000);
      return () => clearTimeout(timer);
    } catch (error) {
      setMsgColor("red");
      setMensagem("Login inválido!");
    }
  };

  const estiloMsg = {
    fontFamily: "Alef",
    fontSize: "medium",
    color: `${msgColor}`,
    textAlign: "center",
  };

  const estiloOlho = {
    cursor: "pointer",
  };

  const container = {
    backgroundColor: `${COLORS.offWhite}`,
    boxShadow: "19px 1px 15px -8px rgba(0, 0, 0, 0.25)",
    borderRadius: "20px",
    width: "20rem",
    height: "30rem",
  };

  const estiloBlocos = {
    paddingBlock: "1rem",
  };

  return (
    <Col span={24} style={container}>
      <Col style={{ padding: "2rem", height: "100%" }}>
        <Col span={24} style={estiloBlocos}>
          <Row justify={"center"} align={"middle"}>
            <Col span={24}>
              <h1 style={{ fontFamily: "Alatsi", textAlign: "center" }}>
                LOGIN
              </h1>
            </Col>
            <Col span={24}>
              <Col
                style={{
                  height: "1.5rem",
                  overflow: "hidden",
                }}
              >
                <h4
                  style={{
                    ...estiloMsg,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {mensagem}
                </h4>
              </Col>
            </Col>
          </Row>
        </Col>

        <Col span={24} style={estiloBlocos}>
          <Row gutter={16}>
            <Col span={24}>
              <Label>Email:</Label>
            </Col>
          </Row>
          <Row
            gutter={16}
            style={{ borderBottom: "1px solid black", marginBottom: "1rem" }}
          >
            <Col span={2}>
              <i className="fa fa-envelope"></i>
            </Col>
            <Col span={22}>
              <Input value={email} type={"text"} onChange={handleChangeEmail} />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Label>Senha:</Label>
            </Col>
          </Row>
          <Row gutter={16} style={{ borderBottom: "1px solid black" }}>
            <Col span={2}>
              <i className="fa fa-key"></i>
            </Col>
            <Col span={20}>
              <Input
                value={senha}
                type={typePass}
                onChange={handleChangeSenha}
              />
            </Col>
            <Col span={1}>
              <i style={estiloOlho} className={eye} onClick={changeEye}></i>
            </Col>
          </Row>
        </Col>

        <Col span={24} style={estiloBlocos}>
          <Row justify={"center"} align={"middle"}>
            <Col span={24}>
              <ButtonLogCad id={"entrar"} onClick={handleSubmit}>
                ENTRAR
              </ButtonLogCad>
            </Col>
            <Col
              span={24}
              style={{ display: "contents", alignContent: "center" }}
            >
              <h4 style={{ fontFamily: "Alatsi" }}>
                Não possui conta? <A href="/register">Cadastre-se.</A>
              </h4>
            </Col>
          </Row>
        </Col>
      </Col>
    </Col>
  );
};

export default LoginCard;
