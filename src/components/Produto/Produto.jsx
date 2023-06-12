import styled from "@emotion/styled";

const DivLivro = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Alatsi";
  justify-content: center;
  min-width: 40px;
  max-width: 100%;
`;

const Capa = styled.img`
  min-width: 50px;
  max-width: 100%;
  border: 0.1px solid black;

  &:hover {
    transform: scale(1.01);
    filter: brightness(110%);
    cursor: pointer;
  }
`;

const Produto = ({ livro }) => {
  return (
    <DivLivro>
      <Capa src={livro.imagem} alt={livro.nome} />
      <div style={{ display: "flex" }}>
        <h4 style={{ margin: "0", width: "max-content" }}>
          {livro.titulo}{" "}
          <h5 style={{ margin: "0", width: "max-content" }}>{livro.autor}</h5>
        </h4>
      </div>
    </DivLivro>
  );
};

export default Produto;
