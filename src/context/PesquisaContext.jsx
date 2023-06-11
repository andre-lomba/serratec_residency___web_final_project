import { createContext, useState } from "react";

export const PesquisaContext = createContext();

export const PesquisaProvider = ({ children }) => {
  const [pesquisa, setPesquisa] = useState([]);
  return (
    <PesquisaContext.Provider value={{ pesquisa, setPesquisa }}>
      {children}
    </PesquisaContext.Provider>
  );
};
