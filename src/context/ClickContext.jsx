import { createContext, useState } from "react";

export const ClickContext = createContext();

export const ClickProvider = ({ children }) => {
  const [click, setClick] = useState("");
  return (
    <ClickContext.Provider value={{ click, setClick }}>
      {children}
    </ClickContext.Provider>
  );
};
