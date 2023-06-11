import { styled } from "styled-components";
import { COLORS } from "../BaseComponents/Color";

export const Input = styled.input`
  font-family: "Alef";
  font-size: medium;
  width: 100%;
  border: none;
  background: none;

  &:focus {
    outline: none;
  }
`;

export const Label = styled.label`
  font-family: "Alef";
  font-size: medium;
`;

export const DivInterna = styled.div`
  display: block;
  width: 100%;
`;

export const A = styled.a`
  text-decoration: none;
  color: ${COLORS.orange};

  &:hover {
    opacity: 0.9;
  }
`;