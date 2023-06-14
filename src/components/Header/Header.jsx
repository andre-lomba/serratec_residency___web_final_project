import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { COLORS } from "../BaseComponents/Color";
import { useNavigate } from "react-router-dom";
import { Logo } from "../Logos/Logo";
import { styled } from "styled-components";
import { ProdutosContext } from "../../context/ProdutosContext";
import api from "../../api/api";
import { CarrinhoContext } from "../../context/CarrinhoContext";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import _ from "lodash";
import { UserContext } from "../../context/UserContext";

const Pesquisa = styled.input`
  margin-left: 0.5rem;
  width: 90%;
  background-color: ${COLORS.lightGrey};
  border: none;
  font-family: "Alef";
  font-size: large;
  text-align: center;

  &:focus {
    outline: none;
    border: none;
  }
  &::placeholder {
    text-align: center;
  }
`;

const Lupa = styled.i`
  color: black;
  font-size: large;
  font-weight: 100;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    transform: scale(1.1);
  }
`;

const User = styled.i`
  font-size: 36px;
  color: ${COLORS.mediumGrey};

  &:hover {
    filter: brightness(110%);
    cursor: pointer;
  }
`;

const Basket = styled.i`
  font-size: 36px;
  color: ${COLORS.mediumGrey};
`;

const BotaoSair = styled.button`
  font-family: "Alatsi";
  color: ${COLORS.offWhite};
  background-color: ${COLORS.orange};
  border: none;
  border-radius: 5px;
  width: 80%;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const DivCarrinhoContador = styled.div`
  &:hover {
    filter: brightness(110%);
    cursor: pointer;
  }
`;

const Contador = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  font-family: "Alatsi";
  align-items: center;
  position: absolute;
  margin-right: 10px;
  background-color: ${COLORS.orange};
  border: none;
  border-radius: 10px;
  width: 20px;
  height: 20px;
`;

const estilo = {
  backgroundColor: `${COLORS.offWhite}`,
  boxShadow: "none",
  display: "flex",
  alignItems: "center",
  justifyItems: "space-between",
};

const estiloLogo = {
  width: "3rem",
};

const estiloToolBar = {
  minHeight: "64px",
  width: "96%",
  display: "flex",
  justifyContent: "space-between",
};

const estiloModal = {
  position: "absolute",
  top: "110px",
  left: "92%",
  transform: "translate(-50%, -50%)",
  border: "none",
  borderRadius: "10px",
  p: 1,
  bgcolor: `${COLORS.white}`,
  display: "grid",
  placeItems: "center",
  textAlign: "center",
  gridGap: "5px",
  boxShadow: 24,
  p: 1.5,
};

const Header = ({ currentPage }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);
  const { produtos, setProdutos } = useContext(ProdutosContext);
  const { user, setUser } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [qtdProduto, setQtdProduto] = useState(0);

  const usuario = JSON.parse(localStorage.getItem("user")).user;
  const userId = usuario.id;

  useEffect(() => {
    getUser();
    let qtdTransf = 0;
    if (carrinho) {
      carrinho.forEach((item) => {
        qtdTransf += item.quantidade;
      });
    }

    setQtdProduto(qtdTransf);
  }, [carrinho]);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    } else {
      setNome(user.nome);
      setEmail(user.email);
    }
    let qtdTransf = 0;
    if (user.carrinho) {
      user.carrinho.forEach((item) => {
        qtdTransf += item.quantidade;
      });
    }

    setQtdProduto(qtdTransf);
  }, [user]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getUser = async () => {
    try {
      const response = await api.get(`/users/${userId}`);
      setUser(response.data);
      const isEqualArrays = _.isEqual(response.data.carrinho, carrinho);
      if (!isEqualArrays) setCarrinho(response.data.carrinho);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeInput = (e) => {
    setInput(e.target.value);
  };

  const handleClickSair = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleClickLogo = () => {
    navigate("/home");
  };

  const handleClickBasket = () => {
    navigate("/checkout");
  };

  const handleClickLupa = async () => {
    const response = await api.get("/produtos");
    const inputSearch = input.toLowerCase().trim();
    const normalizeString = (str) =>
      str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const resultado = response.data.filter(
      (livro) =>
        normalizeString(livro.titulo.toLowerCase()).indexOf(
          normalizeString(inputSearch.toLowerCase())
        ) !== -1 ||
        normalizeString(livro.autor.toLowerCase()).indexOf(
          normalizeString(inputSearch.toLowerCase())
        ) !== -1
    );
    localStorage.setItem("search", JSON.stringify(resultado));
    setInput("");
    if (currentPage === "/home") {
      setProdutos(resultado);
      localStorage.removeItem("search");
    } else navigate("/home");
  };

  if (loading) {
    return <></>;
  } else {
    return (
      <Box sx={{ flexGrow: 1, width: "100vw" }}>
        <AppBar position="static" style={estilo}>
          <Toolbar sx={estiloToolBar}>
            <Box
              sx={{
                width: "12%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                cursor: "pointer",
              }}
              onClick={handleClickLogo}
            >
              <img style={estiloLogo} src={Logo} alt="logomarca" />
              <h3 style={{ fontFamily: "Alatsi", color: `${COLORS.black}` }}>
                SUMMARKET
              </h3>
            </Box>
            <Box
              sx={{
                height: "2rem",
                width: "40%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: `${COLORS.lightGrey}`,
                borderRadius: "20px",
              }}
            >
              <Pesquisa
                onChange={handleChangeInput}
                value={input}
                type="text"
                placeholder="O que está procurando?"
              />
              <Lupa onClick={handleClickLupa} className="fa fa-search"></Lupa>
            </Box>
            <Box
              sx={{
                width: "10%",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <DivCarrinhoContador onClick={handleClickBasket}>
                {carrinho && carrinho.length > 0 ? (
                  <Contador>{qtdProduto}</Contador>
                ) : null}
                <Basket className="fa fa-shopping-basket"></Basket>
              </DivCarrinhoContador>
              <div style={{ display: "block" }}>
                <User
                  className="fa fa-user-circle-o"
                  onClick={handleOpen}
                ></User>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={estiloModal}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      sx={{
                        color: `${COLORS.deepGrey}`,
                        margin: "0",
                        fontFamily: "Alatsi",
                      }}
                    >
                      {nome}{" "}
                      <Typography
                        id="modal-modal-description"
                        sx={{
                          color: `${COLORS.deepGrey}`,
                          margin: "0",
                          fontFamily: "Alatsi",
                        }}
                      >
                        {email}
                      </Typography>
                    </Typography>
                    <BotaoSair onClick={handleClickSair}>SAIR</BotaoSair>
                  </Box>
                </Modal>
              </div>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
};

export default Header;
