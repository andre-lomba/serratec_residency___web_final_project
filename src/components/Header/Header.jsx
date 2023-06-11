import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { COLORS } from "../BaseComponents/Color";
import { useNavigate } from "react-router-dom";
import { Logo } from "../Logos/Logo";
import { TextField } from "@mui/material";
import { styled } from "styled-components";
import { ProdutosContext } from "../../context/ProdutosContext";
import { PesquisaContext } from "../../context/PesquisaContext";
import api from "../../api/api";

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

const Header = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const { produtos, setProdutos } = useContext(ProdutosContext);

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

  const handleClickLupa = async () => {
    const response = await api.get("/produtos");
    const inputSearch = input.toLowerCase().trim();
    const resultado = response.data.filter((livro) =>
      livro.titulo.toLowerCase().includes(inputSearch)
    );
    setProdutos([resultado]);
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
    <Box sx={{ flexGrow: 1 }}>
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
          <Box>
            <Button
              style={{ backgroundColor: "red" }}
              color="inherit"
              onClick={handleClickSair}
            >
              SAIR
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
