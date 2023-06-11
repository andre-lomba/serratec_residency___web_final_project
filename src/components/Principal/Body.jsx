import React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { COLORS } from "../BaseComponents/Color";

function LinkTab(props) {
  const [color, setColor] = React.useState(false);

  const handleClickTab = (e) => {
    setColor(!color);
    e.preventDefault();
  };
  return (
    <Tab
      onClick={handleClickTab}
      style={{
        backgroundColor: color ? `${COLORS.white}` : `${COLORS.orange}`,
      }}
      {...props}
    />
  );
}

export default function Body() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tab = {
    fontFamily: "Alatsi",
    height: "3rem",
    borderTopRightRadius: "30px",
    borderTopLeftRadius: "30px",
    border: "0.2px solid black",
    backgroundColor: `${COLORS.orange}`,
  };

  const div = {
    width: "100%",
    height: "70vh",
    backgroundColor: "red",
    borderBottomLeftRadius: "30px",
    borderBottomRightRadius: "30px",
    backgroundColor: `${COLORS.offWhite}`,
    boxShadow: "0px 19px 13px -14px rgba(0, 0, 0, 0.25)",
  };

  return (
    <Box sx={{ width: "100vw", display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "100%", margin: "1rem" }}>
        <Tabs
          style={{ width: "100%" }}
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="navtabs"
        >
          <LinkTab style={tab} label="Todos" />
          <LinkTab style={tab} label="Romance" />
          <LinkTab style={tab} label="Ficção Científica" />
          <LinkTab style={tab} label="Aventura" />
          <LinkTab style={tab} label="Fantasia" />
          <LinkTab style={tab} label="Terror" />
          <LinkTab style={tab} label="Mistério" />
          <LinkTab style={tab} label="Informática" />
          <LinkTab style={tab} label="Biografia" />
          <LinkTab style={tab} label="Histórico" />
        </Tabs>

        <Box sx={div}>TESTE</Box>
      </Box>
    </Box>
  );
}
