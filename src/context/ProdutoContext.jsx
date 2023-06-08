import { createContext, useState } from "react";

export const ProdutoContext = createContext();

export const ProdutoProvider = ({ children }) => {
  const [produto, setProduto] = useState({});
  return (
    <ProdutoContext.Provider value={{ produto, setProduto }}>
      {children}
    </ProdutoContext.Provider>
  );
};
