import { useContext } from "react";
import { TokenContext } from "./context/TokenContext";

function Home() {
  const { token, setContext } = useContext(TokenContext);
  return <></>;
}

export default Home;