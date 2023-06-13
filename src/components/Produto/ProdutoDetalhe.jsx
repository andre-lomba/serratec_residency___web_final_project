import { useContext } from "react";
import { styled } from "styled-components";
import { ProdutoContext } from "../../context/ProdutoContext";

const DivLivro = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Alatsi";
  justify-content: center;

`;

const Capa = styled.img`
  border: 0.1px solid black;
`;

const ProdutoCapaGrande = () => {
  const { produto } = useContext(ProdutoContext);
  return (
    <DivLivro>
      <Capa src={produto.imagem} alt={produto.nome} />
    </DivLivro>
  );
};

export default ProdutoCapaGrande;
