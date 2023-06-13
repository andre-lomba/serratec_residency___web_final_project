import { ButtonLogCad } from "./Buttons/ButtonLogCad";
import { BACKGROUND_IMAGES, COLORS } from "./BaseComponents/Color";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Label, DivInterna } from "./Input+Label/InputLabel";
import { Col, Row } from "antd";
import { styled } from "styled-components";
import api from "../api/api";

const Erro = styled.h5`
  color: red;
  margin: inherit;
  margin-top: 2px;
  padding: 0px;
  font-family: "Alef";
  font-size: small;
`;

const RegisterCard = () => {
  const [mensagem, setMensagem] = useState(" ");
  const [msgColor, setMsgColor] = useState("");
  const [erroNome, setErroNome] = useState(" ");
  const [erroEmail, setErroEmail] = useState(" ");
  const [erroSenha, setErroSenha] = useState(" ");
  const [erroSenha2, setErroSenha2] = useState(" ");
  const [typePass1, setTypePass1] = useState("password");
  const [typePass2, setTypePass2] = useState("password");
  const [eye1, setEye1] = useState("fa fa-eye-slash");
  const [eye2, setEye2] = useState("fa fa-eye-slash");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  const navigate = useNavigate();

  const changeEye1 = () => {
    setEye1(eye1 === "fa fa-eye" ? "fa fa-eye-slash" : "fa fa-eye");
    setTypePass1(typePass1 === "password" ? "text" : "password");
  };

  const changeEye2 = () => {
    setEye2(eye2 === "fa fa-eye" ? "fa fa-eye-slash" : "fa fa-eye");
    setTypePass2(typePass2 === "password" ? "text" : "password");
  };

  const handleChangeNome = (e) => {
    let valor = e.target.value;
    if (valor.length < 4) {
      setErroNome("*Deve ter mais de 3 caracteres.");
    } else {
      setErroNome("");
    }
    setNome(valor);
  };

  const handleChangeEmail = (e) => {
    let valor = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(valor)) {
      setErroEmail("*Email inválido.");
    } else {
      setErroEmail("");
    }
    setEmail(valor);
  };

  const handleChangeSenha = (e) => {
    let valor = e.target.value;
    if (valor.length < 6) {
      setErroSenha("*Pelo menos 6 caracteres.");
    } else {
      setErroSenha("");
    }
    setSenha(valor);
  };

  const handleChangeConfSenha = (e) => {
    let valor = e.target.value;
    if (valor !== senha) {
      setErroSenha2("*Senhas diferentes.");
    } else {
      setErroSenha2("");
    }
    setConfSenha(valor);
  };

  const handleSubmit = async () => {
    if (
      erroEmail.length > 0 ||
      erroNome.length > 0 ||
      erroSenha.length > 0 ||
      erroSenha2.length > 0
    ) {
      setMsgColor("red");
      setMensagem("Existem campos inválidos.");
      return;
    } else {
      try {
        const response = await api.post("/register", {
          nome: nome,
          email: email,
          password: senha,
          carrinho: [],
          avaliacoes:[]
        });
        console.log(response);
        setMsgColor("green");
        setMensagem("Cadastrado com sucesso!");

        const timer = setTimeout(() => {
          navigate("/login");
        }, 1000);
        return () => clearTimeout(timer);
      } catch (error) {
        setMsgColor("red");
        setMensagem("Email já cadastrado!");
        console.log(error);
      }
    }
  };

  const handleClickSeta = (e) => {
    navigate("/login");
  };

  const estiloMsg = {
    fontFamily: "Alef",
    fontSize: "medium",
    color: `${msgColor}`,
    textAlign: "center",
  };

  const estiloOlho = {
    marginLeft: "5px",
    cursor: "pointer",
  };

  const estiloSeta = {
    cursor: "pointer",
    fontSize: "24px",
    marginLeft: "1.2rem",
    marginTop: "1rem",
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
      <Row gutter={16} style={{ display: "inline-flex" }}>
        <i
          style={estiloSeta}
          className="fa fa-angle-left"
          onClick={handleClickSeta}
        ></i>
      </Row>
      <Col style={{ padding: "2rem", paddingTop: "inherit" }}>
        <Col span={24} style={estiloBlocos}>
          <Row justify={"center"} align={"middle"}>
            <Col span={24}>
              <h1 style={{ fontFamily: "Alatsi", textAlign: "center" }}>
                CADASTRO
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
            <Col span={4} style={{ padding: "inherit" }}>
              <Label>Nome:</Label>
            </Col>
            <Col span={19} style={{ padding: "inherit" }}>
              <Erro>{erroNome}</Erro>
            </Col>
          </Row>
          <Row
            gutter={16}
            style={{ borderBottom: "1px solid black", marginBottom: "0.2rem" }}
          >
            <Col span={2}>
              <i className="fa fa-user"></i>
            </Col>
            <Col span={22}>
              <Input value={nome} type={"text"} onChange={handleChangeNome} />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={4} style={{ padding: "inherit" }}>
              <Label>Email:</Label>
            </Col>
            <Col span={19} style={{ padding: "inherit" }}>
              <Erro>{erroEmail}</Erro>
            </Col>
          </Row>
          <Row
            gutter={16}
            style={{ borderBottom: "1px solid black", marginBottom: "0.2rem" }}
          >
            <Col span={2}>
              <i className="fa fa-envelope"></i>
            </Col>
            <Col span={22}>
              <Input value={email} type={"text"} onChange={handleChangeEmail} />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={4} style={{ padding: "inherit" }}>
              <Label>Senha:</Label>
            </Col>
            <Col span={19} style={{ padding: "inherit" }}>
              <Erro>{erroSenha}</Erro>
            </Col>
          </Row>
          <Row
            gutter={16}
            style={{ borderBottom: "1px solid black", marginBottom: "0.2rem" }}
          >
            <Col span={2}>
              <i className="fa fa-key"></i>
            </Col>
            <Col span={20}>
              <Input
                value={senha}
                type={typePass1}
                onChange={handleChangeSenha}
              />
            </Col>
            <Col span={1}>
              <i style={estiloOlho} className={eye1} onClick={changeEye1}></i>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12} style={{ padding: "inherit" }}>
              <Label>Confirmar Senha:</Label>
            </Col>
            <Col span={11} style={{ padding: "inherit" }}>
              <Erro>{erroSenha2}</Erro>
            </Col>
          </Row>
          <Row gutter={16} style={{ borderBottom: "1px solid black" }}>
            <Col span={2}>
              <i className="fa fa-key"></i>
            </Col>
            <Col span={20}>
              <Input
                value={confSenha}
                type={typePass2}
                onChange={handleChangeConfSenha}
              />
            </Col>
            <Col span={1}>
              <i style={estiloOlho} className={eye2} onClick={changeEye2}></i>
            </Col>
          </Row>
        </Col>

        <Col span={24} style={estiloBlocos}>
          <Row justify={"center"} align={"middle"}>
            <Col span={24} justify={"center"} align={"middle"}>
              <ButtonLogCad onClick={handleSubmit}>CADASTRAR</ButtonLogCad>
            </Col>
            <Col span={12}></Col>
          </Row>
        </Col>
      </Col>
    </Col>
  );
};

export default RegisterCard;
