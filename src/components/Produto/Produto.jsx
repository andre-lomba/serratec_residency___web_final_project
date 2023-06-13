import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const DivLivro = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Alatsi";
  justify-content: center;
  align-items: center;
  text-align: -webkit-center;
  min-width: 40px;
  max-width: 100%;
  margin: 5%;
`;

const Capa = styled.img`
  min-width: 50px;
  max-width: 90%;
  border: 0.1px solid black;

  &:hover {
    transform: scale(1.01);
    filter: brightness(110%);
    cursor: pointer;
  }
`;

const Titulo = styled.h4`
  margin: 0;
  width: max-content;
`;

const Autor = styled.h5`
  margin: 0;
  width: max-content;
`;

const Produto = ({ livro }) => {
  const navigate = useNavigate();

  const handleClickLivro = (id) => {
    navigate(`/product/${id}`);
  };

  if (livro.quantidade > 0)
    return (
      <DivLivro>
        <Capa
          onClick={() => handleClickLivro(livro.id)}
          src={livro.imagem}
          alt={livro.nome}
        />
        <div
          style={{
            display: "block",
            width: "100%",
          }}
        >
          <Titulo>{livro.titulo}</Titulo>
          <Autor>{livro.autor}</Autor>
        </div>
      </DivLivro>
    );
  else null;
};

export default Produto;
