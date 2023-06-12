import React from "react";
import Box from "@mui/material/Box";
import { COLORS } from "../BaseComponents/Color";

const caixaBranca = {
    backgroundColor: `${COLORS.white}`,
    boxShadow: "19px 1px 15px -8px rgba(0, 0, 0, 0.25)",
    borderRadius: "20px",
    width: "20rem",
    height: "30rem"

}

export default function produtoStyle() {
    return(
    <Box style={caixaBranca} >

        <h1> Olá mundo </h1>
    
    </Box>

    )


}