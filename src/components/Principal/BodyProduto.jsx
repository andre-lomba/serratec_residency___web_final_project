import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { ProdutoContext } from "../../context/ProdutoContext";
import { UserContext } from "../../context/UserContext";
import ProdutoCapaGrande from "../Produto/ProdutoDetalhe";
import { COLORS } from "../BaseComponents/Color";
import { Col, Row, Space } from "antd";
import { CarrinhoContext } from "../../context/CarrinhoContext";
import api from "../../api/api";

const DivMaior = styled.div`
  font-family: "Alef";
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
`;

const DivContent = styled.div`
  background-color: ${COLORS.offWhite};
  border-radius: 30px;
  box-shadow: 0px 19px 13px -14px rgba(0, 0, 0, 0.25);
  width: 90%;
  margin-block: 2%;
`;

const JoinhaUp = styled.i`
  color: green;
  font-size: 30px;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const JoinhaDown = styled.i`
  color: red;
  transform: scaleX(-1);
  font-size: 30px;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const Quantidade = styled.input`
  border-radius: 5px;
  box-shadow: none;

  &:focus {
    outline: 0px;
  }
`;

const Adicionar = styled.button`
  padding: 2%;
  font-family: "Alef";
  background-color: ${COLORS.orange};
  border-radius: 5px;
  border: none;
  box-shadow: none;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;

  &:hover {
    filter: brightness(1.1);
    cursor: pointer;
  }

  &:active {
    transform: scale(1.02);
  }
`;

const livroStyle = {
  width: "346px",
  height: "581px",
};

const containerVenda = {
  backgroundColor: `${COLORS.lightGrey}`,
  boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
  borderRadius: "5px",
  width: "30%",
  height: "80%",
};

