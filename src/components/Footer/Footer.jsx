import { MDBCol, MDBContainer, MDBFooter, MDBRow } from "mdbreact";
import React from "react";
import { COLORS } from "../BaseComponents/Color";
import { Logo } from "../Logos/Logo";

const estiloLogo = {
  width: "3rem",
  display: "flex",
  justifyContent: "center",
  marginLeft: "25px",
};

const fundoFooter = {
  backgroundColor: `${COLORS.offWhite}`,
  borderRadius: "30px 30px 0px 0px",
  height: "200px",
  width: "100%",
  fontFamily: "Alef",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}

const FooterPage = () => {
  return (
    <MDBFooter style={fundoFooter}>
          <div>
          <img style={estiloLogo} src={Logo} alt="logomarca" />
          <h3 style={{ fontFamily: "Alatsi", color: `${COLORS.black}` }}>SUMMARKET</h3>
          </div>
          <div>
            <h6>Av. André Moraes Montel de Castro Martins, 2004, Teresópolis CEP: 123456-789 | summarketsac@summarket.com.br</h6>
        </div>
      <div>
          &copy; {new Date().getFullYear()} Copyright: <a href="http://localhost:5173/home"> summarket.com.br </a>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;