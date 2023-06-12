import styled from "@emotion/styled";
import { useContext, useEffect, useState } from "react";
import { COLORS } from "../BaseComponents/Color";
import api from "../../api/api";
import { ProdutosContext } from "../../context/ProdutosContext";
import { ClickContext } from "../../context/ClickContext";

const DivTab = styled.div`
  font-family: "Alatsi";
  font-size: medium;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  height: 3rem;
  width: 100%;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  border: 0.2px solid grey;
  background-color: ${COLORS.orange};
  color: ${COLORS.white};
  transition: transform;

  &:hover {
    transform: scaleY(1.1);
    border: none;
  }
`;

export default function Tab({ genero }) {
  const [firstRender, setFirstRender] = useState(true);
  const { setProdutos } = useContext(ProdutosContext);
  const { click, setClick } = useContext(ClickContext);
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (!firstRender && click.includes(genero)) {
      setStyle({
        transform: "scaleY(1.1)",
        border: "none",
        backgroundColor: `${COLORS.offWhite}`,
        color: `${COLORS.black}`,
      });
    } else if (!click.includes(genero)) {
      setStyle({});
    }
    setFirstRender(false);
  }, [click]);

  useEffect(() => {
    genero.includes("Todos") ? setClick("Todos") : {};
  }, []);

  const handleClickTab = async (value) => {
    setClick(value);
    const response = await api.get("/produtos");
    if (value.includes("Todos")) setProdutos(response.data);
    else
      setProdutos(
        response.data.filter((livro) => livro.genero.includes(value))
      );
  };

  return (
    <DivTab
      onClick={() => {
        handleClickTab(genero);
      }}
      tabIndex={0}
      style={style}
    >
      {genero}
    </DivTab>
  );
}
