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
import Popper from "@mui/material/Popper";
import { CarrinhoContext } from "../../context/CarrinhoContext";

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
  width: 100%;
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

const Header = ({ currentPage }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);
  const { produtos, setProdutos } = useContext(ProdutosContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const nome = user.user.nome;
  const email = user.user.email;
  const userId = user.user.id;

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await api.get(`/users/${userId}`);
      setCarrinho(response.data.carrinho);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickUser = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

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
              {carrinho.length > 0 ? (
                <Contador>{carrinho.length}</Contador>
              ) : null}
              <Basket className="fa fa-shopping-basket"></Basket>
            </DivCarrinhoContador>

            <User
              className="fa fa-user-circle-o"
              aria-describedby={id}
              onClick={handleClickUser}
            ></User>
            <Popper id={id} open={open} anchorEl={anchorEl}>
              <Box
                sx={{
                  border: 1,
                  p: 1,
                  bgcolor: `${COLORS.offWhite}`,
                  display: "grid",
                  placeItems: "center",
                  textAlign: "center",
                  gridGap: "5px",
                }}
              >
                <h5
                  style={{
                    color: `${COLORS.deepGrey}`,
                    margin: "0",
                    fontFamily: "Alatsi",
                  }}
                >
                  {nome}
                </h5>
                <h6
                  style={{
                    color: `${COLORS.deepGrey}`,
                    margin: "0",
                    fontFamily: "Alatsi",
                  }}
                >
                  {email}
                </h6>
                <BotaoSair onClick={handleClickSair}>SAIR</BotaoSair>
              </Box>
            </Popper>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
