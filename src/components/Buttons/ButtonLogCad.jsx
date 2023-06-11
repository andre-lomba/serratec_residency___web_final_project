import styled from "styled-components";
import { COLORS } from "../BaseComponents/Color";

export const ButtonLogCad = styled.button`
  border-radius: 30px;
  border: none;
  width: 100%;
  height: 3rem;
  background-color: ${COLORS.deepGrey};
  cursor: pointer;
  font-family: "Alatsi";
  font-weight: 400;
  font-size: large;
  color: ${COLORS.offWhite};

  &:hover {
    opacity: 0.9;
  }

  &:active{
    transform: scale(1.01);
  }
`;
