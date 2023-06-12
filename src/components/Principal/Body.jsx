import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { COLORS } from "../BaseComponents/Color";
import { ProdutosContext } from "../../context/ProdutosContext";
import api from "../../api/api";
import Tab from "./Tab";
import Produto from "../Produto/Produto";

export default function Body() {
  const { produtos, setProdutos } = useContext(ProdutosContext);

  const GENEROS = [
    "Todos",
    "Romance",
    "Ficção Científica",
    "Aventura",
    "Fantasia",
    "Terror",
    "Mistério",
    "Informática",
    "Biografia",
    "Histórico",
  ];

  const div = {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    padding: "2%",
    gap: "2%",
    backgroundColor: "red",
    borderBottomLeftRadius: "30px",
    borderBottomRightRadius: "30px",
    backgroundColor: `${COLORS.offWhite}`,
    boxShadow: "0px 19px 13px -14px rgba(0, 0, 0, 0.25)",
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginBlock: "10px",
      }}
    >
      <Box sx={{ width: "98%" }}>
        <Box sx={{ width: "100%", display: "flex" }}>
          {GENEROS.map((genero, index) => (
            <Tab genero={genero} key={index} />
          ))}
        </Box>

        <Box id="123" sx={div}>
          {produtos.map((livro, index) => (
              <Produto livro={livro} key={index} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
