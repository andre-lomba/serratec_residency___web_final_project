import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { CarrinhoContext } from "../../context/CarrinhoContext";
import { COLORS } from "../BaseComponents/Color";
import ProdutoCarrinho from "../Produto/ProdutoCarrinho";
import api from "../../api/api";
import { Button } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { Texto } from "./BodyPedidoFeito";

export const DivMae = styled.div`
  font-family: "Alef";
  background-color: ${COLORS.background};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DivMeio = styled.div`
  background-color: ${COLORS.offWhite};
  width: 95%;
  height: 90%;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 2%;
`;
export const DivContent = styled.div`
  background-color: ${COLORS.offWhite};
  width: 95%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2%;
  overflow-y: auto;
`;
const DivProduto = styled.div`
  background-color: ${COLORS.lightGrey};
  border-radius: 15px;
  width: 100%;
  min-height: 105px;
  display: flex;
  justify-content: space-between;
`;

const DivFixaTotal = styled.div`
  font-family: "Alatsi";
  font-size: 30px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${COLORS.orange};
  height: 50px;
  width: 30%;
  bottom: 15px;
  right: 40px;
  border-radius: 5px;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.25);
`;

const Voltar = styled.i`
  font-size: 30px;
  margin-left: 1.5%;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const Basket = styled.i`
  font-size: 34px;
  color: ${COLORS.black};
`;

const Finalizar = styled.h5`
  margin: 0px;
  transition: transform 0.2s ease;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    color: ${COLORS.offWhite};
  }
  &:active {
    color: ${COLORS.black};
  }
`;

const LimparCesta = styled.button`
  font-family: "Alatsi";
  border: none;
  font-size: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${COLORS.orange};
  height: 50px;
  width: 30%;
  bottom: 15px;
  right: 40px;
  border-radius: 5px;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.25);
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    color: ${COLORS.offWhite};
  }
  &:active {
    transform: scale(1.02);
  }
`;

const BodyCarrinho = () => {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);
  const [total, setTotal] = useState(0);
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    user ? calculaPedido() : null;
  }, [user, carrinho]);

  const calculaPedido = async () => {
    let totalCalculo = 0;
    if (user.carrinho) {
      for (const livro of user.carrinho) {
        try {
          const response = await api.get(`/produtos/${livro.idProduto}`);
          totalCalculo += response.data.preco * livro.quantidade;
        } catch (error) {
          console.log(error);
        }
      }
    }
    setTotal(totalCalculo.toFixed(2));
  };

  const handleLimpaCesta = async () => {
    try {
      const response = await api.patch(`/users/${user.id}`, {
        carrinho: [],
      });
      setUser(response.data);
      setCarrinho(response.data.carrinho);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

  const handleClickFinalizarPedido = async () => {
    if (user) {
      let valorTotal = 0;
      for (const item of user.carrinho) {
        try {
          const response = await api.get(`/produtos/${item.idProduto}`);
          // verifica se quantidade pedida está disponível no banco
          if (item.quantidade > response.data.quantidade) {
            return setError({
              produto: response.data.titulo,
              quantidade: response.data.quantidade,
            });
          }
          // atualiza o banco de produtos com a nova quantidade
          await api.patch(`/produtos/${item.idProduto}`, {
            quantidade: response.data.quantidade - item.quantidade,
          });
          valorTotal += response.data.preco * item.quantidade;
        } catch (error) {
          console.log(error);
        }
      }
      try {
        const response = await api.post("/pedidos", {
          itens: user.carrinho,
          valorTotal: valorTotal,
          idUser: user.id,
        });
        api.patch(`/users/${user.id}`, {
          carrinho: [],
        });
        localStorage.setItem("haPedido", JSON.stringify(response.data.id));
        navigate(`/overview/${response.data.id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <DivMae>
      <DivMeio>
        <DivContent>
          <div style={{ display: "flex", width: "100%" }}>
            <Voltar
              onClick={() => {
                window.history.back();
              }}
              className="fa fa-angle-left"
            ></Voltar>
          </div>
          <div
            style={{
              display: "flex",
              width: "98%",
              gap: "1%",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <h2 style={{ fontSize: "34px", margin: "0px" }}>
              CESTA DE COMPRAS
            </h2>
            <Basket className="fa fa-shopping-basket"></Basket>
            <div
              style={{ width: "65%", display: "flex", justifyContent: "end" }}
            >
              <LimparCesta onClick={handleLimpaCesta}>LIMPAR CESTA</LimparCesta>
            </div>
          </div>
          {error ? (
            <Texto
              style={{
                position: "absolute",
                color: "red",
                fontSize: "20px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              *** Livro "{error.produto}" possui apenas {error.quantidade}{" "}
              unidades em estoque!
            </Texto>
          ) : null}
          {user.carrinho && user.carrinho.length === 0 ? (
            <h1 style={{ fontFamily: "Alatsi" }}>CESTA VAZIA :(</h1>
          ) : null}
          {user.carrinho
            ? user.carrinho.map((item, index) => (
                <ProdutoCarrinho key={index} item={item} />
              ))
            : null}
        </DivContent>
        <div style={{ display: "flex", width: "100%", justifyContent: "end" }}>
          {user.carrinho && user.carrinho.length === 0 ? null : (
            <DivFixaTotal>
              <h5 style={{ margin: "0px" }}>Valor total: R${total}</h5>
              <h5 style={{ margin: "0px" }}>|</h5>
              <Finalizar onClick={handleClickFinalizarPedido}>
                Finalizar compra
              </Finalizar>
            </DivFixaTotal>
          )}
        </div>
      </DivMeio>
    </DivMae>
  );
};

export default BodyCarrinho;
