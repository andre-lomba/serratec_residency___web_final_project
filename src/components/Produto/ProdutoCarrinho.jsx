import { styled } from "styled-components";
import { COLORS } from "../BaseComponents/Color";
import { useContext, useEffect, useState } from "react";
import { ProdutoContext } from "../../context/ProdutoContext";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { CarrinhoContext } from "../../context/CarrinhoContext";
import { UserContext } from "../../context/UserContext";

const DivProduto = styled.div`
  font-family: "Alatsi";
  background-color: ${COLORS.lightGrey};
  border-radius: 15px;
  width: 100%;
  min-height: 105px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DivCapa = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
`;

const Capa = styled.img`
  border: 1px solid black;
  max-height: 90px;
  &:hover {
    filter: brightness(1.05);
    transform: scale(1.02);
    cursor: pointer;
  }
`;

const DivInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 35%;
  max-height: 89px;
`;

const Texto = styled.h2`
  margin: 0px;
`;

const Cont = styled.button`
  background-color: transparent;
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin: 0px;
  width: 20%;
  border: 1px solid black;
  border-radius: 50px;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
    transform: scale(1.05);
  }
`;

const DivQtd = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 10%;
  max-height: 89px;
`;

const DivFim = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  max-height: 89px;
`;

const DivVlTotal = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 50%;
  max-height: 89px;
`;

const Lixo = styled.i`
  font-size: 20px;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
    transform: scale(1.06);
  }
`;
const DivLixo = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  max-height: 89px;
`;

const ProdutoCarrinho = ({ item }) => {
  const [livro, setLivro] = useState("");
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getLivro();
  }, [user]);

  const getLivro = async () => {
    try {
      const response = await api.get(`/produtos/${item.idProduto}`);
      setLivro(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickMenos = () => {};

  const handleClickMais = async () => {
    let novoCarrinho = user.carrinho.filter((element) => {
      return element.idProduto !== livro.id;
    });
    novoCarrinho.push({
      idProduto: livro.id,
      quantidade: parseInt(item.quantidade + 1),
    });
    novoCarrinho.sort((a, b) => {
      if (a.idProduto < b.idProduto) {
        return -1;
      }
      if (a.idProduto > b.idProduto) {
        return 1;
      }
      return 0;
    });
    try {
      const response = await api.patch(`/users/${user.id}`, {
        carrinho: novoCarrinho,
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickExcluir = async () => {
    let novoCarrinho = user.carrinho.filter((element) => {
      return element.idProduto !== livro.id;
    });
    try {
      const response = await api.patch(`/users/${user.id}`, {
        carrinho: novoCarrinho,
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DivProduto>
      <DivCapa>
        <Capa
          onClick={() => {
            navigate(`/product/${livro.id}`);
          }}
          src={livro.imagem}
        />
      </DivCapa>
      <DivInfo>
        <Texto style={{ fontSize: "25px" }}>{livro.titulo}</Texto>
        <Texto style={{ fontSize: "15px" }}>Autor(a): {livro.autor}</Texto>
        <Texto style={{ fontSize: "13px", color: `${COLORS.orange}` }}>
          Em estoque!
        </Texto>
      </DivInfo>
      <DivQtd style={{ width: "15%", justifyContent: "start" }}>
        <Texto>Preço: R${livro.preco}</Texto>
      </DivQtd>
      <DivQtd>
        <Texto>x{item.quantidade}</Texto>
        <Cont onClick={handleClickMenos}>-</Cont>
        <Cont onClick={handleClickMais}>+</Cont>
      </DivQtd>
      <DivFim>
        <DivVlTotal>
          <Texto>
            R$
            {item.quantidade
              ? (item.quantidade * livro.preco).toFixed(2)
              : null}
          </Texto>
        </DivVlTotal>
        <DivLixo>
          <Lixo onClick={handleClickExcluir} className="fa fa-trash"></Lixo>
        </DivLixo>
      </DivFim>
    </DivProduto>
  );
};

export default ProdutoCarrinho;
