import { createContext, useState } from "react";

export const TokenContext = createContext();

export const TokenProvider = () => {
  const [token, setToken] = useState("");
  return (
    <TokenContext.Provider value={{ token, setToken }}></TokenContext.Provider>
  );
};
