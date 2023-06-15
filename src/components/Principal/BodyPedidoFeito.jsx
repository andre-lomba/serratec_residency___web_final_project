import { DivMae, DivMeio, DivContent } from "./BodyCarrinho";
import { COLORS } from "../BaseComponents/Color";
import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { ProdutosContext } from "../../context/ProdutosContext";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export const Texto = styled.h1`
  margin: 0px;
  font-family: "Alatsi";
`;

const BodyPedidoFeito = ({ pedido }) => {
  const { produtos, setProdutos } = useContext(ProdutosContext);
  const user = JSON.parse(localStorage.getItem("user")).user;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getProdutos();
    setLoading(false);
  }, [navigate]);

  const getProdutos = async () => {
    let todosItens = [];
    for (const item of pedido.itens) {
      try {
        const response = await api.get(`/produtos/${item.idProduto}`);
        todosItens.push({
          id: response.data.id,
          titulo: response.data.titulo,
          preco: response.data.preco,
          quantidade: item.quantidade,
        });
      } catch (error) {}
    }
    setProdutos(todosItens);
  };

  if (loading) return <></>;
  else
    return (
      <DivMae>
        <DivMeio>
          <DivContent
            style={{
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Texto>Pedido realizado! Obrigado por escolher a SUMMARKET!</Texto>
            <div
              style={{
                display: "flex",
                width: "98%",
                justifyContent: "space-evenly",
              }}
            >
              <Texto style={{ fontSize: "35px" }}>
                ID do pedido: {pedido.id}
              </Texto>
              <Texto style={{ fontSize: "35px" }}>
                Seu ID: {pedido.idUser}
              </Texto>
            </div>
            <Texto style={{ width: "98%", fontSize: "35px" }}>
              Seu pedido:
            </Texto>

            <div
              style={{
                overflowY: "auto",
                width: "96%",
                height: "40%",
                border: "1px solid black",
                gap: "8px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {produtos.map((livro, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Texto style={{ fontSize: "30px" }}>
                    {livro.quantidade} x
                  </Texto>
                  <Texto style={{ fontSize: "30px" }}>{livro.titulo}</Texto>
                  <Texto style={{ fontSize: "30px" }}>(ID: {livro.id})</Texto>
                  <Texto style={{ fontSize: "30px" }}>
                    Valor Un.:{livro.preco}
                  </Texto>
                  <Texto style={{ fontSize: "30px" }}>
                    Subtotal: {(livro.preco * livro.quantidade).toFixed(2)}
                  </Texto>
                </div>
              ))}
              <Texto
                style={{
                  fontSize: "30px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                ----------------------------------------------------------------------------------------------
              </Texto>
            </div>
            <Texto>Total: {pedido.valorTotal.toFixed(2)}</Texto>
            <Texto style={{ fontSize: "15px" }}>
              *Não se preocupe, uma cópia desse comprovante será enviada para
              seu email: {user.email}
            </Texto>
          </DivContent>
        </DivMeio>
      </DivMae>
    );
};

export default BodyPedidoFeito;
