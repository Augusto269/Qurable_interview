import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StickyNavBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Button color="inherit" onClick={() => navigate("/")}>
          Back to Home
        </Button>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Checkout
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default StickyNavBar;