const BodyProduto = () => {
  const { user, setUser } = useContext(UserContext);
  const { produto, setProduto } = useContext(ProdutoContext);
  const [quantidade, setQuantidade] = useState(0);
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);
  const [atualizaCarrinho, setAtualizaCarrinho] = useState(false);
  const [thumb, setThumb] = useState(null);
  const [loading, setLoading] = useState(true);
  const [atualizaBanco, setAtualizaBanco] = useState(false);
  const [todasAvaliacoes, setTodasAvaliacoes] = useState([]);
  const [primeiraAvaliacao, setPrimeiraAvaliacao] = useState(true);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const usuario = JSON.parse(localStorage.getItem("user"));
  const userId = usuario.user.id;

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    } else {
      const avaliacoes = user.avaliacoes;
      setTodasAvaliacoes(avaliacoes);
      avaliacoes.forEach((element) => {
        if (element.idProduto === produto.id) {
          if (element.avaliacao === 0) {
            //avaliacao ruim
            setThumb(0);
            setPrimeiraAvaliacao(false);
          } else if (element.avaliacao === 1) {
            //avaliacao boa
            setThumb(1);
            setPrimeiraAvaliacao(false);
          }
        }
      });
      setLoading(false);
    }
  }, [user]);

  const getUser = async () => {
    try {
      const response = await api.get(`/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickAdd = async () => {
    if (quantidade > 0) {
      setCarrinho([
        ...carrinho,
        {
          idProduto: produto.id,
          quantidade: quantidade,
        },
      ]);
      setAtualizaCarrinho(true);
    }
  };

  useEffect(() => {
    sortCarrinho();
  }, [carrinho]);

  const sortCarrinho = () => {
    const resultado = carrinho.reduce((agrupado, objeto) => {
      const { idProduto, quantidade } = objeto;
      if (agrupado[idProduto]) {
        // Se o objeto já existe no agrupado, soma a quantidade
        agrupado[idProduto].quantidade += quantidade;
      } else {
        // Se o objeto não existe no agrupado, adiciona-o
        agrupado[idProduto] = { idProduto, quantidade };
      }
      return agrupado;
    }, {});
    const carrinhoSorted = Object.values(resultado);
    if (atualizaCarrinho) {
      updateCarrinhoDb(carrinhoSorted);
    }
  };

  const updateCarrinhoDb = async (carrinhoSorted) => {
    setAtualizaCarrinho(false);
    try {
      const response = await api.patch(`/users/${userId}`, {
        carrinho: carrinhoSorted,
      });
      setCarrinho(response.data.carrinho);
    } catch (error) {
      console.log(error);
    }
    setQuantidade(0);
  };

  const handleClickUp = () => {
    if (thumb === 0 || thumb === null) {
      setThumb(1);
      setAtualizaBanco(true);
    }
  };

  const handleClickDown = () => {
    if (thumb === 1 || thumb === null) {
      setThumb(0);
      setAtualizaBanco(true);
    }
  };

  useEffect(() => {
    if (atualizaBanco) {
      if (thumb !== null) {
        updateDb();
      }
    }
  }, [handleClickUp, handleClickDown]);

  const updateDb = async () => {
    const avaliacoesFinal = [];
    todasAvaliacoes.forEach((element) => {
      if (element.idProduto !== produto.id) {
        avaliacoesFinal.push(element);
      }
    });
    avaliacoesFinal.push({
      idProduto: produto.id,
      avaliacao: thumb,
    });
    try {
      const response = await api.patch(`/users/${userId}`, {
        avaliacoes: avaliacoesFinal,
      });

      let produtoAtual;
      if (thumb === 1) {
        const qtdAtualizaUp = parseInt(produto.feedbacksPositivos) + 1;
        const qtdAtualizaDown = parseInt(produto.feedbacksNegativos) - 1;
        if (primeiraAvaliacao) {
          produtoAtual = await api.patch(`/produtos/${produto.id}`, {
            feedbacksPositivos: qtdAtualizaUp,
          });
        } else {
          produtoAtual = await api.patch(`/produtos/${produto.id}`, {
            feedbacksPositivos: qtdAtualizaUp,
            feedbacksNegativos: qtdAtualizaDown,
          });
        }
        setPrimeiraAvaliacao(false);
        setAtualizaBanco(false);
      } else if (thumb === 0) {
        const qtdAtualizaUp = parseInt(produto.feedbacksNegativos) + 1;
        const qtdAtualizaDown = parseInt(produto.feedbacksPositivos) - 1;
        if (primeiraAvaliacao) {
          produtoAtual = await api.patch(`/produtos/${produto.id}`, {
            feedbacksNegativos: qtdAtualizaUp,
          });
        } else {
          produtoAtual = await api.patch(`/produtos/${produto.id}`, {
            feedbacksPositivos: qtdAtualizaDown,
            feedbacksNegativos: qtdAtualizaUp,
          });
        }
        setPrimeiraAvaliacao(false);
        setAtualizaBanco(false);
      }
      setProduto(produtoAtual.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeQtd = (event) => {
    const valor = event.target.value;
    if (valor === null || isNaN(valor) || valor === "" || valor < 0) {
      setQuantidade(0);
    }
    if (valor >= 0 && valor != e && valor <= produto.quantidade) {
      setQuantidade(parseInt(valor));
    }
  };

  const handleClickMais = () => {
    setQuantidade(parseInt(quantidade) + 1);
  };

  const handleClickMenos = () => {
    if (quantidade > 0) {
      setQuantidade(parseInt(quantidade) - 1);
    }
  };

  if (loading) {
    return <></>;
  } else {
    return (
      <DivMaior>
        <DivContent>
          <Row className="gutter-row" gutter={[16, 32]}>
            <Col span={24}>
              <button
                onClick={() => {
                  history.back();
                }}
              >
                {" "}
                Voltar{" "}
              </button>
            </Col>
          </Row>
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            style={{ marginInline: "0px", align: "middle" }}
          >
            <Col style={livroStyle} className="gutter-row" span={6}>
              <ProdutoCapaGrande />
            </Col>

            <Col className="gutter-row" span={12}>
              <div style={{ display: "grid" }}>
                <h1 style={{ fontFamily: "Alatsi", margin: "0px" }}>
                  {produto.titulo}
                </h1>
                <h4>Autor(a): {produto.autor} </h4>
                <h5>
                  Edição: Português | Nacionalidade: {produto.nacionalidade} |
                  Editora: {produto.editora} | Páginas: {produto.paginas} | Data
                  desta edição: {produto.publicacao} | ISBN: {produto.isbn}
                </h5>
                <div style={{ display: "block", width: "12%" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <JoinhaUp
                        className="fa fa-thumbs-up"
                        aria-hidden="true"
                        onClick={handleClickUp}
                        style={thumb === 0 ? { color: "grey" } : null}
                      ></JoinhaUp>
                      <div>{produto.feedbacksPositivos}</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <JoinhaDown
                        className="fa fa-thumbs-down"
                        aria-hidden="true"
                        onClick={handleClickDown}
                        style={thumb === 1 ? { color: "grey" } : null}
                      ></JoinhaDown>
                      <div>{produto.feedbacksNegativos}</div>
                    </div>
                  </div>
                </div>
                <h4>Descrição:</h4>
                <div style={{ border: "1px solid grey" }}>
                  <h6>{produto.descricao}</h6>
                </div>
              </div>
            </Col>
            <Col style={containerVenda} className="gutter-row" span={6}>
              <div>
                <h2>R$ {produto.preco}</h2>
              </div>
              <div>
                <button onClick={handleClickMais} type="button">
                  +
                </button>
                <Quantidade value={quantidade} onChange={handleChangeQtd} />
                <button onClick={handleClickMenos} type="button">
                  -
                </button>
                <Adicionar type="button" onClick={handleClickAdd}>
                  ADICIONAR À CESTA
                </Adicionar>
              </div>
              <div>
                <h5>Pagamento Transação segura</h5>
                <h5>Enviado por Amazon.com.br</h5>
                <h5>Vendido por Amazon.com.br</h5>
              </div>
            </Col>
          </Row>
        </DivContent>
      </DivMaior>
    );
  }
};

export default BodyProduto;
