import styled, { keyframes } from "styled-components";

export const Logo = "../imgs/_logos/_Login/Group 2.png";

const spinAnimation = keyframes`
    from {
    transform: rotate(0deg);
    }
    to {
    transform: rotate(360deg);
    }
`;
export const Spin = styled.div`
  animation: ${spinAnimation} 15s infinite linear;
`;
