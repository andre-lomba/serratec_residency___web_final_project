import styled from "styled-components";
import { COLORS } from "../BaseComponents/Color";

export const DivMain = styled.div`
  margin: 0;
  display: flex;
  place-items: center;
  justify-content: space-around;
  align-items: center;
  min-width: 100vw;
  min-height: 100vh;
  background-image: url(${(props) => props.background_image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const DivBlock = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  width: 100%;
`;
