import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { ProdutoContext } from "../../context/ProdutoContext";
import { UserContext } from "../../context/UserContext";
import ProdutoCapaGrande from "../Produto/ProdutoDetalhe";
import { COLORS } from "../BaseComponents/Color";
import { Col, Row, Divider } from "antd";
import { CarrinhoContext } from "../../context/CarrinhoContext";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const DivMaior = styled.div`
  font-family: "Alef";
  width: 100%;
  display: flex;
  justify-content: center;
  justify-items: center;
`;

const DivContent = styled.div`
  background-color: ${COLORS.offWhite};
  border-radius: 30px;
  box-shadow: 0px 19px 13px -14px rgba(0, 0, 0, 0.25);
  width: 90%;
  margin-block: 2%;
  padding: 20px;
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
  width: 25px;
  &:focus {
    outline: 0px;
  }
`;

const Adicionar = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2%;
  font-family: "Alatsi";
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

const Voltar = styled.i`
  font-size: 30px;
  margin-left: 1.5%;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const Icone = styled.i`
  font-size: 20px;
`;

const livroStyle = {
  padding: "20px",
  width: "346px",
  height: "581px",
};

const containerVenda = {
  backgroundColor: `${COLORS.lightGrey}`,
  boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
  borderRadius: "5px",
  // width: "30%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "2px",
  padding: "18px 18px 10px 18px",
};

const BodyProduto = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
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
    } else if (user && produto) {
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
    carrinhoSorted.sort((a, b) => {
      if (a.idProduto < b.idProduto) {
        return -1; // `a` vem antes de `b`
      }
      if (a.idProduto > b.idProduto) {
        return 1; // `a` vem depois de `b`
      }
      return 0; // `a` e `b` são iguais
    });
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
              <Voltar
                className="fa fa-angle-left"
                onClick={() => {
                  navigate("/home");
                }}
              ></Voltar>
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
                <h4 style={{ paddingTop: "5px" }}>Descrição:</h4>
                <div style={{ margin: "0px" }}>
                  <h6
                    style={{
                      margin: "0px",
                      fontSize: "15px",
                      fontFamily: "Alatsi",
                    }}
                  >
                    {produto.descricao}
                  </h6>
                </div>
              </div>
            </Col>
            <Col style={containerVenda} className="gutter-row" span={6}>
              <div>
                <h2
                  style={{
                    margin: "0px",
                    fontSize: "30px",
                    paddingBottom: "7px",
                  }}
                >
                  R$
                  {produto && produto.preco !== 0 && produto.preco !== null
                    ? parseFloat(produto.preco).toFixed(2)
                    : null}
                </h2>
              </div>
              <Divider style={{ paddingBottom: "7px" }} />
              <div style={{ margin: "0px 10px 10px 0px" }}>
                <h4>Entrega GRÁTIS: Quarta-feira, 14 de Junho</h4>
                <h4>Enviar para {user.nome}</h4>
              </div>
              <Divider style={{ paddingBottom: "7px" }} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingBottom: "10px",
                }}
              >
                <h4 style={{ marginRight: "5px" }}>Quantidade</h4>
                <button onClick={handleClickMenos} type="button">
                  {" "}
                  -{" "}
                </button>
                <Quantidade value={quantidade} onChange={handleChangeQtd} />
                <button onClick={handleClickMais} type="button">
                  {" "}
                  +{" "}
                </button>
              </div>
              <Adicionar type="button" onClick={handleClickAdd}>
                ADICIONAR À CESTA
              </Adicionar>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0px 7px 7px 0px",
                  width: "60%",
                  paddingTop: "20px",
                }}
              >
                <h5 style={{ margin: "0px" }}>Pagamento:</h5>
                <h5 style={{ margin: "0px", color: "green" }}>
                  Transação segura
                </h5>
                <Icone className="fa fa-shield"></Icone>
              </div>
            </Col>
          </Row>
        </DivContent>
      </DivMaior>
    );
  }
};

export default BodyProduto;
