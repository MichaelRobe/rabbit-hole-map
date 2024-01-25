import React from "react";
import { AppBar, Toolbar, Typography, Switch } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Rabbit Hole Map
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
