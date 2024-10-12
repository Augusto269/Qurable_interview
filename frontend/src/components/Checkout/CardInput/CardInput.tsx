import React, { useState, useEffect } from "react";
import { TextField, Grid } from "@mui/material";

interface CardInputProps {
  onCardDetailsChange: (details: {
    cardNumber: string;
    expiry: string;
    cvc: string;
  }) => void;
}

const CardInput: React.FC<CardInputProps> = ({ onCardDetailsChange }) => {
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiry, setExpiry] = useState<string>("");
  const [cvc, setCvc] = useState<string>("");

  useEffect(() => {
    onCardDetailsChange({ cardNumber, expiry, cvc });
  }, [cardNumber, expiry, cvc]);

  //Basic card number,cvv and expiry validation
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(value);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    let formattedValue = value;
    if (value.length > 2) {
      formattedValue = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    } else if (value.length > 0) {
      formattedValue = value;
    }
    setExpiry(formattedValue.slice(0, 5));
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCvc(value);
  };

  return (
    <div>
      <TextField
        label="Card number"
        variant="outlined"
        value={cardNumber}
        onChange={handleCardNumberChange}
        fullWidth
        margin="normal"
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Expiry"
            variant="outlined"
            value={expiry}
            onChange={handleExpiryChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="CVC"
            variant="outlined"
            value={cvc}
            onChange={handleCvcChange}
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CardInput;
